import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PhysicalActivityPieChart = ({ data, selectedAgeRange, selectedDiagnosis }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Parse selected age range
    const [minAge, maxAge] = selectedAgeRange.split("-").map(Number);

    // Filter the data based on selected age range and diagnosis
    const filteredData = data.filter((patient) => {
      const withinAgeRange = patient.age >= minAge && patient.age <= maxAge;
      const matchesDiagnosis =
        selectedDiagnosis === "all" || patient.diagnosis === selectedDiagnosis;
      return withinAgeRange && matchesDiagnosis;
    });

    // Calculate diagnosis count by physical activity
    const physicalActivityCounts = filteredData.reduce((acc, patient) => {
      const { physical_activity: physicalActivity, diagnosis } = patient;
      if (!acc[physicalActivity]) acc[physicalActivity] = {};
      acc[physicalActivity][diagnosis] = (acc[physicalActivity][diagnosis] || 0) + 1;
      return acc;
    }, {});

    // Define physical activity types
    const physicalActivities = Object.keys(physicalActivityCounts);
    const diagnoses = ["coronary artery disease", "hypertension", "stroke", "other"];

    // Prepare chart data
    const newChartData = {
      labels: physicalActivities,
      datasets: diagnoses.map((diagnosis) => ({
        label: diagnosis,
        data: physicalActivities.map(
          (activity) => physicalActivityCounts[activity]?.[diagnosis] || 0
        ),
        backgroundColor: ["#FF5733", "#33FF57", "#FFC300", "#3357FF"],
        hoverBackgroundColor: ["#C70039", "#28A745", "#FF8C00", "#0056B3"],
      })),
    };

    setChartData(newChartData);
  }, [data, selectedAgeRange, selectedDiagnosis]); // Re-run effect when filters or data change

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
          Diagnosis Count by Physical Activity
        </Typography>
        <div className="chartcard" style={{ height: 400 }}>
          <Pie data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PhysicalActivityPieChart;
