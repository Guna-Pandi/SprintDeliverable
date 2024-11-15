import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from "../FormContext"; // Assuming form data is stored here
import axios from 'axios';

const ResultPredict = () => {
  const { formData } = useContext(FormContext); // Get form data from context
  const [prediction, setPrediction] = useState(null); // Store the prediction result
  const [error, setError] = useState(null); // Store any error messages

  useEffect(() => {
    const makePrediction = async () => {
      // Convert formData values to the correct format
      const inputValues = Object.values(formData).map(val => {
        if (val === "Non-Smoker" || val === "Smoker") return val; // Handle categorical data
        return isNaN(val) ? val : parseFloat(val); // Ensure numeric values are converted to floats
      });

      console.log("Input values to send:", inputValues); // Debugging log

      try {
        // Send a POST request to Flask API
        const response = await axios.post('http://127.0.0.1:5000/predict', {
          input: inputValues,
        });

        // Check the response for a prediction
        if (response.data && response.data.prediction) {
          setPrediction(response.data.prediction);
        } else {
          setPrediction('No prediction received.');
        }
      } catch (err) {
        console.error("Error making prediction request:", err);
        setError('Error occurred during prediction. Please try again.');
      }
    };

    // Only send the request if formData has valid values
    if (formData && Object.keys(formData).length > 0) {
      makePrediction();
    }
  }, [formData]); // Re-run when formData changes

  return (
    <div>
      <h2>Risk Prediction</h2>
      {error && (
        <div style={{ color: 'red' }}>
          <p>Error: {error}</p>
        </div>
      )}
      {prediction ? (
        <div>
          <h3>Prediction: {prediction}</h3>
        </div>
      ) : (
        <p>Loading prediction...</p>
      )}
    </div>
  );
};

export default ResultPredict;
