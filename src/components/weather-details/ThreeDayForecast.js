import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ThreeDayForeCast(props) {
  const { weatherApiObject } = props;
  console.log("API response: ", weatherApiObject);
  // const [threeDayForecast, setThreeDayForecast] = useState([]);

  useEffect(() => {
  }, [weatherApiObject]);

  return (
    <React.Fragment>
      <br/>
      <div className="three-day-forecast-container">
        <div className="three-day-forecast">
          <h4>3 Day Forecast</h4>
          <br/>
          <div className="forecast-for-each-day">
            <React.Fragment>
              {weatherApiObject.forecast.forecastday.map((index) =>
                <div key={index}>
                  <div className="day">
                    <h5>{index.date}</h5>
                    <img className="three-day-forecast-icon" src={index.day.condition.icon} alt="An icon showing the general forecast for the day."/>
                    <h5>{index.day.maxtemp_f}{'\u00b0'}/{index.day.mintemp_f}{'\u00b0'}</h5>
                  </div>
                </div>
              )}
            </React.Fragment>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

ThreeDayForeCast.propTypes = {
  weatherApiObject: PropTypes.object
}

export default ThreeDayForeCast;