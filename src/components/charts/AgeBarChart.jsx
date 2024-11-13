import React, { useEffect, useRef } from "react";
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

const AgeBarChart = ({ data }) => {
  const chartRef = useRef(null);

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

  const ageCounts = data.reduce((acc, curr) => {
    const ageRange = getAgeRange(curr.age);
    acc[ageRange] = (acc[ageRange] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(ageCounts),
    datasets: [
      {
        label: "Number of Patients",
        data: Object.values(ageCounts),
        backgroundColor: "#4e73df",
        hoverBackgroundColor: "#2e59d9",
        borderColor: "#2e59d9",
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
      },
      y: {
        title: {
          display: true,
          text: "Number of Patients",
        },
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const chartInstance = chartRef.current; 
    if (chartInstance) {
      chartInstance.destroy();
    }
  }, []);

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
        <div className="chartcard">
          <Bar data={chartData} options={chartOptions} ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AgeBarChart;
