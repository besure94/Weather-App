import React from "react";
import PropTypes from "prop-types";

function DisplayedWeatherData(props) {
  const { weatherDataToDisplay, localTime } = props;

  return (
    <React.Fragment>
      <h4>{weatherDataToDisplay.location.name}, {weatherDataToDisplay.location.region}, {weatherDataToDisplay.location.country}</h4>
      <br/>
      <div className='current-weather'>
        <div className='location-weather'>
          <div className='current-conditions'>
            <div className='temp-and-conditions'>
              <h5 className='now-header'>Now</h5>
              <h3>{weatherDataToDisplay.current.temp_f}{'\u00b0'}F</h3>
              {/* <h4>{currentWeather.current.condition.text}</h4> */}
            </div>
            <div className='weather-icon'>
              {/* <img src={currentWeather.current.condition.icon}/> */}
              <img src={weatherDataToDisplay.forecast.forecastday[0].day.condition.icon} alt="An icon showing the weather forecast."/>
            </div>
          </div>
          <div className='high-and-low'>
            <h5>High: {weatherDataToDisplay.forecast.forecastday[0].day.maxtemp_f}</h5>
            <h5>Low: {weatherDataToDisplay.forecast.forecastday[0].day.mintemp_f}</h5>
          </div>
          <h5>Local Time: {localTime}</h5>
          <br/>
          <br/>
          <div className='current-weather-details'>
            <div className='details'>
              <h5>Feels Like</h5>
              <p>{weatherDataToDisplay.current.feelslike_f}{'\u00b0'}F</p>
            </div>
            <div className='details'>
              <h5>Humidity</h5>
              <p>{weatherDataToDisplay.current.humidity}%</p>
            </div>
            <div className='details'>
              <h5>Wind</h5>
              <p>{weatherDataToDisplay.current.wind_mph}mph</p>
            </div>
          </div>
          <div className='current-weather-details'>
            <div className='details'>
              <h5>Rain</h5>
              <p>{weatherDataToDisplay.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
            </div>
            <div className='details'>
              <h5>Snow</h5>
              <p>{weatherDataToDisplay.forecast.forecastday[0].day.daily_chance_of_snow}%</p>
            </div>
            <div className='details'>
              <h5>Air Quality</h5>
              <p>{weatherDataToDisplay.current.air_quality["us-epa-index"]}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

DisplayedWeatherData.propTypes = {
  weatherDataToDisplay: PropTypes.object
}

export default DisplayedWeatherData;