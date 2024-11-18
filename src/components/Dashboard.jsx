import React, { useState, useEffect } from "react";
import patientData from "../Data/datacsv.json";
import GenderPieChart from "./charts/GenderPieChart";
import AgeBarChart from "./charts/AgeBarChart";
import DoughnutChart from "./charts/DoughnutChart";
import DiagnosisStackedChart from "./charts/DiagnosisStackedChart";
import SmokingStatusStackedChart from "./charts/SmokingStatusStackedChart";
import PhysicalActivityPieChart from "./charts/PhysicalActivityPieChart";
import { HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
  // State for filters
  const [selectedAgeRange, setSelectedAgeRange] = useState("all");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("all");

  // State for dynamic metrics
  const [patientCount, setPatientCount] = useState(0);
  const [avgCholesterol, setAvgCholesterol] = useState(0);
  const [avgBloodSugar, setAvgBloodSugar] = useState(0);
  const [avgTriglyceride, setAvgTriglyceride] = useState(0);
  const [avgHeartRate, setAvgHeartRate] = useState(0);

  const ageRanges = ["all", "0-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90"];
  const diagnosisOptions = ["all", "coronary artery disease", "hypertension", "stroke", "other"];

  useEffect(() => {
    // Filter data based on selected filters
    const filteredData = patientData.filter(patient => {
      // Age filter
      const ageFilter = selectedAgeRange !== "all" 
        ? patient.age >= parseInt(selectedAgeRange.split('-')[0]) && patient.age <= parseInt(selectedAgeRange.split('-')[1])
        : true;

      // Diagnosis filter
      const diagnosisFilter = selectedDiagnosis !== "all" 
        ? patient.diagnosis === selectedDiagnosis
        : true;

      return ageFilter && diagnosisFilter;
    });

    // Set the dynamic metrics
    setPatientCount(filteredData.length);
    if (filteredData.length > 0) {
      setAvgCholesterol(filteredData.reduce((sum, patient) => sum + parseFloat(patient.cholesterol_total), 0) / filteredData.length);
      setAvgBloodSugar(filteredData.reduce((sum, patient) => sum + parseFloat(patient.blood_sugar), 0) / filteredData.length);
      setAvgTriglyceride(filteredData.reduce((sum, patient) => sum + parseFloat(patient.triglycerides), 0) / filteredData.length);
      setAvgHeartRate(filteredData.reduce((sum, patient) => sum + parseFloat(patient.heart_rate), 0) / filteredData.length);
    } else {
      setAvgCholesterol(0);
      setAvgBloodSugar(0);
      setAvgTriglyceride(0);
      setAvgHeartRate(0);
    }
  }, [selectedAgeRange, selectedDiagnosis]);

  return (
    <div className="mb-11 relative">
      <h1 className="fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center md:justify-center font-extrabold text-white text-3xl opacity-100 z-[100] blur-effect-theme">
        <div className="absolute top-1/2 transform -translate-y-1/2 left-5 md:hidden text-3xl cursor-pointer ">
          <Link to="/">
            <HiHome className="hover:scale-90" />
          </Link>
        </div>
        <span className="text-center">Cardiovascular Disease Risk Predictor</span>
      </h1>

      {/* Filter Section */}
      <div className="p-5 mt-20  flex gap-10 justify-center items-center md:flex-col">
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

      {/* Display Dynamic Metrics in a Single Row with Increased Space */}
      <div className="p-5 mt-8 grid gap-4 grid-cols-5 md:grid-cols-2 ">
        {[
          { label: "Number of Patients", value: patientCount },
          { label: "Average Cholesterol", value: avgCholesterol.toFixed(2) },
          { label: "Average Blood Sugar", value: avgBloodSugar.toFixed(2) },
          { label: "Average Triglycerides", value: avgTriglyceride.toFixed(2) },
          { label: "Average Heart Rate", value: avgHeartRate.toFixed(2) },
        ].map((metric, index) => (
          <Card key={index} sx={{ minWidth: 100, backgroundColor: "#f5f5f5", boxShadow: 3, borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom style={{ color: "black" }}>
                {metric.label}
              </Typography>
              <Typography variant="h5" color="textSecondary" align="center">
                {metric.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section with Increased Gap Between Cards */}
      <div className="p-5 grid gap-4 grid-cols-3 md:grid-cols-1 ">
        <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
          <GenderPieChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
        </Card>
        <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
          <DiagnosisStackedChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
        </Card>
        <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
          <PhysicalActivityPieChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
        </Card>
        <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
          <AgeBarChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
        </Card>
        <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
          <SmokingStatusStackedChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
        </Card>
        <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
          <DoughnutChart data={patientData} selectedAgeRange={selectedAgeRange} selectedDiagnosis={selectedDiagnosis} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
