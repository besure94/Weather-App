import React, { useState, useEffect } from 'react';
import SearchForm from '../main/SearchForm';
import { getWeather } from '../api-call/weather-api-call';
import { convertDateFormat, changeDateToWeekday } from '../utility-fns/convert-date-format';
import ConditionsOverview from './ConditionsOverview';
import DetailedForecast from './DetailedForecast';
import ThreeDayForecast from './ThreeDayForecast';
import { Switch, FormGroup, FormControlLabel } from '@mui/material';

function WeatherControl() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherApiObject, setCurrentWeather] = useState([]);
  const [city, setCity] = useState("");
  const [locationLocalTime, setLocationLocalTime] = useState(null);
  const [selectedForecastDay, setSelectedForecastDay] = useState(0);
  const [isCelsiusSelected, setIsCelsiusSelected] = useState(false);

  useEffect(() => {
    async function getWeatherApiData() {
      setError(null);
      try {
        const response = await getWeather(city);
        const formattedDate = convertDateFormat(response.location.localtime);
        setCurrentWeather(response);
        setLocationLocalTime(formattedDate);
        setIsLoaded(true);
        setSelectedForecastDay(0);
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

  const handleCelsiusSwitchClick = () => {
    setIsCelsiusSelected(!isCelsiusSelected);
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
    let slicedArray = forecastArray.slice(firstMatchingIndex, firstMatchingIndex + 24);
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

  const handleSelectingForecastDay = (date) => {
    setSelectedForecastDay(date);
  }

  return (
    <div>
      <br/>
      <SearchForm onFormSubmission={handleFormSubmission}/>

      {error &&
        <React.Fragment>
          <br/>
          <div className='error'>
            <h2>Error: {error}</h2>
          </div>
        </React.Fragment>
      }

      {isLoaded && (
        <React.Fragment>
          <hr/>
          <div className='location-container'>
            <div className="location">
              <FormGroup>
                <FormControlLabel
                  onClick={handleCelsiusSwitchClick}
                  control={<Switch/>}
                  label={
                    <span style={{
                      fontSize: "1.2rem",
                      fontWeight: '600'}}>
                      {`\u00b0C`}
                    </span>
                  }
                />
              </FormGroup>
              <h4>{weatherApiObject.location.name}, {weatherApiObject.location.region}</h4>
              <h4>{weatherApiObject.location.country}</h4>
              <div className='current-weather-for-location'>
                <ConditionsOverview
                  weatherApiObject={weatherApiObject}
                  selectedForecastDay={selectedForecastDay}
                  isCelsiusSelected={isCelsiusSelected}/>
              </div>
            </div>
          </div>
          <br/>
          <div className='weather-components-container'>
            <div className='three-day-forecast'>
              <ThreeDayForecast
                weatherApiObject={weatherApiObject}
                onChanging3DayDateFormats={changeDateFormatsToWeekday}
                onChangingFirstDayToSayToday={changeFirstDayToSayToday}
                onSelectingForecastDay={handleSelectingForecastDay}
                selectedForecastDay={selectedForecastDay}
                isCelsiusSelected={isCelsiusSelected}/>
            </div>
            <DetailedForecast
              weatherApiObject={weatherApiObject}
              locationLocalTime={locationLocalTime}
              onRoundingTimeToHour={roundLocalTimeToHour}
              onConvertingTimeFormats={convertForecastTimeFormats}
              onDisplayingUpdated24HrForecast={displayUpdated24HourForecast}
              selectedForecastDay={selectedForecastDay}
              isCelsiusSelected={isCelsiusSelected}/>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default WeatherControl;