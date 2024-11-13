import React from "react";
import { HiHome } from "react-icons/hi2";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ResultPredict = () => {
  return (
    <div className="mb-11 relative">
      <h1 className="fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center md:justify-center font-extrabold text-white text-3xl opacity-100 z-[100] blur-effect-theme">
        <div className="flex gap-4 absolute top-1/2 transform -translate-y-1/2 left-5 md:hidden  text-3xl cursor-pointer ">
          <Link to="/Home/Predictor">
            <IoMdArrowRoundBack  className="hover:scale-90"/>
          </Link>
          <Link to="/">
            <HiHome className="hover:scale-90"/>
          </Link>
        </div>
        <span className="text-center">
          Cardiovascular Disease Risk Predictor
        </span>
      </h1>
    </div>
  );
};

export default ResultPredict;
