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

  // loop through 24 hour forecast array, identify time in each index, and convert the time using convertDateFormat

  // compare time for each index to locationLocalTime

  // if the index is equal to locationLocalTime, cut off all indexes prior to it

  // make a new array, and use this to loop through and display (for starters)

  // then need a way to access the following day in the 3 day forecast array, identify the time (24 hours from locationLocalTime), and display that

  return (
    <React.Fragment>
      <br/>
      <div className='weather-forecast'>
        <div className='location-weather-forecast'>
        <h4>Hourly Forecast</h4>
        <br/>
          <div className="hourly-forecast">
            <React.Fragment>
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