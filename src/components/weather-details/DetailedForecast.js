import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import IconButton from '@mui/material/IconButton';
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

// consider adding chart for rain/snow if it is expected in the forecast

function DetailedForecast(props) {
  const { weatherApiObject,
    locationLocalTime,
    onRoundingTimeToHour,
    onConvertingTimeFormats,
    onDisplayingUpdated24HrForecast,
    selectedForecastDay } = props;
  const [detailedForecast, setDetailedForecast] = useState([]);
  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    const merged3DayForecastArray = weatherApiObject.forecast.forecastday.flatMap(day => day.hour);

    const roundedLocalTime = onRoundingTimeToHour(locationLocalTime);

    const formattedForecastTimes = onConvertingTimeFormats(merged3DayForecastArray);

    const todaysTwentyFourHourForecast = onDisplayingUpdated24HrForecast(formattedForecastTimes, roundedLocalTime);

    let futureDaysTwentyFourHourForecast = null;

    switch (selectedForecastDay) {
      case 1:
        futureDaysTwentyFourHourForecast = formattedForecastTimes.slice(24, 48);
        setDetailedForecast(futureDaysTwentyFourHourForecast);
        break;
      case 2:
        futureDaysTwentyFourHourForecast = formattedForecastTimes.slice(48, 72);
        setDetailedForecast(futureDaysTwentyFourHourForecast);
        break;
      default:
        setDetailedForecast(todaysTwentyFourHourForecast);
    }
    setActiveIcon(1);
  }, [weatherApiObject, locationLocalTime, selectedForecastDay]);

  const handleSettingActiveIcon = (icon) => {
    setActiveIcon(icon);
  }

  console.log("Detailed forecast: ", detailedForecast);

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