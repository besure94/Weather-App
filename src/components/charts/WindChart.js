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

function WindChart(props) {
  const { detailedForecast } = props;

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={detailedForecast}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="time"/>
      <YAxis yAxisId="left" domain={[0, 'auto']}/>
      <Tooltip/>
      <Legend/>
      <Line type="monotone" yAxisId="left" dataKey="wind_mph" name="Wind" stroke="#198754" activeDot={{ r: 6 }}/>
      </LineChart>
    </ResponsiveContainer>
  )
}

WindChart.propTypes = {
  detailedForecast: PropTypes.array
}

export default WindChart;