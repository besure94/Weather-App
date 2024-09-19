import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { convertDateFormat } from '../utility-fns/convert-date-format';

function HourlyForecast(props) {
  const { weatherApiObject, locationLocalTime } = props;
  const [twentyFourHourForecast, setTwentyFourHourForecast] = useState([]);

  useEffect(() => {
    const merged3DayForecastArray = weatherApiObject.forecast.forecastday.flatMap(day => day.hour);

    const roundedLocalTime = roundLocalTimeToHour(locationLocalTime);

    const formattedForecastTimes = convertForecastTimeFormats(merged3DayForecastArray);

    const newTwentyFourHourForecast = displayUpdated24HourForecast(formattedForecastTimes, roundedLocalTime);
    setTwentyFourHourForecast(newTwentyFourHourForecast);

  }, [weatherApiObject, locationLocalTime]);

  const roundLocalTimeToHour = (localTime) => {
    let meridiem = localTime.slice(-2);
    let hours = parseInt(localTime.slice(0, -4));

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

  const displayUpdated24HourForecast = (forecastArray, timeToMatch) => {
    let firstMatchingIndex = forecastArray.findIndex(index => index.time === timeToMatch);
    let slicedArray = forecastArray.slice(firstMatchingIndex, firstMatchingIndex + 25);
    slicedArray[0].time = "Now";
    return slicedArray;
  }

  return (
    <React.Fragment>
      <br/>
      <div className='weather-forecast'>
        <div className='location-weather-forecast'>
        <h4>24 Hour Forecast</h4>
        <br/>
          <div className="hourly-forecast">
            <React.Fragment>
              {twentyFourHourForecast.map((hour, index) =>
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