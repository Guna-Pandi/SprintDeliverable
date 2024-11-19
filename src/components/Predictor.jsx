import React, { useState, useContext } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import { HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Predictor = () => {
  const { setFormData } = useContext(FormContext);

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

  const [result, setResult] = useState("");
  const [advice, setAdvice] = useState(""); // State to store personalized advice
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

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

    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));

    // Validate input value on change
    if (id !== "smoke") {
      const [min, max] = ranges[id];
      if (
        value !== "" &&
        (parseFloat(value) < min || parseFloat(value) > max)
      ) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [id]: `Value should be between ${min} and ${max}`,
        }));
      } else {
        setValidationErrors((prevErrors) => {
          const { [id]: removedError, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setResult("");
    setAdvice(""); // Clear the advice on form submit

    let smokeNumeric = 0;
    if (inputs.smoke === "Occasional") smokeNumeric = 1;
    if (inputs.smoke === "Regular") smokeNumeric = 2;

    const inputArray = [
      parseFloat(inputs.sbp),
      parseFloat(inputs.ldl),
      parseFloat(inputs.dbp),
      parseFloat(inputs.tgc),
      parseFloat(inputs.tc),
      parseFloat(inputs.bs),
      parseFloat(inputs.hdl),
      parseFloat(inputs.bmi),
      smokeNumeric,
      parseFloat(inputs.heart_rate),
    ];

    try {
      const response = await axios.post("https://sprintdeliverablebackend-1.onrender.com/predict", {
        input: inputArray,
      });

      if (response.data.prediction) {
        setResult(`Risk Category: ${response.data.prediction}`);
        setAdvice(response.data.advice); // Set personalized advice from the backend
        setFormData(inputs);
      } else {
        setErrorMessage("Error: Could not get a prediction from the server.");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.error || "Error occurred during the request."
      );
    }
    setShowModal(true);
  };

  const isFormValid = Object.keys(inputs).every((field) => {
    if (field === "smoke") {
      return inputs[field] !== "";
    }
    return (
      inputs[field] !== "" &&
      !isNaN(parseFloat(inputs[field])) &&
      !validationErrors[field]
    );
  });

  const handleClear = () => {
    setInputs({
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
    setResult("");
    setAdvice("");
    setErrorMessage("");
    setValidationErrors({});
  };

  const closeModal = () => {
    setShowModal(false);
    setResult("");
    setErrorMessage("");
    setAdvice(""); // Clear the advice when closing the modal
  };

  return (
    <div className="mb-11 relative">
      <h1 className="fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center font-extrabold text-white text-3xl opacity-100 z-[100] blur-effect-theme">
        <div className="absolute top-1/2 transform -translate-y-1/2 left-5 md:hidden text-3xl cursor-pointer ">
          <Link to="/">
            <HiHome className="hover:scale-90" />
          </Link>
        </div>
        <span className="text-center">
          Cardiovascular Disease Risk Predictor
        </span>
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
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                        validationErrors[field]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder={
                        ranges[field]
                          ? `${ranges[field][0]}-${ranges[field][1]}`
                          : "Enter value"
                      }
                      required
                    />
                  )}
                  {validationErrors[field] && (
                    <p className="text-red-500 text-xs mt-1">
                      {validationErrors[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                type="submit"
                className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-1/2 flex justify-center items-center px-5 py-2.5 ${
                  !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isFormValid}
              >
                Predict
              </button>

              {/* Clear Button */}
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-700 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-1/2 flex justify-center items-center px-5 py-2.5"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0  left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full ">
            <h2 className="text-2xl font-bold flex justify-center items-center text-gray-900 mb-4">Result</h2>

            {result && (
              <p>
                <span className="font-bold text-gray-700">Risk Category:</span>{" "}
                <span
                  className={
                    result.includes("High Risk")
                      ? "text-red-600" // Apply red text for high risk
                      : "text-green-600" // Apply green text for low risk
                  }
                >
                  {result.replace("Risk Category:", "").trim()}
                </span>
              </p>
            )}

            {advice && (
              <p className="mt-4">
                <span className="font-bold text-gray-700">
                  Personalized Advice:
                </span>{" "}
                {advice}
              </p>
            )}

            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Predictor;
