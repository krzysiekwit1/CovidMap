import React from "react";
import { Line, Bar } from "react-chartjs-2";
const CovidDataForSpecificCountry = (props) => {
  return (
    <>
      <div className="chart-container">
        <Bar data={props.chart1} borderWidth={1} />
      </div>
      <div className="chart-container">
        <Bar data={props.chart2} borderWidth={1} />
      </div>
      <div className="chart-container">
        <Bar data={props.chart3} borderWidth={1} />
      </div>
      <div className="chart-container">
        <Bar data={props.chart4} borderWidth={1} />
      </div>
    </>
  );
};
export default CovidDataForSpecificCountry;
