import React, { useState } from "react";
import { HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Predictor = () => {
  const [inputs, setInputs] = useState({
    sbp: "",
    ldl: "",
    dbp: "",
    tgc: "",
    tc: "",
    bs: "",
    hdl: "",
    bmi: "",
  });

  const [errors, setErrors] = useState({});

  const ranges = {
    Systolic_Blood_Pressure: [90, 180],
    LDL_Cholesterol: [50, 190],
    Diastolic_Blood_Pressure: [60, 110],
    Triglycerides: [50, 500],
    Total_Cholesterol: [100, 300],
    Blood_Sugar: [70, 200],
    HDL_Cholesterol: [20, 100],
    Body_Mass_Index: [10, 60],
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    const numericValue = parseInt(value, 10);

    // Validate input on blur to check if within the range
    if (
      !isNaN(numericValue) &&
      numericValue >= ranges[id][0] &&
      numericValue <= ranges[id][1]
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: `Please enter a value between ${ranges[id][0]} and ${ranges[id][1]}.`,
      }));
    }
  };

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

      <h1 className="flex justify-center items-center font-semibold text-2xl mt-24 mb-5 text-gray-900">
        Please Fill Your Health Metrics
      </h1>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-2xl px-6 py-10 bg-white rounded-lg shadow-2xl ">
          <form>
            <div className="grid gap-6 mb-6 grid-cols-2">
              {Object.keys(ranges).map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    {field.replaceAll("_", " ")}
                    <span className="text-red-700">*</span>
                  </label>
                  <div>
                    <input
                      type="text"
                      id={field}
                      value={inputs[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder={`${ranges[field][0]}-${ranges[field][1]}`}
                      required
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm">{errors[field]}</p>
                    )}
                  </div>
                </div>
              ))}
              <div>
                <label
                  htmlFor="smoke"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Smoking Status<span className="text-red-700">*</span>
                </label>
                <select
                  id="smoke"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                  required
                >
                  <option value="">Select</option>
                  <option value="non">Non-Smoker</option>
                  <option value="occ">Occasional</option>
                  <option value="reg">Regular</option>
                </select>
              </div>
            </div>
            <Link to="/Home/Predictor/ResultPredict">
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-1/2 flex justify-center items-center px-5 py-2.5"
                >
                  Predict
                </button>
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Predictor;
