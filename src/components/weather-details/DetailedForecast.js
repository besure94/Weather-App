import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// when adding graph, consider adding separate lines for temp, humidity, wind, rain, and snow

function DetailedForecast(props) {
  const { weatherApiObject,
    locationLocalTime,
    onRoundingTimeToHour,
    onConvertingTimeFormats,
    onDisplayingUpdated24HrForecast,
    selectedForecastDay } = props;
  const [detailedForecast, setDetailedForecast] = useState([]);

  useEffect(() => {
    const merged3DayForecastArray = weatherApiObject.forecast.forecastday.flatMap(day => day.hour);

    const roundedLocalTime = onRoundingTimeToHour(locationLocalTime);

    const formattedForecastTimes = onConvertingTimeFormats(merged3DayForecastArray);

    const todaysTwentyFourHourForecast = onDisplayingUpdated24HrForecast(formattedForecastTimes, roundedLocalTime);

    const showForecastInThreeHourSteps = filterForecastInThreeHourSteps(todaysTwentyFourHourForecast);

    let futureDaysTwentyFourHourForecast = null;
    let futureDaysForecastInThreeHourSteps = null;

    switch (selectedForecastDay) {
      case 1:
        futureDaysTwentyFourHourForecast = formattedForecastTimes.slice(24, 48);

        futureDaysForecastInThreeHourSteps = filterForecastInThreeHourSteps(futureDaysTwentyFourHourForecast);

        setDetailedForecast(futureDaysForecastInThreeHourSteps);
        break;
      case 2:
        futureDaysTwentyFourHourForecast = formattedForecastTimes.slice(48, 72);

        futureDaysForecastInThreeHourSteps = filterForecastInThreeHourSteps(futureDaysTwentyFourHourForecast);

        setDetailedForecast(futureDaysForecastInThreeHourSteps);
        break;
      default:
        setDetailedForecast(showForecastInThreeHourSteps);
    }

  }, [weatherApiObject, locationLocalTime, selectedForecastDay]);

  const filterForecastInThreeHourSteps = (hourlyForecast) => {
    const newForecastArray = hourlyForecast.filter((_hour, index) => index % 2 === 0);
    return newForecastArray;
  }

  return (
    <React.Fragment>
      <br/>
      <br/>
      <div className='weather-forecast'>
        <div className='location-weather-forecast'>
          <h4>Detailed Forecast</h4>
        </div>
        <br/>
        <div className="detailed-forecast">
          <React.Fragment>
            {detailedForecast.map((hour, index) =>
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

DetailedForecast.propTypes = {
  weatherApiObject: PropTypes.object,
  onRoundingTimeToHour: PropTypes.func,
  onConvertingTimeFormats: PropTypes.func,
  onDisplayingUpdated24HrForecast: PropTypes.func,
  selectedForecastDay: PropTypes.number
}

export default DetailedForecast;