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

function SnowChart(props) {
  const { detailedForecast } = props;

  console.log(detailedForecast);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={detailedForecast}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="time"/>
      <YAxis yAxisId="left" domain={[0, 'auto']}/>
      <Tooltip/>
      <Legend/>
      <Line type="monotone" yAxisId="left" dataKey="snow_in" name="Snow" stroke="#0d6efd" activeDot={{ r: 6 }}/>
      </LineChart>
    </ResponsiveContainer>
  )
}

SnowChart.propTypes = {
  detailedForecast: PropTypes.array,
  onConvertingCentimetersToInches: PropTypes.func
}

export default SnowChart;