import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CurrentConditions from "./CurrentConditions";
import ConditionsDetails from './ConditionsDetails';
import SunriseSunset from './SunriseSunset';

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
        <h3>{weatherApiObject.location.name}, {weatherApiObject.location.region}</h3>
        <h3>{weatherApiObject.location.country}</h3>
        <React.Fragment>
          <CurrentConditions
            weatherConditionsByDay={weatherConditionsByDay} selectedForecastDay={selectedForecastDay}/>
          <ConditionsDetails
            weatherConditionsByDay={weatherConditionsByDay}
            rainLikely={rainLikely}
            snowLikely={snowLikely}/>
          <SunriseSunset
            weatherConditionsByDay={weatherConditionsByDay} selectedForecastDay={selectedForecastDay}/>
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