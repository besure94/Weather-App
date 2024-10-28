import React from "react";
import PropTypes from "prop-types";

function CurrentConditions(props) {
  const { weatherConditionsByDay, selectedForecastDay, isCelsiusSelected } = props;

  return (
    <React.Fragment>
      <div className="icon-and-temp">
        <img className="current-weather-icon" src={weatherConditionsByDay.icon} alt="An icon showing current weather conditions."/>
        {isCelsiusSelected ?
          <h2>{weatherConditionsByDay.temp_c}</h2>
          :
          <h2>{weatherConditionsByDay.temp_f}</h2>
        }
        {selectedForecastDay === 0 && (
          <h3>&nbsp;{'\u25CF'}&nbsp;Now</h3>
        )}
        {selectedForecastDay !== 0 && (
          <h3>{weatherConditionsByDay.condition}</h3>
        )}
      </div>

    {selectedForecastDay === 0 && (
      <h4>{isCelsiusSelected ? weatherConditionsByDay.feelsLike_c : weatherConditionsByDay.feelsLike_f}</h4>
    )}
  </React.Fragment>
  )
}

CurrentConditions.propTypes = {
  weatherConditionsByDay: PropTypes.object,
  selectedForecastDay: PropTypes.number,
  isCelsiusSelected: PropTypes.bool
}

export default CurrentConditions;