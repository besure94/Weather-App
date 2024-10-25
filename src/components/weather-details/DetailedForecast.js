import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import IconButton from '@mui/material/IconButton';
import WaterDrop from '@mui/icons-material/WaterDrop';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

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
          <IconButton color="warning" onClick={() => handleSettingActiveIcon(1)}>
            <DeviceThermostatIcon fontSize="large"/>
          </IconButton>
          <IconButton color="primary" onClick={() => handleSettingActiveIcon(2)}>
            <WaterIcon fontSize="large"/>
          </IconButton>
          <IconButton color="success" onClick={() => handleSettingActiveIcon(3)}>
            <AirIcon fontSize='large'/>
          </IconButton>
          {rainLikely && (
            <IconButton color="primary" onClick={() =>
              handleSettingActiveIcon(4)}>
              <WaterDrop fontSize="large"/>
            </IconButton>
          )}
          {snowLikely && (
            <IconButton color="primary" onClick={() =>
              handleSettingActiveIcon(5)}>
              <AcUnitIcon fontSize="large"/>
            </IconButton>
          )}
        </div>
        <br/>
        <div className="detailed-forecast">
          <ResponsiveContainer width="65%" height={250}>
            {activeIcon === 1 && (
              <LineChart data={detailedForecast}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="time"/>
              <YAxis yAxisId="left" domain={['auto', 'auto']}/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" yAxisId="left" dataKey="temp_f" name="Temperature" stroke="#FF6384" activeDot={{ r: 6 }} />
              </LineChart>
            )}
            {activeIcon === 2 && (
              <LineChart data={detailedForecast}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="time"/>
              <YAxis yAxisId="left" domain={[0, 'auto']}/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" yAxisId="left" dataKey="humidity" name="Humidity" stroke="#0d6efd" activeDot={{ r: 6 }}/>
              </LineChart>
            )}
            {activeIcon === 3 && (
              <LineChart data={detailedForecast}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="time"/>
              <YAxis yAxisId="left" domain={[0, 'auto']}/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" yAxisId="left" dataKey="wind_mph" name="Wind" stroke="#198754" activeDot={{ r: 6 }}/>
              </LineChart>
            )}
            {activeIcon === 4 && (
              <LineChart data={detailedForecast}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="time"/>
              <YAxis yAxisId="left" domain={[0, 'auto']}/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" yAxisId="left" dataKey="precip_in" name="Rain" stroke="#0d6efd" activeDot={{ r: 6 }}/>
              </LineChart>
            )}
            {activeIcon === 5 && (
              <LineChart data={detailedForecast}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="time"/>
              <YAxis yAxisId="left" domain={[0, 'auto']}/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" yAxisId="left" dataKey="snow_in" name="Snow" stroke="#0d6efd" activeDot={{ r: 6 }}/>
              </LineChart>
            )}
          </ResponsiveContainer>
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