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

ChartJS.register(
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale
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

    // Prepare chart data with non-stacked bar configuration
    const newChartData = {
      labels: smokingStatuses,
      datasets: diagnosisTypes.map((diagnosis) => ({
        label: diagnosis,
        data: smokingStatuses.map(
          (status) => smokingStatusCounts[status]?.[diagnosis] || 0
        ),
        backgroundColor:
          diagnosis === "coronary artery disease"
            ? "#FF5733"
            : diagnosis === "hypertension"
            ? "#33FF57"
            : diagnosis === "stroke"
            ? "#3357FF"
            : "#28A745",
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
      },
      y: {
        title: {
          display: true,
          text: "Number of Patients",
        },
        stacked: false, // Disable stacking on the y-axis
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
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
