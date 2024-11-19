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

    // Calculate percentages for each diagnosis per BP category
    const datasets = diagnosisTypes.map((diagnosis) => {
      const data = labels.map((label) => {
        const count = diagnosisCounts[label]?.[diagnosis] || 0;
        const total = Object.values(diagnosisCounts[label] || {}).reduce((sum, val) => sum + val, 0);
        return total > 0 ? ((count / total) * 100).toFixed(2) : 0; // Calculate percentage
      });

      return {
        label: diagnosis,
        data,
        backgroundColor:
          diagnosis === "coronary artery disease"
            ? "#205260"
            : diagnosis === "hypertension"
            ? "#fabf8d"
            : diagnosis === "stroke"
            ? "#cc464c"
            : "#e8993c",
      };
    });

    setChartData({
      labels: labels,
      datasets: datasets,
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
        grid: {
          display: false, // Disable gridlines on x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage of Patients",
        },
        beginAtZero: true,
        grid: {
          display: false, // Disable gridlines on y-axis
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      datalabels: {
        display: (context) => context.dataset.data[context.dataIndex] !== 0, // Hide labels with zero values
        color: 'gray', // Set label color to gray
        align: 'end', // Align data labels at the end of the bars
        anchor: 'end', // Anchor labels to the top of the bars
        font: {
          weight: 'bold',
          size: 10, // Reduced font size to avoid overlap
        },
        formatter: (value) => `${value}%`, // Display percentage with the "%" sign
      },
      tooltip: {
        enabled: true, // Tooltip will display the value when hovering
        callbacks: {
          // Custom tooltip to show the percentage when hovering
          label: function (tooltipItem) {
            return `${tooltipItem.raw}%`; // Show the percentage in tooltip
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
        <Typography variant="h6" component="div" gutterBottom align="center" color="textSecondary">
          Diagnosis Percentage by Systolic BP
        </Typography>
        <div className="chartcard" style={{ height: 400 }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosisStackedChart;
