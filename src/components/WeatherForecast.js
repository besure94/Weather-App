import React, { useState, useEffect } from 'react';

function WeatherForecast() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState([]);

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json();
        }
      })
      .then((jsonifiedResponse) => {
        setWeatherForecast(jsonifiedResponse.list)
        setIsLoaded(true)
      })
      .catch((error) => {
        setError(error)
        setIsLoaded(true)
      });
  }, [])

  if (error) {
    return <h1>Error: {error}</h1>;
  } else if (!isLoaded) {
    return <h1>...Loading Weather...</h1>;
  } else {
    return (
      <React.Fragment>
        <h1>Weather Forecast</h1>
        <ul>
          {weatherForecast.map((forecast, index) =>
            <li key={index}>
              <h3>{forecast.list}</h3>
            </li>
          )}
        </ul>
      </React.Fragment>
    )
  }
}

export default WeatherForecast;