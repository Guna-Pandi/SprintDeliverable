import React, { useEffect, useState } from "react";
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
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import chartjs-plugin-datalabels

ChartJS.register(
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  ChartDataLabels // Register the datalabels plugin
);

const SmokingStatusStackedChart = ({ data, selectedAgeRange, selectedDiagnosis }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Handle 'all' age range case
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

    // Filter data based on selected age range and diagnosis
    const filteredData = filterData();

    // Count diagnoses by smoking status
    const smokingStatusCounts = filteredData.reduce((acc, patient) => {
      const { smoking_status: smokingStatus, diagnosis } = patient;
      if (!acc[smokingStatus]) {
        acc[smokingStatus] = {};
      }
      acc[smokingStatus][diagnosis] = (acc[smokingStatus][diagnosis] || 0) + 1;
      return acc;
    }, {});

    // Define smoking statuses and diagnosis types
    const smokingStatuses = ["non-smoker", "occasional smoker", "regular smoker"];
    const diagnosisTypes = ["coronary artery disease", "hypertension", "stroke", "other"];

    // Calculate total number of patients for each smoking status
    const smokingStatusTotalCounts = smokingStatuses.reduce((acc, status) => {
      acc[status] = filteredData.filter((patient) => patient.smoking_status === status).length;
      return acc;
    }, {});

    // Prepare chart data with percentages
    const newChartData = {
      labels: smokingStatuses,
      datasets: diagnosisTypes.map((diagnosis) => ({
        label: diagnosis,
        data: smokingStatuses.map((status) => {
          const count = smokingStatusCounts[status]?.[diagnosis] || 0;
          const total = smokingStatusTotalCounts[status] || 1; // Avoid division by zero
          return (count / total) * 100; // Calculate percentage
        }),
        backgroundColor:
          diagnosis === "coronary artery disease"
            ? "#205260"
            : diagnosis === "hypertension"
            ? "#fabf8d"
            : diagnosis === "stroke"
            ? "#cc464c"
            : "#e8993c",
      })),
    };

    setChartData(newChartData);
  }, [data, selectedAgeRange, selectedDiagnosis]); // Re-run when dependencies change

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Smoking Status",
        },
        stacked: false, // Disable stacking on the x-axis
        grid: {
          display: false, // Disable gridlines on the x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage",
        },
        stacked: false, // Disable stacking on the y-axis
        beginAtZero: true,
        grid: {
          display: false, // Disable gridlines on the y-axis
        },
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            if (value === 0) {
              return ''; // Hide zero values on the y-axis
            }
            return value + '%'; // Add percentage sign to ticks
          },
        },
      },
    },
    plugins: {
      legend: {
        position:"bottom",
      },
      datalabels: {
        display: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return value > 1; // Only show labels for values > 1%
        },
        color: 'gray', // Set label color to black
        align: 'end', // Align labels to the top of the bars
        anchor: 'end', // Anchor labels to the top of the bars
        font: {
          weight: 'bold',
          size: 10, // Further reduce font size
        },
        offset: 10, // Offset the labels further to avoid overlap
        formatter: (value) => value !== 0 ? `${value.toFixed(1)}%` : '', // Show percentage with 1 decimal place
      },
    },
    indexAxis: "x", // Bar chart on the x-axis
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom align="center" color="textSecondary">
          Diagnosis Count by Smoking Status
        </Typography>
        <div className="chartcard" style={{ height: 400 }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SmokingStatusStackedChart;
