import React from "react";
import { Link } from "react-router-dom";

const Home = ({ endpoint = [] }) => {
  return (
    <div className="mb-11 relative">
      <h1 className="fixed top-0 left-0 right-0 h-[9vh] flex font-extrabold text-red-500 text-3xl items-center justify-center opacity-100 z-[200] blur-effect-theme">
        Cardiovascular Disease Risk Predictor
      </h1>
      {endpoint.map(({ id, heading, title, text, img, btn, linkpath }) => (
        <div
          key={id}
          className={`flex items-center mt-20 lg:mt-24 mb-10 justify-between lg:flex-col-reverse lg:justify-center nike-container ${
            id % 2 === 0 ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div className="max-w-lg lg:max-h-none w-full mt-5 md:text-center grid items-center lg:justify-items-center pb-4">
            <h1 className="text-4xl md:text-3xl font-bold text-gradient">
              {heading}
            </h1>
            <h1 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-slate-900 filter drop-shadow-lg">
              {title}
            </h1>
            <p className="xl:text-sm my-4 text-slate-900">{text}</p>
            <Link to={linkpath}>
              <button
                type="button"
                className="button-theme bg-slate-900 shadow-slate-900 py-1 text-slate-100"
              >
                {btn}
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center max-w-xl relative lg:max-w-none w-full">
            <img
              src={img}
              alt={`img/${heading}`}
              className="w-auto object-fill transitions-theme h-80 lg:h-64 md:h-60 sm:h-48 xsm:h-40 hover:scale-110"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
