import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale);

const AgeBarChart = ({ data, selectedAgeRange, selectedDiagnosis }) => {
  // Define age ranges
  const ageRanges = [
    "0-30",
    "31-40",
    "41-50",
    "51-60",
    "61-70",
    "71-80",
    "81-90",
    "90+",
  ];

  // Function to categorize ages into predefined ranges
  const getAgeRange = (age) => {
    if (age >= 0 && age <= 30) return "0-30";
    if (age >= 31 && age <= 40) return "31-40";
    if (age >= 41 && age <= 50) return "41-50";
    if (age >= 51 && age <= 60) return "51-60";
    if (age >= 61 && age <= 70) return "61-70";
    if (age >= 71 && age <= 80) return "71-80";
    if (age >= 81 && age <= 90) return "81-90";
    return "90+";
  };

  // Handle 'all' selectedAgeRange
  const filterData = (data) => {
    if (selectedAgeRange === "all") {
      return data.filter(
        (patient) =>
          selectedDiagnosis === "all" || patient.diagnosis === selectedDiagnosis
      );
    } else {
      // Parse selectedAgeRange to get min and max values
      const [minAge, maxAge] = selectedAgeRange.split("-").map(Number);

      return data.filter(
        (patient) =>
          patient.age >= minAge &&
          patient.age <= maxAge &&
          (selectedDiagnosis === "all" ||
            patient.diagnosis === selectedDiagnosis)
      );
    }
  };

  // Filter data based on selected age range and diagnosis
  const filteredData = filterData(data);

  // Count patients by age range within the filtered data
  const ageCounts = filteredData.reduce((acc, curr) => {
    const ageRange = getAgeRange(curr.age);
    acc[ageRange] = (acc[ageRange] || 0) + 1;
    return acc;
  }, {});

  // Chart data and configuration
  const chartData = {
    labels: ageRanges,
    datasets: [
      {
        label: "Number of Patients",
        data: ageRanges.map((range) => ageCounts[range] || 0), // Handle missing age range counts
        backgroundColor: "#205260",
        hoverBackgroundColor: "#205260",
        borderColor: "#205260",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Age Range",
        },
        grid: {
          display: false, // Disable gridlines on x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Patients",
        },
        beginAtZero: true,
        grid: {
          display: false, // Disable gridlines on y-axis
        },
      },
      
    },
    plugins: {
      legend: {
        position: "top",
      },
      datalabels: {
        display: (context) => context.dataset.data[context.dataIndex] !== 0, // Hide labels with zero values
        color: 'gray', // Set label color to white
        align: 'end', // Align data labels in the end of the doughnut slices
        anchor: 'end', // Anchor labels to the top of the bars
        font: {
          weight: 'bold',
          size: 14, // Set the font size
        },
        formatter: (value) => value !== 0 ? value : '', // Display the count value
      },
      tooltip: {
        enabled: true, // Tooltip will display the value when hovering
        callbacks: {
          // Custom tooltip to show the value when hovering
          label: function (tooltipItem) {
            return tooltipItem.raw; // Show the raw value
          },
        },
      },
    },
    indexAxis: "x",
    stacked: true, // Enables stacking
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
          Patient Count by Age Range
        </Typography>
        <div className="chartcard" style={{ height: 400 }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AgeBarChart;