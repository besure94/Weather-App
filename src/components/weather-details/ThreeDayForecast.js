import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { changeDateToWeekday } from '../utility-fns/convert-date-format';

function ThreeDayForeCast(props) {
  const { weatherApiObject } = props;
  console.log("API response: ", weatherApiObject);

  // working on changing first day in the 3 day forecast to say 'Today' //

  // const changeFirstDayToSayToday = (threeDayForecast) => {
  //   threeDayForecast.forecast.forecastday[0].date = "Today";
  //   return threeDayForecast;
  // }

  // console.log(changeFirstDayToSayToday(weatherApiObject.forecast.forecastday));

  return (
    <React.Fragment>
      <br/>
      <div className="three-day-forecast-container">
        <div className="three-day-forecast">
          <h4>3 Day Forecast</h4>
          <br/>
          <div className="forecast-for-each-day">
            <React.Fragment>
              {weatherApiObject.forecast.forecastday.map((forecast, index) =>
                <div key={index}>
                  <div className="day">
                    <h5>{changeDateToWeekday(forecast.date)}</h5>
                    <img className="three-day-forecast-icon" src={forecast.day.condition.icon} alt="An icon showing the general forecast for the day."/>
                    <h5>{forecast.day.maxtemp_f}{'\u00b0'}/{forecast.day.mintemp_f}{'\u00b0'}</h5>
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

ThreeDayForeCast.propTypes = {
  weatherApiObject: PropTypes.object
}

export default ThreeDayForeCast;