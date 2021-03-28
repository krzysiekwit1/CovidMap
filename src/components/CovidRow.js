import React from "react";
const CovidRow = (props) => {
  return (
    <>
      <tr>
        <td>{props.number}</td>
        <td onClick={props.showCharts}>{props.country}</td>
        <td>{props.cases}</td>
        <td>{props.activeCases}</td>
        <td>{props.deaths}</td>
        <td>{props.testsNumber}</td>
        <td>{props.todayCases}</td>
        <td>{props.todayDeaths}</td>
        <td>{props.todayRecovered}</td>
      </tr>
    </>
  );
};
export default CovidRow;
