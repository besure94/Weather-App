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
  const { detailedForecast, isCelsiusSelected } = props;

  return (
    <React.Fragment>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={detailedForecast}>
        {/* <CartesianGrid strokeDasharray="3 3"/> */}
        <XAxis dataKey="time" padding={{ left: 15, right: 15 }}/>
        <YAxis
          yAxisId="left"
          domain={[0, 'auto']}
          label={{
            value: isCelsiusSelected ? 'Kilometers per hour' : 'Miles per hour',
            position: 'outsideLeft',
            fontSize: "115%",
            dx: -20,
            angle: -90
          }}
          tick={{ dx: -5 }}
        />
        <Tooltip/>
        <Legend/>
        <Line
          type="monotone"
          yAxisId="left"
          dataKey={isCelsiusSelected ? "wind_kph" : "wind_mph"}
          name="Wind"
          stroke="#198754"
          activeDot={{ r: 6 }}
        />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}

WindChart.propTypes = {
  detailedForecast: PropTypes.array,
  isCelsiusSelected: PropTypes.bool
}

export default WindChart;