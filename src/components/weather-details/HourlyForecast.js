import React from "react";
import PropTypes from "prop-types";

// working on displaying hourly forecast
function HourlyForecast(props) {
  const { twentyFourHourForecast } = props;
  const hourByHour = twentyFourHourForecast.forecast.forecastday[0].hour;
  console.log("24 hr: ", hourByHour);

  return (
    <React.Fragment>
      <br/>
      <br/>
      <div className='current-weather'>
        <div className='location-weather'>
        <h5>Hourly Forecast</h5>
          <div className="hourly-forecast">
            <React.Fragment>
              {/* Each hour needs to show the temp, an icon, and the time - time needs to be rounded to the hour */}
              {hourByHour.map((hour, index) =>
                <div key={index}>
                  <div className="hour">
                    <h6>{hour.temp_f}{'\u00b0'}</h6>
                    <img src={hour.condition.icon}/>
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
  twentyFourHourForecast: PropTypes.object
}

export default HourlyForecast;