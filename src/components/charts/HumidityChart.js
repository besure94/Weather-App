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

function HumidityChart(props) {
  const { detailedForecast } = props;

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={detailedForecast}>
      {/* <CartesianGrid strokeDasharray="3 3"/> */}
      <XAxis dataKey="time" padding={{ left: 15, right: 15 }}/>
      <YAxis
        yAxisId="left"
        domain={[0, 100]}
        label={{
          value: 'Percentage',
          position: 'outsideLeft',
          fontSize: "115%",
          dx: -20,
          angle: -90,
        }}
        tick={{ dx: -2.5 }}
      />
      <Tooltip/>
      <Legend/>
      <Line
        type="monotone"
        yAxisId="left"
        dataKey="humidity"
        name="Humidity"
        stroke="#0d6efd"
        activeDot={{ r: 6 }}
      />
      </LineChart>
    </ResponsiveContainer>
  )
}

HumidityChart.propTypes = {
  detailedForecast: PropTypes.array
}

export default HumidityChart;