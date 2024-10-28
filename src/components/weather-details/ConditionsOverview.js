import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CurrentConditions from "./CurrentConditions";
import ConditionsDetails from './ConditionsDetails';
import SunriseSunset from './SunriseSunset';

function ConditionsOverview(props) {
  const { weatherApiObject, selectedForecastDay, isCelsiusSelected } = props;
  const [weatherConditionsByDay, setDisplayedWeatherByDay] = useState({});
  const [rainLikely, setRainLikely] = useState(false);
  const [snowLikely, setSnowLikely] = useState(false);

  useEffect(() => {
    const forecast = weatherApiObject.forecast.forecastday[selectedForecastDay];

    const dailyWeatherConditions = {
      icon: selectedForecastDay === 0
        ? weatherApiObject.current.condition.icon
        : forecast.day.condition.icon,
      temp_f: selectedForecastDay === 0
        ? `${weatherApiObject.current.temp_f}${'\u00b0'}`
        : '',
      temp_c: selectedForecastDay === 0
        ? `${weatherApiObject.current.temp_c}${'\u00b0'}`
        : '',
      condition: selectedForecastDay === 0
        ? weatherApiObject.current.condition.text
        : forecast.day.condition.text,
      feelsLike_f: `Feels like ${weatherApiObject.current.feelslike_f}${'\u00b0'}`,
      feelsLike_c: `Feels like ${weatherApiObject.current.feelslike_c}${'\u00b0'}`,
      wind_mph: selectedForecastDay === 0
        ? `${weatherApiObject.current.wind_mph}mph`
        : `${forecast.day.maxwind_mph}mph`,
      wind_kph: selectedForecastDay === 0
      ? `${weatherApiObject.current.wind_kph}kph`
      : `${forecast.day.maxwind_kph}kph`,
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
        <h4>{weatherApiObject.location.name}, {weatherApiObject.location.region}</h4>
        <h4>{weatherApiObject.location.country}</h4>
        <React.Fragment>
          <CurrentConditions
            weatherConditionsByDay={weatherConditionsByDay} selectedForecastDay={selectedForecastDay}
            isCelsiusSelected={isCelsiusSelected}/>
          <ConditionsDetails
            weatherConditionsByDay={weatherConditionsByDay}
            rainLikely={rainLikely}
            snowLikely={snowLikely}
            isCelsiusSelected={isCelsiusSelected}/>
          <SunriseSunset
            weatherConditionsByDay={weatherConditionsByDay} selectedForecastDay={selectedForecastDay}/>
        </React.Fragment>
      </div>
    </React.Fragment>
  )
}

ConditionsOverview.propTypes = {
  weatherApiObject: PropTypes.object,
  selectedForecastDay: PropTypes.number,
  isCelsiusSelected: PropTypes.bool
}

export default ConditionsOverview;