import React from "react";

const Predictor = () => {
  return (
    <div className="mb-11 relative">
      <h1 className="fixed top-0 left-0 right-0 h-[9vh] flex font-extrabold text-red-500 text-3xl items-center justify-center opacity-100 z-[200] blur-effect-theme">
        Prediction Details
      </h1>
      <h1 className="flex justify-center items-center font-semibold text-3xl mt-24 mb-5  text-gray-900">
        DETAILS
      </h1>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-2xl px-6 py-10 bg-white rounded-lg shadow-2xl ">
          <form>
            <div className="grid gap-6 mb-6 grid-cols-2">
              <div>
                <label
                  htmlFor="dbp"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Systolic Blood Pressure
                  <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="sbp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="100"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="ldl"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  LDL Cholesterol
                  <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="ldl"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="dbp"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Diastolic Blood Pressure
                  <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="dbp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Company Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="tgc"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Triglycerides
                  <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="tgc"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="123-45-678"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="tc"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Total Cholesterol
                  <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="tc"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="bs"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Blood Sugar
                  <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="bs"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="hdl"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  HDL Cholesterol 
                  <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="hdl"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="bmi"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Body Mass Index 
                  <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="bmi"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
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
                {" "}
                <option value="">Select</option>
                <option value="non">Non-Smoker</option>
                <option value="occ">Occasional</option>
                <option value="reg">Regular</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-1/2 flex justify-center items-center px-5 py-2.5"
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
