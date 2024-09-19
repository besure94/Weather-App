import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { convertDateFormat, trimTimeToHour } from '../utility-fns/convert-date-format';

function HourlyForecast(props) {
  const { weatherApiObject, locationLocalTime } = props;
  const [twentyHourForecast, setTwentyFourHourForecast] = useState([]);
  const [threeDayForecast, setThreeDayForecast] = useState([]);
  const [formattedThreeDayForecastTimes, setFormattedThreeDayForecastTimes] = useState([]);
  const [roundedTime, setRoundedTime] = useState(null);

  useEffect(() => {
    const merged3DayForecastArray = weatherApiObject.forecast.forecastday.flatMap(day => day.hour);
    setThreeDayForecast(merged3DayForecastArray);

    const roundedLocalTime = roundLocalTimeToHour(locationLocalTime);
    setRoundedTime(roundedLocalTime);

    const formattedForecastTimes = convertForecastTimeFormats(merged3DayForecastArray);
    setFormattedThreeDayForecastTimes(formattedForecastTimes);
  }, [weatherApiObject, locationLocalTime]);


  // need to first round the current local time to the nearest hour, while keeping AM or PM - done

  // need to convert formats of each time in each hourly forecast - done

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
    } else if (hours === 13) {
      hours = 1;
    } else if (hours === 0) {
      hours = 12;
    }

    return `${hours}:00${meridiem}`;
  }

  const convertForecastTimeFormats = (forecastArray) => {
    return forecastArray.map(index => {
      return {
        ...index,
        time: convertDateFormat(index.time)
      };
    });
  };

  // can identify the first index that matches current local time

  // need to mutate array next
  const startForecastDisplayAtCurrentLocalTime = (forecastArray, timeToMatch) => {
    let firstMatchingIndex = forecastArray.findIndex(index => index.time === timeToMatch);
    console.log(firstMatchingIndex);
    forecastArray.slice(firstMatchingIndex);
    console.log(forecastArray);
    return forecastArray;
  }

  console.log("Rounded local time: ", roundedTime);
  console.log("Formatted 3 day forecast times: ", formattedThreeDayForecastTimes);
  console.log(startForecastDisplayAtCurrentLocalTime(formattedThreeDayForecastTimes, roundedTime));

  return (
    <React.Fragment>
      <br/>
      <div className='weather-forecast'>
        <div className='location-weather-forecast'>
        <h4>Hourly Forecast</h4>
        <br/>
          <div className="hourly-forecast">
            <React.Fragment>
              {/* displaying 3 day forecast temporarily - supposed to display only for 24 hours */}
              {threeDayForecast.map((hour, index) =>
                <div key={index}>
                  <div className="hour">
                    <h6>{hour.temp_f}{'\u00b0'}</h6>
                    <img src={hour.condition.icon} alt="An icon symbolizing current hourly weather condition."/>
                    <h6>{trimTimeToHour(hour.time)}</h6>
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