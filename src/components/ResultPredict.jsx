import React, { useContext } from "react";
import { FormContext } from "../FormContext";
import { HiHome } from "react-icons/hi2";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ResultPredict = () => {
  const { formData } = useContext(FormContext);

  const fieldLabels = {
    sbp: "Systolic Blood Pressure",
    ldl: "LDL Cholesterol",
    dbp: "Diastolic Blood Pressure",
    tgc: "Triglycerides",
    tc: "Total Cholesterol",
    bs: "Blood Sugar",
    hdl: "HDL Cholesterol",
    bmi: "Body Mass Index",
    smoke: "Smoking Status",
  };

  return (
    <div className="mb-11 relative">
      <h1 className="fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center md:justify-center font-extrabold text-white text-3xl opacity-100 z-[100] blur-effect-theme">
        <div className="flex gap-4 absolute top-1/2 transform -translate-y-1/2 left-5 md:hidden text-3xl cursor-pointer ">
          <Link to="/Home/Predictor">
            <IoMdArrowRoundBack className="hover:scale-90" />
          </Link>
          <Link to="/">
            <HiHome className="hover:scale-90" />
          </Link>
        </div>
        <span className="text-center">
          Cardiovascular Disease Risk Predictor
        </span>
      </h1>
      <div className=" mt-28 ">
        <div className="w-full max-w-sm  bg-gray-200 rounded-lg shadow-2xl ">
          <div className="p-6 ">
            <h1 className="text-2xl font-bold mb-4">Prediction Results</h1>
            {Object.entries(formData).map(
              ([key, value]) =>
                fieldLabels[key] && (
                  <p key={key} className="text-gray-800 mb-2">
                    <strong>{fieldLabels[key]}:</strong> {value}
                  </p>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPredict;
