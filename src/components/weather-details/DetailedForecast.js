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

// currently seeing a bug where the chart sometimes doesn't render right for SnowChart

// should upgrade Tooltip to be more detailed and include stuff like %, mph, F, etc
function DetailedForecast(props) {
  const { weatherApiObject,
    locationLocalTime,
    onRoundingTimeToHour,
    onConvertingTimeFormats,
    onDisplayingUpdated24HrForecast,
    selectedForecastDay } = props;
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
        futureDaysTwentyFourHourForecast = convertCentimetersToInches(formattedForecastTimes.slice(24, 48));
        setDetailedForecast(futureDaysTwentyFourHourForecast);
        break;
      case 2:
        futureDaysTwentyFourHourForecast = convertCentimetersToInches(formattedForecastTimes.slice(48, 72));
        setDetailedForecast(futureDaysTwentyFourHourForecast);
        break;
      default:
        setDetailedForecast(convertCentimetersToInches(todaysTwentyFourHourForecast));
    }

    setActiveIcon(1);
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

  const convertCentimetersToInches = (forecastArray) => {
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
          <IconButton color="warning" onClick={() => handleSettingActiveIcon(1)} className={activeIcon === 1 ? 'icon-active' : ''}>
            <DeviceThermostatIcon fontSize="large"/>
          </IconButton>
          <IconButton color="primary" onClick={() => handleSettingActiveIcon(2)} className={activeIcon === 2 ? 'icon-active' : ''}>
            <WaterIcon fontSize="large"/>
          </IconButton>
          <IconButton color="success" onClick={() => handleSettingActiveIcon(3)} className={activeIcon === 3 ? 'icon-active' : ''}>
            <AirIcon fontSize='large'/>
          </IconButton>
          {rainLikely && (
            <IconButton color="primary" onClick={() =>
              handleSettingActiveIcon(4)} className={activeIcon === 4 ? 'icon-active' : ''}>
              <WaterDrop fontSize="large"/>
            </IconButton>
          )}
          {snowLikely && (
            <IconButton color="primary" onClick={() =>
              handleSettingActiveIcon(5)} className={activeIcon === 5 ? 'icon-active' : ''}>
              <AcUnitIcon fontSize="large"/>
            </IconButton>
          )}
        </div>
        <br/>
        <div className="detailed-forecast">
          {activeIcon === 1 && (
            <TempChart detailedForecast={detailedForecast}/>
          )}
          {activeIcon === 2 && (
            <HumidityChart detailedForecast={detailedForecast}/>
          )}
          {activeIcon === 3 && (
            <WindChart detailedForecast={detailedForecast}/>
          )}
          {activeIcon === 4 && (
            <RainChart detailedForecast={detailedForecast}/>
          )}
          {activeIcon === 5 && (
            <SnowChart detailedForecast={detailedForecast}/>
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
  selectedForecastDay: PropTypes.number
}

export default DetailedForecast;