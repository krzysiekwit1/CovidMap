import React from "react";
import Chart from "react-google-charts";
const MapChart = (props) => {
  return (
    <div className="map-chart-container">
      <Chart
        chartType="GeoChart"
        width="100%"
        height="400px"
        data={props.data}
        mapsApiKey="AIzaSyD86IgLxbcyXtvVKnRjkHmHBemocqx6Jb4"
        options={{
          backgroundColor: "#white",

          colorAxis: { colors: ["#f0ee8d", "#dfe300"] },
          datalessRegionColor: "#a3a3a3",
        }}
      />
    </div>
  );
};
export default MapChart;
