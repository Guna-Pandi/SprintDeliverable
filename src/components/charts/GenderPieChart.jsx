import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import chartjs-plugin-datalabels

// Register the necessary chart.js components and the datalabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const GenderPieChart = ({ data, selectedAgeRange, selectedDiagnosis }) => {
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

    // Calculate gender counts for the filtered data
    const genderCounts = filteredData.reduce((acc, patient) => {
      acc[patient.gender] = (acc[patient.gender] || 0) + 1;
      return acc;
    }, {});

    // Calculate the total number of patients for percentage calculation
    const totalPatients = filteredData.length;

    // Prepare chart data with percentages
    setChartData({
      labels: Object.keys(genderCounts),
      datasets: [
        {
          data: Object.values(genderCounts).map(count => (count / totalPatients) * 100), // Calculate percentage
          backgroundColor: ["#205260", "#fabf8d", "#cc464c"], // Adjust colors as needed
          hoverBackgroundColor: ["#205260", "#fabf8d", "#cc464c"], // Adjust hover colors
        },
      ],
    });
  }, [data, selectedAgeRange, selectedDiagnosis]); // Re-run the effect when filters or data change

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position:"bottom",
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
      datalabels: {
        display: (context) => context.dataset.data[context.dataIndex] !== 0, // Hide labels with zero values
        color: 'white', // Set label color to white
        align: 'center', // Align data labels in the center of the pie slices
        font: {
          weight: 'bold',
          size: 14, // Set the font size
        },
        formatter: (value) => `${value.toFixed(2)}%`, // Display percentage with 2 decimal places
      },
    },
    responsive: true,
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom align="center" color="textSecondary">
          Gender Distribution
        </Typography>
        <div className="chartcard" style={{ height: 400 }}>
          <Pie data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default GenderPieChart;
