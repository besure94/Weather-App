import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// take selectedForecastDay and create a new array that contains the hourly forecast

// if day is 'today', leave alone as it already handles showing the forecast based on the current hour

// if days 2 or 3, access the 1st or 2nd index of forecastday array, and conditionally render it based on which day it is

// of existing 3 day forecast array that already exists, the starting index of day 2 will be index 24 and ending at 47, and starting index of day 3 will be 48 and ending at 71

function HourlyForecast(props) {
  const { weatherApiObject,
    locationLocalTime,
    onRoundingTimeToHour,
    onConvertingTimeFormats,
    onDisplayingUpdated24HrForecast,
    selectedForecastDay } = props;
  const [todaysTwentyFourHourForecast, setTodaysTwentyFourHourForecast] = useState([]);
  const [futureDaysTwentyFourHourForecast, setFutureDaysTwentyFourHourForecast] = useState([]);
  console.log("3 day forecast: ", weatherApiObject.forecast.forecastday);

  useEffect(() => {
    // const forecast = weatherApiObject.forecast.forecastday[selectedForecastDay];
    // console.log("Forecast: ", forecast);
    // if (selectedForecastDay !== 0) {
    //   setFutureDaysTwentyFourHourForecast(forecast);
    // }
    // console.log("Forecast future: ", futureDaysTwentyFourHourForecast);
    const merged3DayForecastArray = weatherApiObject.forecast.forecastday.flatMap(day => day.hour);
    console.log("Merged 3 day forecast: ", merged3DayForecastArray);
    const roundedLocalTime = onRoundingTimeToHour(locationLocalTime);

    const formattedForecastTimes = onConvertingTimeFormats(merged3DayForecastArray);

    const newTwentyFourHourForecast = onDisplayingUpdated24HrForecast(formattedForecastTimes, roundedLocalTime);
    setTodaysTwentyFourHourForecast(newTwentyFourHourForecast);

  }, [weatherApiObject, locationLocalTime]);

  // const createHourlyForecastForFutureDays = (selectedDay) => {
  //   if (selectedDay !== 0) {

  //   }
  // }

  console.log("Selected day: ", selectedForecastDay);
  return (
    <React.Fragment>
      <br/>
      <br/>
      <div className='weather-forecast'>
        <div className='location-weather-forecast'>
          <h4>Hourly Forecast</h4>
        </div>
        <br/>
        <div className="hourly-forecast">
          <React.Fragment>
            {todaysTwentyFourHourForecast.map((hour, index) =>
              <div key={index} className="hour">
                <div className="hour-details">
                  <h6>{hour.temp_f}{'\u00b0'}</h6>
                  <img src={hour.condition.icon} className="hourly-icon" alt="An icon symbolizing current hourly weather condition."/>
                  <h6>{hour.time}</h6>
                </div>
              </div>
            )}
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  )
}

HourlyForecast.propTypes = {
  weatherApiObject: PropTypes.object,
  onRoundingTimeToHour: PropTypes.func,
  onConvertingTimeFormats: PropTypes.func,
  onDisplayingUpdated24HrForecast: PropTypes.func,
  selectedForecastDay: PropTypes.number
}

export default HourlyForecast;