import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import chartjs-plugin-datalabels

// Register the necessary chart.js components and the datalabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const DoughnutChart = ({ data, selectedAgeRange, selectedDiagnosis }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Handle the 'all' case for selectedAgeRange and selectedDiagnosis
    const filterData = () => {
      if (selectedAgeRange === "all" && selectedDiagnosis === "all") {
        // If both are "all", return all data
        return data;
      } else if (selectedAgeRange === "all") {
        // If only age range is "all", filter by diagnosis
        return data.filter((patient) => patient.diagnosis === selectedDiagnosis);
      } else if (selectedDiagnosis === "all") {
        // If only diagnosis is "all", filter by age range
        const [minAge, maxAge] = selectedAgeRange.split("-").map(Number);
        return data.filter(
          (patient) => patient.age >= minAge && patient.age <= maxAge
        );
      } else {
        // If both filters are applied, filter by age range and diagnosis
        const [minAge, maxAge] = selectedAgeRange.split("-").map(Number);
        return data.filter(
          (patient) =>
            patient.age >= minAge &&
            patient.age <= maxAge &&
            patient.diagnosis === selectedDiagnosis
        );
      }
    };

    // Filter the data based on selected age range and diagnosis
    const filteredData = filterData();

    // Calculate diagnosis count by physical activity
    const physicalActivityCounts = filteredData.reduce((acc, patient) => {
      const { physical_activity: physicalActivity } = patient;
      if (!acc[physicalActivity]) acc[physicalActivity] = 0;
      acc[physicalActivity] += 1;
      return acc;
    }, {});

    // Define physical activity types
    const physicalActivities = Object.keys(physicalActivityCounts);

    // Prepare chart data
    const newChartData = {
      labels: physicalActivities,
      datasets: [
        {
          label: "Physical Activity",
          data: physicalActivities.map(
            (activity) => physicalActivityCounts[activity] || 0
          ),
          backgroundColor: ["#205260", "#fabf8d", "#cc464c", "#e8993c"],
          hoverBackgroundColor: ["#205260", "#fabf8d", "#cc464c", "#e8993c"],
        },
      ],
    };

    setChartData(newChartData);
  }, [data, selectedAgeRange, selectedDiagnosis]); // Re-run effect when filters or data change

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltips
      },
      datalabels: {
        display: (context) => context.dataset.data[context.dataIndex] !== 0, // Hide labels with zero values
        color: 'gray', // Set label color to white
        align: 'start', // Align data labels in the center of the doughnut slices
        anchor: 'start', // Position labels outside of the doughnut
        font: {
          weight: 'bold',
          size: 14, // Set the font size
        },
        formatter: (value) => value !== 0 ? value : '', // Display the count value
      },
    },
    responsive: true,
    cutout: '70%', // Defines the thickness of the doughnut chart (inner radius)
    elements: {
      arc: {
        borderWidth: 4, // Border width around doughnut slices
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          align="center"
          color="textSecondary"
        >
          Diagnosis Count by Physical Activity
        </Typography>
        <div className="chartcard" style={{ height: 400 }}>
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
