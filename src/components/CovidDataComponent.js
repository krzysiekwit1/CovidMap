import React from "react";
const CovidDataComponent = (props) => {
    return (
        <div style={props.style} className="covid-data-component">
            <img className="data-icon" src={props.icon} />

            <p className="covid-data-component-p">{props.information}</p>
            <p className="covid-data-component-p">{props.informationData}</p>
        </div>
    );
};
export default CovidDataComponent;
