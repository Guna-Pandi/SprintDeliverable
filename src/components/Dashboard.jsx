import React, { useState } from "react";
import patientData from "../Data/datacsv.json";
import GenderPieChart from "./charts/GenderPieChart";
import AgeBarChart from "./charts/AgeBarChart";
import DoughnutChart from "./charts/DoughnutChart";
import DiagnosisStackedChart from "./charts/DiagnosisStackedChart";
import SmokingStatusStackedChart from "./charts/SmokingStatusStackedChart";
import PhysicalActivityPieChart from "./charts/PhysicalActivityPieChart";
import { HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

const Dashboard = () => {
  const [selectedAgeRange, setSelectedAgeRange] = useState("0-30");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("all");

  const ageRanges = ["0-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90"];
  const diagnosisOptions = ["all", "coronary artery disease", "hypertension", "stroke", "other"];

  return (
    <div className="mb-11 relative">
      <h1 className="fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center md:justify-center font-extrabold text-white text-3xl opacity-100 z-[100] blur-effect-theme">
        <div className="absolute top-1/2 transform -translate-y-1/2 left-5 md:hidden text-3xl cursor-pointer">
          <Link to="/">
            <HiHome className="hover:scale-90" />
          </Link>
        </div>
        <span className="text-center">Cardiovascular Disease Risk Predictor</span>
      </h1>

      {/* Filter Section */}
      <div className="p-5 mt-20 grid grid-cols-2 gap-4">
        {/* Age Range Filter */}
        <FormControl fullWidth variant="outlined">
          <InputLabel style={{ color: "black" }}>Age Range</InputLabel>
          <Select
            value={selectedAgeRange}
            onChange={(e) => setSelectedAgeRange(e.target.value)}
            label="Age Range"
            sx={{
              backgroundColor: "white",
              color: "black",
              width: "100%",
              "& .MuiSelect-icon": {
                color: "black",
              },
            }}
          >
            {ageRanges.map((range) => (
              <MenuItem key={range} value={range}>
                {range}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Diagnosis Filter */}
        <FormControl fullWidth variant="outlined">
          <InputLabel style={{ color: "black" }}>Diagnosis</InputLabel>
          <Select
            value={selectedDiagnosis}
            onChange={(e) => setSelectedDiagnosis(e.target.value)}
            label="Diagnosis"
            sx={{
              backgroundColor: "white",
              color: "black",
              width: "100%",
              "& .MuiSelect-icon": {
                color: "black",
              },
            }}
          >
            {diagnosisOptions.map((diagnosis) => (
              <MenuItem key={diagnosis} value={diagnosis}>
                {diagnosis}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="p-5 grid gap-8 mt-5 sm:grid-cols-1 md:grid-cols-2">
        <div className="flex flex-row md:flex-col sm:flex-col items-center gap-7 overflow-hidden">
          <GenderPieChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
          <DiagnosisStackedChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
          <PhysicalActivityPieChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
        </div>
        <div className="flex flex-row md:flex-col sm:flex-col items-center gap-7 overflow-hidden">
          <AgeBarChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
          <SmokingStatusStackedChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
          <DoughnutChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
