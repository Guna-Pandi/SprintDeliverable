import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import chartjs-plugin-datalabels

// Register the necessary chart.js components and the datalabels plugin
ChartJS.register(Title, ArcElement, Tooltip, Legend, ChartDataLabels);

const DoughnutChart = ({ data, selectedAgeRange, selectedDiagnosis }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Handle the 'all' case for selectedAgeRange
    const filterData = () => {
      if (selectedAgeRange === "all") {
        return data.filter(
          (patient) => selectedDiagnosis === "all" || patient.diagnosis === selectedDiagnosis
        );
      } else {
        // Parse selected age range
        const [minAge, maxAge] = selectedAgeRange.split("-").map(Number);
        return data.filter(
          (patient) =>
            patient.age >= minAge &&
            patient.age <= maxAge &&
            (selectedDiagnosis === "all" || patient.diagnosis === selectedDiagnosis)
        );
      }
    };

    // Filter the data based on selected age range and diagnosis
    const filteredData = filterData();

    // Calculate the diagnosis counts in the filtered data
    const diagnosisCount = filteredData.reduce((acc, patient) => {
      const diagnosis = patient.diagnosis;
      acc[diagnosis] = (acc[diagnosis] || 0) + 1;
      return acc;
    }, {});

    // Prepare chart data
    setChartData({
      labels: Object.keys(diagnosisCount),
      datasets: [
        {
          data: Object.values(diagnosisCount),
          backgroundColor: ["#205260", "#fabf8d", "#cc464c", "#e8993c"],
          hoverBackgroundColor: ["#205260", "#fabf8d", "#cc464c", "#e8993c"],
        },
      ],
    });
  }, [data, selectedAgeRange, selectedDiagnosis]); // Re-run the effect when filters or data change

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltips
      },
      datalabels: {
        display: (context) => context.dataset.data[context.dataIndex] !== 0, // Hide labels with zero values
        color: 'gray', // Set label color to black
        align: 'start', // Align data labels outside the doughnut
        anchor: 'start', // Position labels outside of the doughnut
        font: {
          weight: 'bold',
          size: 14, // Set the font size
        },
        formatter: (value) => value !== 0 ? value : '', // Display the count value, hide zero
        offset: 15, // Move the labels slightly outside the doughnut
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
          Patient Count by Diagnosis
        </Typography>
        <div className="chartcard" style={{ height: 400 }}>
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
