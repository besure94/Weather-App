import React, { useState, useEffect } from 'react';
import SearchForm from '../main/SearchForm';
import { getWeather } from '../api-call/weather-api-call';
import { convertDateFormat, changeDateToWeekday } from '../utility-fns/convert-date-format';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import ThreeDayForecast from './ThreeDayForecast';
import CurrentWeatherDetails from './CurrentWeatherDetails';

function Weather() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherApiObject, setCurrentWeather] = useState([]);
  const [city, setCity] = useState("");
  const [locationLocalTime, setLocationLocalTime] = useState(null);

  useEffect(() => {
    async function getWeatherApiData() {
      setError(null);
      try {
        const response = await getWeather(city);
        const formattedDate = convertDateFormat(response.location.localtime);
        setCurrentWeather(response);
        setLocationLocalTime(formattedDate);
        setIsLoaded(true);
      } catch (error) {
        setError(error.message);
        setIsLoaded(false);
      }
    }

    if (city) {
      getWeatherApiData(city);
    }
  }, [city]);

  const handleFormSubmission = (formInput) => {
    const { city } = formInput;
    setCity(city);
  }

  const roundLocalTimeToHour = (localTime) => {
    let meridiem = localTime.slice(-2);
    let hours = parseInt(localTime.slice(0, -4));

    if (hours === 12 && meridiem === 'am') {
      hours = 12;
    } else if (hours === 12 && meridiem === 'pm') {
      hours = 12;
    } else if (hours === 13) {
      hours = 1;
    } else if (hours === 0) {
      hours = 12;
    }

    return `${hours}:00${meridiem}`;
  }

  const convertForecastTimeFormats = (forecastArray) => {
    return forecastArray.map(index => {
      return {
        ...index,
        time: convertDateFormat(index.time)
      };
    });
  };

  const displayUpdated24HourForecast = (forecastArray, timeToMatch) => {
    let firstMatchingIndex = forecastArray.findIndex(index => index.time === timeToMatch);
    let slicedArray = forecastArray.slice(firstMatchingIndex, firstMatchingIndex + 25);
    slicedArray[0].time = "Now";
    return slicedArray;
  }

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
    <div>
      <br/>
      <SearchForm onFormSubmission={handleFormSubmission}/>
      {error && <h2>Error: {error}</h2>}
      {isLoaded && (
        <React.Fragment>
          <div className='weather-components-container'>
            <div className='current-weather-for-location'>
              <CurrentWeather
                weatherApiObject={weatherApiObject}/>
            </div>
            <div className='three-day-forecast'>
              <ThreeDayForecast
                weatherApiObject={weatherApiObject}
                onChanging3DayDateFormats={changeDateFormatsToWeekday}
                onChangingFirstDayToSayToday={changeFirstDayToSayToday}/>
            </div>
            {/* <CurrentWeatherDetails
              weatherApiObject={weatherApiObject}/> */}
          </div>
          <HourlyForecast
            weatherApiObject={weatherApiObject}
            locationLocalTime={locationLocalTime}
            onRoundingTimeToHour={roundLocalTimeToHour}
            onConvertingTimeFormats={convertForecastTimeFormats}
            onDisplayingUpdated24HrForecast={displayUpdated24HourForecast}/>
        </React.Fragment>
      )}
    </div>
  )
}

export default Weather;