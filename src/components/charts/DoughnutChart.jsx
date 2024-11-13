import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(Title, ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
  const diagnosisCount = data.reduce((acc, patient) => {
    const diagnosis = patient.diagnosis;
    acc[diagnosis] = (acc[diagnosis] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(diagnosisCount),
    datasets: [
      {
        data: Object.values(diagnosisCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

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
        <div className="chartcard">
          <Doughnut data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
