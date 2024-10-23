import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// change 24 hour forecast to only display in 2-3 hour increments

// will determine which one is best later

function HourlyForecast(props) {
  const { weatherApiObject,
    locationLocalTime,
    onRoundingTimeToHour,
    onConvertingTimeFormats,
    onDisplayingUpdated24HrForecast,
    selectedForecastDay } = props;
  const [twentyFourHourForecast, setTwentyFourHourForecast] = useState([]);

  useEffect(() => {
    const merged3DayForecastArray = weatherApiObject.forecast.forecastday.flatMap(day => day.hour);

    const roundedLocalTime = onRoundingTimeToHour(locationLocalTime);

    const formattedForecastTimes = onConvertingTimeFormats(merged3DayForecastArray);

    const todaysTwentyFourHourForecast = onDisplayingUpdated24HrForecast(formattedForecastTimes, roundedLocalTime);

    let futureDaysTwentyFourHourForecast = null;

    switch (selectedForecastDay) {
      case 1:
        futureDaysTwentyFourHourForecast = formattedForecastTimes.slice(24, 48);
        setTwentyFourHourForecast(futureDaysTwentyFourHourForecast);
        break;
      case 2:
        futureDaysTwentyFourHourForecast = formattedForecastTimes.slice(48, 72);
        setTwentyFourHourForecast(futureDaysTwentyFourHourForecast);
        break;
      default:
        setTwentyFourHourForecast(todaysTwentyFourHourForecast);
    }

  }, [weatherApiObject, locationLocalTime, selectedForecastDay]);

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
            {twentyFourHourForecast.map((hour, index) =>
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