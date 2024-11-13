import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Predictor,Dashboard,ResultPredict } from "../src/components";
import { cvd } from "../src/Data/data";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home endpoint={cvd} />} />
        <Route path="/Home/Predictor" element={<Predictor  />} />
        <Route path="/Home/Dashboard" element={<Dashboard />} />
        <Route path="/Home/Predictor/ResultPredict" element={<ResultPredict/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
