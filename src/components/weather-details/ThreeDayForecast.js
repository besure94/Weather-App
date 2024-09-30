import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectedForecastDay from "./SelectedForecastDay";

function ThreeDayForeCast(props) {
  const { weatherApiObject, onChanging3DayDateFormats, onChangingFirstDayToSayToday } = props;
  const [threeDayForecast, setNew3DayForecast] = useState([]);
  const [selectedForecastDay, setSelectedForecastDay] = useState(null);

  useEffect(() => {
    const threeDayForecastWithNewDates = onChanging3DayDateFormats(weatherApiObject.forecast.forecastday);
    setNew3DayForecast(threeDayForecastWithNewDates);

    const moddedFirstDayOfForecast = onChangingFirstDayToSayToday(threeDayForecastWithNewDates);
    const final3DayForecast = [moddedFirstDayOfForecast, ...threeDayForecastWithNewDates.slice(1)];
    setNew3DayForecast(final3DayForecast);

  }, [weatherApiObject]);

  const selectDayFromForecast = (forecastDay) => {
    setSelectedForecastDay(forecastDay === selectedForecastDay ? null : forecastDay);
  }

  return (
    <React.Fragment>
      <br/>
      <div className="three-day-forecast-container">
        <div className="three-day-forecast">
          <h4>3 Day Forecast</h4>
          <br/>
          <div className="forecast-for-each-day">
            <React.Fragment>
              {threeDayForecast.map((forecast, index) =>
                <div key={index}>
                  <div className="day" onClick={() => selectDayFromForecast(index)}>
                    <h5>{forecast.date}</h5>
                    <img className="three-day-forecast-icon" src={forecast.day.condition.icon} alt="An icon showing the general forecast for the day."/>
                    <h5>{forecast.day.maxtemp_f}{'\u00b0'}/{forecast.day.mintemp_f}{'\u00b0'}</h5>
                  </div>
                  {selectedForecastDay === index && (
                    <SelectedForecastDay weatherApiObject={weatherApiObject}/>
                  )}
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
  weatherApiObject: PropTypes.object,
  onChanging3DayDateFormats: PropTypes.func,
  onChangingFirstDayToSayToday: PropTypes.func
}

export default ThreeDayForeCast;