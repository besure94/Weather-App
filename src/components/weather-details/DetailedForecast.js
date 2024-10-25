import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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

// lines will be used to represent temp, humidity, wind, and possibly rain/snow if it is likely

// this will be managed by clicking buttons for temp, humidity, and wind

// these will be represented by icons: temp = thermometer, humidity uses same water icon as above, and same with wind

function DetailedForecast(props) {
  const { weatherApiObject,
    locationLocalTime,
    onRoundingTimeToHour,
    onConvertingTimeFormats,
    onDisplayingUpdated24HrForecast,
    selectedForecastDay } = props;
  const [detailedForecast, setDetailedForecast] = useState([]);

  useEffect(() => {
    const merged3DayForecastArray = weatherApiObject.forecast.forecastday.flatMap(day => day.hour);

    const roundedLocalTime = onRoundingTimeToHour(locationLocalTime);

    const formattedForecastTimes = onConvertingTimeFormats(merged3DayForecastArray);

    const todaysTwentyFourHourForecast = onDisplayingUpdated24HrForecast(formattedForecastTimes, roundedLocalTime);

    const showForecastInThreeHourSteps = filterForecastInThreeHourSteps(todaysTwentyFourHourForecast);

    let futureDaysTwentyFourHourForecast = null;
    let futureDaysForecastInThreeHourSteps = null;

    switch (selectedForecastDay) {
      case 1:
        futureDaysTwentyFourHourForecast = formattedForecastTimes.slice(24, 48);

        futureDaysForecastInThreeHourSteps = filterForecastInThreeHourSteps(futureDaysTwentyFourHourForecast);

        setDetailedForecast(futureDaysForecastInThreeHourSteps);
        break;
      case 2:
        futureDaysTwentyFourHourForecast = formattedForecastTimes.slice(48, 72);

        futureDaysForecastInThreeHourSteps = filterForecastInThreeHourSteps(futureDaysTwentyFourHourForecast);

        setDetailedForecast(futureDaysForecastInThreeHourSteps);
        break;
      default:
        setDetailedForecast(showForecastInThreeHourSteps);
    }

  }, [weatherApiObject, locationLocalTime, selectedForecastDay]);

  const filterForecastInThreeHourSteps = (hourlyForecast) => {
    const newForecastArray = hourlyForecast.filter((_hour, index) => index % 1 === 0);
    return newForecastArray;
  }

  console.log("Detailed forecast: ", detailedForecast);
  return (
    <React.Fragment>
      <br/>
      <div className='weather-forecast'>
        <div className='location-weather-forecast'>
          <h4>Hourly Forecast</h4>
        </div>
        <br/>
        <div className="detailed-forecast">
          <ResponsiveContainer width="65%" height={250}>
            <LineChart data={detailedForecast}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="time"/>
              <YAxis yAxisId="left" domain={['auto', 'auto']}/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" yAxisId="left" dataKey="temp_f" name="Temperature" stroke="#FF6384" activeDot={{ r: 6 }} />
            </LineChart>
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