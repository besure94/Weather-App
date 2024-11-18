import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import IconButton from '@mui/material/IconButton';
import WaterDrop from '@mui/icons-material/WaterDrop';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TempChart from '../charts/TempChart';
import WindChart from "../charts/WindChart";
import HumidityChart from "../charts/HumidityChart";
import RainChart from "../charts/RainChart";
import SnowChart from "../charts/SnowChart";

// should upgrade Tooltip to be more detailed and include stuff like %, mph, F, etc

function DetailedForecast(props) {
  const { weatherApiObject,
    locationLocalTime,
    onRoundingTimeToHour,
    onConvertingTimeFormats,
    onDisplayingUpdated24HrForecast,
    selectedForecastDay,
    isCelsiusSelected } = props;
  const [detailedForecast, setDetailedForecast] = useState([]);
  const [activeIcon, setActiveIcon] = useState(null);
  const [rainLikely, setRainLikely] = useState(false);
  const [snowLikely, setSnowLikely] = useState(false);

  useEffect(() => {
    const merged3DayForecastArray = weatherApiObject.forecast.forecastday.flatMap(day => day.hour);

    const roundedLocalTime = onRoundingTimeToHour(locationLocalTime);

    const formattedForecastTimes = onConvertingTimeFormats(merged3DayForecastArray);

    const todaysTwentyFourHourForecast = onDisplayingUpdated24HrForecast(formattedForecastTimes, roundedLocalTime);

    let futureDaysTwentyFourHourForecast = null;

    switch (selectedForecastDay) {
      case 1:
        futureDaysTwentyFourHourForecast = convertSnowCentimetersToInches(formattedForecastTimes.slice(24, 48));
        setDetailedForecast(futureDaysTwentyFourHourForecast);
        break;
      case 2:
        futureDaysTwentyFourHourForecast = convertSnowCentimetersToInches(formattedForecastTimes.slice(48, 72));
        setDetailedForecast(futureDaysTwentyFourHourForecast);
        break;
      default:
        setDetailedForecast(convertSnowCentimetersToInches(todaysTwentyFourHourForecast));
    }

    setActiveIcon('temperature');
    const forecast = weatherApiObject.forecast.forecastday[selectedForecastDay];

    if (forecast.day.daily_chance_of_rain.toString().replace(/[^0-9]/g, '') >= 10) {
      setRainLikely(true);
    } else {
      setRainLikely(false);
    }

    if (forecast.day.daily_chance_of_snow.toString().replace(/[^0-9]/g, '') >= 10) {
      setSnowLikely(true);
    } else {
      setSnowLikely(false);
    }

  }, [weatherApiObject, locationLocalTime, selectedForecastDay]);

  const handleSettingActiveIcon = (icon) => {
    setActiveIcon(icon);
  }

  const convertSnowCentimetersToInches = (forecastArray) => {
    return forecastArray.map(index => {
      return {
        ...index,
        snow_in: (index.snow_cm / 2.54).toFixed(2)
      };
    });
  };

  return (
    <React.Fragment>
      <br/>
      <div className='weather-forecast'>
        <div className="graph-icons">
          <IconButton color="warning" onClick={() => handleSettingActiveIcon('temperature')} className={activeIcon === 'temperature' ? 'icon-active' : ''}>
            <DeviceThermostatIcon fontSize="large"/>
          </IconButton>

          <IconButton color="primary" onClick={() => handleSettingActiveIcon('humidity')} className={activeIcon === 'humidity' ? 'icon-active' : ''}>
            <WaterIcon fontSize="large"/>
          </IconButton>

          <IconButton color="success" onClick={() => handleSettingActiveIcon('wind')} className={activeIcon === 'wind' ? 'icon-active' : ''}>
            <AirIcon fontSize='large'/>
          </IconButton>

          {rainLikely && (
            <IconButton color="primary" onClick={() =>
              handleSettingActiveIcon('rain')} className={activeIcon === 'rain' ? 'icon-active' : ''}>
              <WaterDrop fontSize="large"/>
            </IconButton>
          )}

          {snowLikely && (
            <IconButton color="primary" onClick={() =>
              handleSettingActiveIcon('snow')} className={activeIcon === 'snow' ? 'icon-active' : ''}>
              <AcUnitIcon fontSize="large"/>
            </IconButton>
          )}
        </div>
        {/* <br/> */}
        <div className="detailed-forecast">
          {activeIcon === 'temperature' && (
            <TempChart
              detailedForecast={detailedForecast} isCelsiusSelected={isCelsiusSelected}/>
          )}

          {activeIcon === 'humidity' && (
            <HumidityChart detailedForecast={detailedForecast}/>
          )}

          {activeIcon === 'wind' && (
            <WindChart
              detailedForecast={detailedForecast}
              isCelsiusSelected={isCelsiusSelected}/>
          )}

          {activeIcon === 'rain' && (
            <RainChart
              detailedForecast={detailedForecast}
              isCelsiusSelected={isCelsiusSelected}/>
          )}

          {activeIcon === 'snow' && (
            <SnowChart
              detailedForecast={detailedForecast}
              isCelsiusSelected={isCelsiusSelected}/>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

DetailedForecast.propTypes = {
  weatherApiObject: PropTypes.object,
  onRoundingTimeToHour: PropTypes.func,
  onConvertingTimeFormats: PropTypes.func,
  onDisplayingUpdated24HrForecast: PropTypes.func,
  selectedForecastDay: PropTypes.number,
  isCelsiusSelected: PropTypes.bool
}

export default DetailedForecast;