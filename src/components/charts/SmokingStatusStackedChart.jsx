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

const SmokingStatusStackedChart = ({ data }) => {
  const chartRef = useRef(null);

  const smokingStatusCounts = data.reduce((acc, curr) => {
    const smokingStatus = curr.smoking_status;
    const diagnosis = curr.diagnosis;

    if (!acc[smokingStatus]) {
      acc[smokingStatus] = {};
    }

    acc[smokingStatus][diagnosis] = (acc[smokingStatus][diagnosis] || 0) + 1;

    return acc;
  }, {});

  const smokingStatuses = ["non-smoker", "occasional smoker", "regular smoker"];
  const diagnosisTypes = ["coronary artery disease", "hypertension", "stroke", "other"];

  const colors = {
    "coronary artery disease": {
      backgroundColor: "#FF5733",
      borderColor: "#C70039", // Red stroke
    },
    hypertension: {
      backgroundColor: "#33FF57",
      borderColor: "#28A745", // Green stroke
    },
    stroke: {
      backgroundColor: "#FFC300",
      borderColor: "#FF8C00", // Orange stroke
    },
    other: {
      backgroundColor: "#3357FF",
      borderColor: "#0056B3", // Blue stroke
    },
  };

  const chartData = {
    labels: smokingStatuses, 
    datasets: diagnosisTypes.map((diagnosis) => ({
      label: diagnosis,
      data: smokingStatuses.map((status) => smokingStatusCounts[status]?.[diagnosis] || 0),
      backgroundColor: colors[diagnosis].backgroundColor, 
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Smoking Status",
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
    plugins: {
      legend: {
        position: "top",
      },
    },
    indexAxis: "x",
    stacked: true, 
  };

  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
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
          Diagnosis Count by Smoking Status
        </Typography>
        <div className="chartcard">
          <Bar data={chartData} options={chartOptions} ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SmokingStatusStackedChart;
