import React from "react";
import { Pie } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PhysicalActivityPieChart = ({ data }) => {
  // Count diagnoses by physical activity
  const diagnosisCounts = data.reduce((acc, curr) => {
    const physicalActivity = curr.physical_activity;
    const diagnosis = curr.diagnosis;

    if (!acc[physicalActivity]) {
      acc[physicalActivity] = {};
    }

    acc[physicalActivity][diagnosis] = (acc[physicalActivity][diagnosis] || 0) + 1;

    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(diagnosisCounts), // Physical activity levels
    datasets: Object.keys(diagnosisCounts).map((physicalActivity) => {
      // For each physical activity, count diagnoses
      const diagnosisData = Object.values(diagnosisCounts[physicalActivity]);
      return {
        data: diagnosisData,
        backgroundColor: ["#FF5733", "#33FF57", "#FFC300", "#3357FF"], // Color mapping for diagnoses
        hoverBackgroundColor: ["#C70039", "#28A745", "#FF8C00", "#0056B3"], // Hover color mapping
      };
    }),
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom className="text-center text-gray-800">
          Diagnosis Count by Physical Activity
        </Typography>
        <div className="h-[350px] p-5 relative">
          <Pie data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PhysicalActivityPieChart;
