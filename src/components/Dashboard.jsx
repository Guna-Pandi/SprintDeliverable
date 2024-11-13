import React from "react";
import patientData from "../Data/datacsv.json";
import GenderPieChart from "./charts/GenderPieChart";
import AgeBarChart from "./charts/AgeBarChart";
import DoughnutChart from "./charts/DoughnutChart";
import DiagnosisStackedChart from "./charts/DiagnosisStackedChart";
import SmokingStatusStackedChart from "./charts/SmokingStatusStackedChart";
import PhysicalActivityPieChart from "./charts/PhysicalActivityPieChart";

const Dashboard = () => {
  return (
    <div className="p-5 grid grid-cols-3 gap-24">
      <div className="flex flex-col items-center gap-7">
        <GenderPieChart data={patientData} />
        <DiagnosisStackedChart data={patientData} />
      </div>
      <div className="flex flex-col items-center gap-7">
        <PhysicalActivityPieChart data={patientData} />
        <AgeBarChart data={patientData} />
      </div>
      <div className="flex flex-col items-center gap-7">
        <SmokingStatusStackedChart data={patientData} />
        <DoughnutChart data={patientData} />
      </div>
    </div>
  );
};

export default Dashboard;
