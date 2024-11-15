import React, { useState, useContext } from "react";
import { FormContext } from "../FormContext";
import { HiHome } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

const Predictor = () => {
  const { setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    sbp: "",
    ldl: "",
    dbp: "",
    tgc: "",
    tc: "",
    bs: "",
    hdl: "",
    bmi: "",
    smoke: "",
    heart_rate: "",
  });

  const [errors, setErrors] = useState({});

  const ranges = {
    sbp: [90, 180],
    ldl: [50, 190],
    dbp: [60, 110],
    tgc: [50, 500],
    tc: [100, 300],
    bs: [70, 200],
    hdl: [20, 100],
    bmi: [10, 60],
    heart_rate: [40, 200],
  };

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
    heart_rate: "Heart Rate",
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const numericValue = parseInt(value, 10);

    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));

    if (
      ranges[id] &&
      !isNaN(numericValue) &&
      (numericValue < ranges[id][0] || numericValue > ranges[id][1])
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: `Please enter a value between ${ranges[id][0]} and ${ranges[id][1]}.`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(inputs); // Store the input data in context
    navigate("/Home/Predictor/ResultPredict"); // Navigate to the ResultPredict page
  };

  const isFormValid =
    Object.values(errors).every((error) => error === "") &&
    Object.values(inputs).every((input) => input !== "");

  return (
    <div className="mb-11 relative">
      <h1 className="fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center font-extrabold text-white text-3xl opacity-100 z-[100] blur-effect-theme">
        <div className="absolute top-1/2 transform -translate-y-1/2 left-5 text-3xl cursor-pointer">
          <Link to="/">
            <HiHome className="hover:scale-90" />
          </Link>
        </div>
        <span className="text-center">Cardiovascular Disease Risk Predictor</span>
      </h1>

      <h1 className="flex justify-center items-center font-semibold text-2xl mt-24 mb-5 text-gray-900">
        Please Fill Your Health Metrics
      </h1>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-2xl px-6 py-10 bg-white rounded-lg shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 grid-cols-2">
              {Object.keys(inputs).map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    {fieldLabels[field]}
                    <span className="text-red-700">*</span>
                  </label>
                  {field === "smoke" ? (
                    <select
                      id="smoke"
                      value={inputs.smoke}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Non-Smoker">Non-Smoker</option>
                      <option value="Occasional">Occasional</option>
                      <option value="Regular">Regular</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      id={field}
                      value={inputs[field]}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder={`${ranges[field][0]}-${ranges[field][1]}`}
                      required
                    />
                  )}
                  {errors[field] && (
                    <p className="text-red-500 text-sm">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-1/2 flex justify-center items-center px-5 py-2.5 ${
                  !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isFormValid}
              >
                Predict
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Predictor;
