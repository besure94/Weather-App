import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDrop from '@mui/icons-material/WaterDrop';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness4Icon from '@mui/icons-material/Brightness4';

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
      feelsLike: `Feels like ${weatherApiObject.current.feelslike_f}${'\u00b0'}F`,
      wind: selectedForecastDay === 0
        ? `${weatherApiObject.current.wind_mph}mph`
        : `${forecast.day.maxwind_mph}mph`,
      humidity: selectedForecastDay === 0
        ? `${weatherApiObject.current.humidity}%`
        : `${forecast.day.avghumidity}%`,
      chanceOfRain: `${forecast.day.daily_chance_of_rain}%`,
      chanceOfSnow: `${forecast.day.daily_chance_of_snow}%`,
      sunrise: selectedForecastDay !== 0
        ? `${forecast.astro.sunrise}`
        : '',
      sunset: selectedForecastDay !== 0
        ? `${forecast.astro.sunset}`
        : ''
    }

    setDisplayedWeatherByDay(dailyWeatherConditions);

    if (dailyWeatherConditions.chanceOfRain.replace(/[^0-9]/g, '') >= 10) {
      setRainLikely(true);
    } else {
      setRainLikely(false);
    }

    if (dailyWeatherConditions.chanceOfSnow.replace(/[^0-9]/g, '') >= 10) {
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
            {selectedForecastDay !== 0 && (
              <h3>{weatherConditionsByDay.condition}</h3>
            )}
          </div>

          {selectedForecastDay === 0 && (
            <h4>{weatherConditionsByDay.feelsLike}</h4>
          )}

          <div className="humidity-wind-rain-snow">
            <h5><WaterIcon fontSize="large"/>&nbsp;{weatherConditionsByDay.humidity}</h5>
            <h5><AirIcon fontSize='large'/>&nbsp;{weatherConditionsByDay.wind}</h5>
            {rainLikely && (
              <h5><WaterDrop fontSize="large"/>&nbsp;{weatherConditionsByDay.chanceOfRain}</h5>
            )}
            {snowLikely && (
              <h5><AcUnitIcon fontSize="large"/>&nbsp;{weatherConditionsByDay.chanceOfSnow}</h5>
            )}
          </div>

          {selectedForecastDay !== 0 && (
            <div className="sunrise-sunset">
              <h5><Brightness6Icon fontSize="large"/>&nbsp;{weatherConditionsByDay.sunrise}</h5>
              <h5><Brightness4Icon fontSize="large"/>&nbsp;{weatherConditionsByDay.sunset}</h5>
            </div>
          )}
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