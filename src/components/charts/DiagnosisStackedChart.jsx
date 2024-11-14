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

const DiagnosisStackedChart = ({ data, selectedAgeRange, selectedDiagnosis }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const classifySystolicBP = (systolic) => {
    return systolic >= 140 ? "High" : "Low";
  };

  useEffect(() => {
    // Parse selected age range
    const [minAge, maxAge] = selectedAgeRange.split("-").map(Number);

    // Filter data based on selected age range and diagnosis
    const filteredData = data.filter((patient) => {
      const withinAgeRange = patient.age >= minAge && patient.age <= maxAge;
      const matchesDiagnosis =
        selectedDiagnosis === "all" || patient.diagnosis === selectedDiagnosis;
      return withinAgeRange && matchesDiagnosis;
    });

    // Classify systolic BP and count diagnoses
    const diagnosisCounts = filteredData.reduce((acc, curr) => {
      const bpCategory = classifySystolicBP(curr.systolic_bp);
      const diagnosis = curr.diagnosis;

      if (!acc[bpCategory]) {
        acc[bpCategory] = {};
      }

      acc[bpCategory][diagnosis] = (acc[bpCategory][diagnosis] || 0) + 1;

      return acc;
    }, {});

    // Prepare chart data
    const labels = Object.keys(diagnosisCounts);
    const diagnosisTypes = ["coronary artery disease", "hypertension", "stroke", "other"];

    setChartData({
      labels: labels,
      datasets: diagnosisTypes.map((diagnosis) => ({
        label: diagnosis,
        data: labels.map((label) => diagnosisCounts[label]?.[diagnosis] || 0),
        backgroundColor:
          diagnosis === "coronary artery disease"
            ? "#FF5733"
            : diagnosis === "hypertension"
            ? "#33FF57"
            : diagnosis === "stroke"
            ? "#3357FF"
            : "#28A745",
      })),
    });
  }, [data, selectedAgeRange, selectedDiagnosis]); // Re-run the effect when filters or data change

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

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom align="center" color="textSecondary">
          Diagnosis Count by Systolic BP
        </Typography>
        <div className="chartcard">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosisStackedChart;
