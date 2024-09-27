import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { changeDateToWeekday } from '../utility-fns/convert-date-format';

// trying to get the first day of the 3 day forecast to render as "Today"
function ThreeDayForeCast(props) {
  const { weatherApiObject } = props;
  console.log("API object: ", weatherApiObject);
  const [new3DayForecast, setNew3DayForecast] = useState([]);
  const [firstDay, setFirstDay] = useState(null);
  const [isDayOne, setIsDayOne] = useState(false);

  useEffect(() => {
    const updated3DayForecast = changeDateFormatsToWeekday(weatherApiObject.forecast.forecastday);
    setNew3DayForecast(updated3DayForecast);
    console.log("New 3 day: ", updated3DayForecast);
    const firstDayOfForecast = changeFirstDayToSayToday(updated3DayForecast);
    setFirstDay(firstDayOfForecast);
    console.log(firstDayOfForecast);
    setIsDayOne(!isDayOne);
    console.log(isDayOne);
  }, [weatherApiObject]);

  const changeDateFormatsToWeekday = (threeDayForecast) => {
    return threeDayForecast.map(day => {
      return {
        ...day,
        date: changeDateToWeekday(day.date),
      };
    });
  };

  const changeFirstDayToSayToday = (new3DayForecast) => {
    const modifiedFirstDay = Object.assign({}, new3DayForecast[0], {date: "Today"});
    return modifiedFirstDay;
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
              {new3DayForecast.map((forecast, index) =>
                <div key={index}>
                  <div className="day">
                    {/* {isDayOne === true && (
                      <h5>{firstDay}</h5>
                    )} */}
                    <h5>{forecast.date}</h5>
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