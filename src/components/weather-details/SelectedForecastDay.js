import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function SelectedForecastDay(props) {
  const { weatherApiObject } = props;
  console.log("API response obj: ", weatherApiObject);

  return (
    <React.Fragment>
      <br/>
      <div className="selected-forecast-container">
        <div className="selected-forecast-day">
        </div>
      </div>
    </React.Fragment>
  )
}

SelectedForecastDay.propTypes = {
  weatherApiObject: PropTypes.object,
  today: PropTypes.string
}

export default SelectedForecastDay;