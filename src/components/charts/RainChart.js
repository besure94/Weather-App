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
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={detailedForecast}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="time"/>
        {isCelsiusSelected ?
          <YAxis
            yAxisId="left"
            domain={[0, 'auto']}
            label={{ value: 'Millimeters', position: 'center', fontSize: "110%", angle: -90 }}/>
          :
          <YAxis
            yAxisId="left"
            domain={[0, 'auto']}
            label={{ value: 'Inches', position: 'center', fontSize: "110%", angle: -90 }}/>
        }
        <Tooltip/>
        <Legend/>
        {isCelsiusSelected ?
          <Line type="monotone" yAxisId="left" dataKey="precip_mm" name="Rain" stroke="#0d6efd" activeDot={{ r: 6 }}/>
          :
          <Line type="monotone" yAxisId="left" dataKey="precip_in" name="Rain" stroke="#0d6efd" activeDot={{ r: 6 }}/>
        }
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}

RainChart.propTypes = {
  detailedForecast: PropTypes.array,
  isCelsiusSelected: PropTypes.bool
}

export default RainChart;