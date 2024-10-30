import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function TempChart(props) {
  const { detailedForecast, isCelsiusSelected } = props;

  return (
    <React.Fragment>
      {isCelsiusSelected ?
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={detailedForecast}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="time"/>
          <YAxis yAxisId="left" domain={['auto', 'auto']}/>
          <Tooltip/>
          <Legend/>
          <Line type="monotone" yAxisId="left" dataKey="temp_c" name="Temperature" stroke="#FF6384" activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
        :
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={detailedForecast}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="time"/>
          <YAxis yAxisId="left" domain={['auto', 'auto']}/>
          <Tooltip/>
          <Legend/>
          <Line type="monotone" yAxisId="left" dataKey="temp_f" name="Temperature" stroke="#FF6384" activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      }
    </React.Fragment>
  )
}

TempChart.propTypes = {
  detailedForecast: PropTypes.array,
  isCelsiusSelected: PropTypes.bool
}

export default TempChart;