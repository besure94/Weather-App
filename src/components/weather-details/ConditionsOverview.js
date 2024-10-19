import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDrop from '@mui/icons-material/WaterDrop';

function ConditionsOverview(props) {
  const { weatherApiObject, selectedForecastDay } = props;
  const [weatherConditionsByDay, setDisplayedWeatherByDay] = useState({});
  const [rainLikely, setRainLikely] = useState(false);
  const [snowLikely, setSnowLikely] = useState(false);

  useEffect(() => {
    const forecast = weatherApiObject.forecast.forecastday[selectedForecastDay];

    const dailyWeatherConditions = {
      icon: selectedForecastDay === 0
        ? weatherApiObject.current.condition.icon
        : forecast.day.condition.icon,
      temp: selectedForecastDay === 0
        ? `${weatherApiObject.current.temp_f}${'\u00b0'}F`
        : '',
      condition: selectedForecastDay === 0
        ? weatherApiObject.current.condition.text
        : forecast.day.condition.text,
      feelsLike: weatherApiObject.current.feelslike_f,
      wind: selectedForecastDay === 0
        ? `${weatherApiObject.current.wind_mph}mph`
        : `${forecast.day.maxwind_mph}mph`,
      humidity: selectedForecastDay === 0
        ? `${weatherApiObject.current.humidity}%`
        : `${forecast.day.avghumidity}%`,
      chanceOfRain: `${forecast.day.daily_chance_of_rain}%`,
      chanceOfSnow: `${forecast.day.daily_chance_of_snow}%`
    }

    setDisplayedWeatherByDay(dailyWeatherConditions);

    if (dailyWeatherConditions.chanceOfRain.replace(/[^0-9]/g, '') >= 20) {
      setRainLikely(true);
    } else {
      setRainLikely(false);
    }

    if (dailyWeatherConditions.chanceOfSnow.replace(/[^0-9]/g, '') >= 20) {
      setSnowLikely(true);
    } else {
      setSnowLikely(false);
    }

  }, [weatherApiObject, selectedForecastDay]);

  return (
    <React.Fragment>
      <div className='temp-and-conditions'>
        <h3>{weatherApiObject.location.name}, {weatherApiObject.location.region}, {weatherApiObject.location.country}</h3>
        <React.Fragment>
          <div className="icon-and-temp">
            <img className="current-weather-icon" src={weatherConditionsByDay.icon} alt="An icon showing current weather conditions."/>
            <h2>{weatherConditionsByDay.temp}</h2>
            {selectedForecastDay === 0 && (
              <h3>&nbsp;{'\u25CF'}&nbsp;Now</h3>
            )}
          </div>
          <h3>{weatherConditionsByDay.condition}</h3>
          <div className="humidity-wind-rain-snow">
            <h5><WaterIcon fontSize="large"/> {weatherConditionsByDay.humidity}</h5>
            <h5><AirIcon fontSize='large'/> {weatherConditionsByDay.wind}</h5>
            {rainLikely && (
              <h5><WaterDrop fontSize="large"/> {weatherConditionsByDay.chanceOfRain}</h5>
            )}
            {snowLikely && (
              <h5><AcUnitIcon fontSize="large"/> {weatherConditionsByDay.chanceOfSnow}</h5>
            )}
          </div>
        </React.Fragment>
      </div>
    </React.Fragment>
  )
}

ConditionsOverview.propTypes = {
  weatherApiObject: PropTypes.object,
  selectedForecastDay: PropTypes.number
}

export default ConditionsOverview;