import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(Title, ArcElement, Tooltip, Legend);

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
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#28A745"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#28A745"],
        },
      ],
    });
  }, [data, selectedAgeRange, selectedDiagnosis]); // Re-run the effect when filters or data change

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
          <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
