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

// when adding graph, consider adding separate lines for temp, humidity, wind, rain, and snow

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
      <br/>
      <div className='weather-forecast'>
        <div className='location-weather-forecast'>
          <h4>Hourly Forecast</h4>
        </div>
        <br/>
        <div className="detailed-forecast">
          {/* <ResponsiveContainer> */}
            <LineChart width={600} height={300} data={detailedForecast}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="time"/>
              <YAxis domain={[-150, 150]}/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" dataKey="temp_f" stroke="#8884d8" activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="humidity" stroke="#82ca9d" activeDot={{ r: 6 }}/>
              <Line type="monotone" dataKey="wind_mph" stroke="#000000" activeDot={{ r: 6 }}/>
            </LineChart>
          {/* </ResponsiveContainer> */}

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