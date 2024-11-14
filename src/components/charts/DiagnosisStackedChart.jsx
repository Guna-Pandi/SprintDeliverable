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

const DiagnosisStackedChart = ({ data }) => {
  const chartRef = useRef(null);

  const classifySystolicBP = (systolic) => {
    return systolic >= 140 ? "High" : "Low";
  };

  const diagnosisCounts = data.reduce((acc, curr) => {
    const bpCategory = classifySystolicBP(curr.systolic_bp);
    const diagnosis = curr.diagnosis;

    if (!acc[bpCategory]) {
      acc[bpCategory] = {};
    }

    acc[bpCategory][diagnosis] = (acc[bpCategory][diagnosis] || 0) + 1;

    return acc;
  }, {});

  const labels = Object.keys(diagnosisCounts);
  const diagnosisTypes = ["coronary artery disease", "hypertension","stroke", "other"]; 
  
  const chartData = {
    labels: labels, 
    datasets: diagnosisTypes.map((diagnosis) => ({
      label: diagnosis,
      data: labels.map((label) => diagnosisCounts[label]?.[diagnosis] || 0),
      backgroundColor: diagnosis === "coronary artery disease" ? "#FF5733" :  diagnosis === "hypertension" ? "#33FF57" :diagnosis === "stroke" ? "#3357FF": "#28A745",
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Systolic BP Category",
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
    stacked: true, // Enables stacking
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
          Diagnosis Count by Systolic BP 
        </Typography>
        <div className="chartcard">
          <Bar data={chartData} options={chartOptions} ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosisStackedChart;
