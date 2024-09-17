import React, { useState } from "react";
import PropTypes from "prop-types";

function HourlyForecast(props) {
  const { weatherApiObject, locationLocalTime, convertDateFormat } = props;
  const currentDay24HourForecast = weatherApiObject.forecast.forecastday[0].hour;

  const [time24HoursFromNow, setTime24HoursFromNow] = useState(null);

  console.log("Current day 24 hr forecast: ", currentDay24HourForecast);
  console.log("Weather API obj: ", weatherApiObject);

  function identifyTime24HoursFromNow(currentTime) {

  }

  return (
    <React.Fragment>
      <br/>
      <div className='weather-forecast'>
        <div className='location-weather-forecast'>
        <h4>Hourly Forecast</h4>
        <br/>
          <div className="hourly-forecast">
            <React.Fragment>
              {/*
                - time needs to be rounded to the hour
                - need to identify the current time, and display that first.
                - needs to run for 24 hours from current time to 24 hours from then
                - need a condition/function that identifies current time
                - time needs to run for 24 hours from current time
                - time 24 hours from then will be in different array, so need to account for that
              */}
              {currentDay24HourForecast.map((hour, index) =>
                <div key={index}>
                  <div className="hour">
                    <h6>{hour.temp_f}{'\u00b0'}</h6>
                    <img src={hour.condition.icon} alt="An icon symbolizing current hourly weather condition."/>
                    <h6>{hour.time}</h6>
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

HourlyForecast.propTypes = {
  weatherApiObject: PropTypes.object,
  convertDateFormat: PropTypes.func
}

export default HourlyForecast;