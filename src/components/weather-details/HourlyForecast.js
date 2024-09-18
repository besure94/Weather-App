import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { format, roundToNearestHours, roundToNearestMinutes } from "date-fns";

function HourlyForecast(props) {
  const { weatherApiObject, locationLocalTime, convertDateFormat } = props;
  const [twentyHourForecast, setTwentyFourHourForecast] = useState([]);
  const [threeDayForecast, setThreeDayForecast] = useState([]);
  const [roundedTime, setRoundedTime] = useState(null);

  // console.log("Weather API obj: ", weatherApiObject);
  console.log("3 day forecast: ", threeDayForecast);
  // console.log("Location local time: ", locationLocalTime);

  useEffect(() => {
    const merged3DayForecastArray = weatherApiObject.forecast.forecastday.flatMap(day => day.hour);
    setThreeDayForecast(merged3DayForecastArray);
    const roundedLocalTime = roundLocalTimeToHour(locationLocalTime);
    setRoundedTime(roundedLocalTime);
  }, []);


  // need to first round the current local time to the nearest hour, while keeping AM or PM - done

  // need to also round all of the times in the 3 day forecast to match this time format - do next

  // then need to find the first index where this current local time is in the 3 day forecast array

  // then need to trim the array so that the first index is the one closest to current local time

  // then need to jump to 24 hours from this index, and create new array, and display this under Hourly Forecast

  const roundLocalTimeToHour = (localTime) => {
    let meridiem = localTime.slice(-2);
    let [hours, minutes] = localTime.slice(0, -2).trim().split(":").map(Number);

    if (minutes >= 30) {
      hours += 1;
    }

    if (hours === 12 && meridiem === 'am') {
      hours = 12;
    } else if (hours === 12 && meridiem === 'pm') {
      hours = 12;
    } else if (hours === 13 && meridiem === 'pm') {
      hours = 1;
    } else if (hours === 0) {
      hours = 12;
    }

    return `${hours}:00${meridiem}`;
  }

  // const startForecastDisplayAtCurrentTime = (forecastArray) => {
  //   forecastArray.forEach(index => {
  //     if (index.time)
  //   });
  // }

  return (
    <React.Fragment>
      <br/>
      <div className='weather-forecast'>
        <div className='location-weather-forecast'>
        <h4>Hourly Forecast</h4>
        <br/>
          <div className="hourly-forecast">
            <React.Fragment>
              {/* displaying 3 day forecast temporarily */}
              {threeDayForecast.map((hour, index) =>
                <div key={index}>
                  <div className="hour">
                    <h6>{hour.temp_f}{'\u00b0'}</h6>
                    <img src={hour.condition.icon} alt="An icon symbolizing current hourly weather condition."/>
                    <h6>{convertDateFormat(hour.time)}</h6>
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