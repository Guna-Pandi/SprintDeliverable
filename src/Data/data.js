import Heart from "../assets/cvdimage1.jpg";
import Dashboard from "../assets/Dashboard.png";

const cvd = [
  {
    id: 1,
    heading: "CVD RISK",
    title: "PREDICTION",
    text: "Our CVD Risk Prediction App is designed to help individuals assess their risk of cardiovascular disease (CVD) and make informed decisions about their health. Using advanced data analysis and health metrics, the app evaluates key factors such as blood pressure, cholesterol levels, lifestyle choices to estimate each user's CVD risk.",
    btn: "Predict",
    linkpath: "/Home/Predictor",
    img: Heart,
  },
  {
    id: 2,
    heading: "CVD RISK",
    title: "DASHBOARD",
    text: "The CVD Risk Dashboard is an interactive tool designed to provide users with a clear, real-time overview of their cardiovascular health. With data visualizations and easy-to-read metrics, the dashboard offers users insights into their CVD risk profile by displaying key health indicators, such as blood pressure, cholesterol levels, heart rate, and lifestyle habits. Using this each user can track their progress over time, identify trends, and receive alerts when certain health metrics require attention.",
    btn: "Dashboard",
    linkpath: "/Home/Dashboard",
    img: Dashboard,
  },
];

export { cvd };
