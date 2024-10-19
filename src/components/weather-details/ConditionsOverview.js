import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDrop from '@mui/icons-material/WaterDrop';

// app is incorrectly rendering rain/snow icons
// should only render rain/snow icons if chance of respective one is at or above 20%
function ConditionsOverview(props) {
  const { weatherApiObject, selectedForecastDay } = props;
  const [displayedWeatherByDay, setDisplayedWeatherByDay] = useState({});
  const [rainLikely, setRainLikely] = useState(null);
  const [snowLikely, setSnowLikely] = useState(null);
  console.log("API response: ", weatherApiObject);
  console.log("3 day forecast: ", weatherApiObject.forecast.forecastday);

  useEffect(() => {
    const forecast = weatherApiObject.forecast.forecastday[selectedForecastDay];
    if (selectedForecastDay === 0) {
      const todaysCurrentWeather = {
        ...{},
        icon: weatherApiObject.current.condition.icon,
        temperature: `${weatherApiObject.current.temp_f}${'\u00b0'}F`,
        condition: weatherApiObject.current.condition.text,
        feelsLike: weatherApiObject.current.feelslike_f,
        wind: `${weatherApiObject.current.wind_mph}mph`,
        humidity: `${weatherApiObject.current.humidity}%`
      }
      console.log("Todays weather: ", todaysCurrentWeather);

      if (forecast.day.daily_chance_of_rain >= 20) {
        todaysCurrentWeather.chanceOfRain = `${forecast.day.daily_chance_of_rain}%`;
        setRainLikely(20);
      }

      if (forecast.day.daily_chance_of_snow >= 20) {
        todaysCurrentWeather.chanceOfSnow = `${forecast.day.daily_chance_of_snow}%`;
        setSnowLikely(20);
      }

      setDisplayedWeatherByDay(todaysCurrentWeather);
    } else {
      const futureDaysWeather = {
        ...{},
        icon: forecast.day.condition.icon,
        high: `${forecast.day.maxtemp_f}${'\u00b0'}`,
        low: `${forecast.day.mintemp_f}${'\u00b0'}`,
        condition: forecast.day.condition.text,
        wind: `${forecast.day.maxwind_mph}mph`,
        humidity: `${forecast.day.avghumidity}%`
      }
      console.log("Future weather: ", futureDaysWeather);

      if (forecast.day.daily_chance_of_rain >= 20) {
        futureDaysWeather.chanceOfRain = `${forecast.day.daily_chance_of_rain}%`;
        setRainLikely(20);
      }

      if (forecast.day.daily_chance_of_snow >= 20) {
        futureDaysWeather.chanceOfSnow = `${forecast.day.daily_chance_of_snow}%`;
        setSnowLikely(20);
      }

      setDisplayedWeatherByDay(futureDaysWeather);
    }
  }, [weatherApiObject, selectedForecastDay]);

  console.log("Rain likely: ", rainLikely);
  console.log("Snow likely: ", snowLikely);

  return (
    <React.Fragment>
      <div className='temp-and-conditions'>
        <h3>{weatherApiObject.location.name}, {weatherApiObject.location.region}, {weatherApiObject.location.country}</h3>
        {selectedForecastDay === 0 && (
          <React.Fragment>
            <div className="icon-and-temp">
              <img className="current-weather-icon" src={displayedWeatherByDay.icon} alt="An icon showing current weather conditions."/>
              <h2>{displayedWeatherByDay.temperature}</h2>
            </div>
            <h3>{displayedWeatherByDay.condition}</h3>
            <div className="humidity-and-wind">
              <h5><WaterIcon fontSize="large"/> {displayedWeatherByDay.humidity}</h5>
              <h5><AirIcon fontSize='large'/> {displayedWeatherByDay.wind}</h5>
            </div>
            <div className="precipitation-chance">
              {rainLikely >= 20 && (
                <h5><WaterDrop fontSize="large"/> {displayedWeatherByDay.chanceOfRain}</h5>
              )}
              {snowLikely >= 20 && (
                <h5><AcUnitIcon fontSize="large"/> {displayedWeatherByDay.chanceOfSnow}</h5>
              )}
            </div>
          </React.Fragment>
        )}

        {selectedForecastDay !== 0 && (
          <React.Fragment>
            <div className="icon-and-temp">
              <img className="current-weather-icon" src={displayedWeatherByDay.icon} alt="An icon showing current weather conditions."/>
              <h2>{displayedWeatherByDay.high}/{displayedWeatherByDay.low}</h2>
            </div>
            <h3>{displayedWeatherByDay.condition}</h3>
            <div className="humidity-and-wind">
              <h5><WaterIcon fontSize="large"/> {displayedWeatherByDay.humidity}</h5>
              <h5><AirIcon fontSize="large"/> {displayedWeatherByDay.wind}</h5>
            </div>
            <div className="precipitation-chance">
              {rainLikely >= 20 && (
                <h5><WaterDrop fontSize="large"/> {displayedWeatherByDay.chanceOfRain}</h5>
              )}
              {snowLikely >= 20 && (
                <h5><AcUnitIcon fontSize="large"/> {displayedWeatherByDay.chanceOfSnow}</h5>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

ConditionsOverview.propTypes = {
  weatherApiObject: PropTypes.object,
  selectedForecastDay: PropTypes.number
}

export default ConditionsOverview;