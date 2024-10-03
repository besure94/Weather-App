import React from "react";
import PropTypes from "prop-types";

function CurrentWeatherDetails(props) {
  const { weatherApiObject } = props;

  return (
    <React.Fragment>
      <div className="current-weather-details">
        <div className='details'>
          <h5>Air Quality</h5>
          <p>{weatherApiObject.current.air_quality["us-epa-index"]}</p>
        </div>
        <div className='details'>
          <h5>UV Index</h5>
          <p>{weatherApiObject.current.uv}</p>
        </div>
        <div className='details'>
          <h5>Humidity</h5>
          <p>{weatherApiObject.current.humidity}%</p>
        </div>
        <div className='details'>
          <h5>Wind</h5>
          <p>{weatherApiObject.current.wind_mph}mph</p>
        </div>
      </div>
    </React.Fragment>
  )
}

CurrentWeatherDetails.propTypes = {
  weatherApiObject: PropTypes.object
}

export default CurrentWeatherDetails;