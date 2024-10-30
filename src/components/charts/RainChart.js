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

function RainChart(props) {
  const { detailedForecast, isCelsiusSelected } = props;

  return (
    <React.Fragment>
      {isCelsiusSelected ?
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={detailedForecast}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="time"/>
          <YAxis yAxisId="left" domain={[0, 'auto']}/>
          <Tooltip/>
          <Legend/>
          <Line type="monotone" yAxisId="left" dataKey="precip_mm" name="Rain" stroke="#0d6efd" activeDot={{ r: 6 }}/>
          </LineChart>
        </ResponsiveContainer>
        :
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={detailedForecast}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="time"/>
          <YAxis yAxisId="left" domain={[0, 'auto']}/>
          <Tooltip/>
          <Legend/>
          <Line type="monotone" yAxisId="left" dataKey="precip_in" name="Rain" stroke="#0d6efd" activeDot={{ r: 6 }}/>
          </LineChart>
        </ResponsiveContainer>
      }
    </React.Fragment>
  )
}

RainChart.propTypes = {
  detailedForecast: PropTypes.array,
  isCelsiusSelected: PropTypes.bool
}

export default RainChart;