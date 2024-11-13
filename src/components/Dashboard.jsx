import React from "react";
import patientData from "../Data/datacsv.json";
import GenderPieChart from "./charts/GenderPieChart";
import AgeBarChart from "./charts/AgeBarChart";
import DoughnutChart from "./charts/DoughnutChart";
import DiagnosisStackedChart from "./charts/DiagnosisStackedChart";
import SmokingStatusStackedChart from "./charts/SmokingStatusStackedChart";
import PhysicalActivityPieChart from "./charts/PhysicalActivityPieChart";
import { HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="mb-11 relative">
      <h1 className="fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center md:justify-center font-extrabold text-white text-3xl opacity-100 z-[100] blur-effect-theme">
        <div className="absolute top-1/2 transform -translate-y-1/2 left-5 md:hidden text-3xl cursor-pointer ">
          <Link to="/">
            <HiHome className="hover:scale-90" />
          </Link>
        </div>
        <span className="text-center">
          Cardiovascular Disease Risk Predictor
        </span>
      </h1>
    <div className="p-5 grid gap-8 mt-28 sm:grid-cols-1 md:grid-cols-2 ">
      <div className="flex flex-row md:flex-col sm:flex-col items-center gap-7 overflow-hidden">
        <GenderPieChart data={patientData} />
        <DiagnosisStackedChart data={patientData} />
        <PhysicalActivityPieChart data={patientData} />
      </div>
      <div className="flex flex-row md:flex-col sm:flex-col items-center gap-7 overflow-hidden">
        <AgeBarChart data={patientData} />
        <SmokingStatusStackedChart data={patientData} />
        <DoughnutChart data={patientData} />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
