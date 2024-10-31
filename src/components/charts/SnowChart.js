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

// look into formatting ticks to be a max of 1 or 2 decimal places

function SnowChart(props) {
  const { detailedForecast, isCelsiusSelected  } = props;

  return (
    <React.Fragment>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={detailedForecast}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="time"/>
        {/* <YAxis yAxisId="left" domain={[0, 'auto']}/> */}
        {isCelsiusSelected ?
          <YAxis
            yAxisId="left"
            domain={[0, 'auto']}
            label={{
              value: 'Centimeters',
              position: 'outsideLeft',
              fontSize: "115%",
              dx: -30,
              angle: -90
            }}
            tick={{ dx: -2.5 }}
          />
          :
          <YAxis
            yAxisId="left"
            domain={[0, 'auto']}
            label={{
              value: 'Inches',
              position: 'outsideLeft',
              fontSize: "115%",
              dx: -30,
              angle: -90
            }}
            tick={{ dx: -2.5 }}
          />
        }
        <Tooltip/>
        <Legend/>
        {isCelsiusSelected ?
          <Line
            type="monotone"
            yAxisId="left"
            dataKey="snow_cm"
            name="Snow"
            stroke="#0d6efd"
            activeDot={{ r: 6 }}
          />
          :
          <Line
            type="monotone"
            yAxisId="left"
            dataKey="snow_in"
            name="Snow"
            stroke="#0d6efd"
            activeDot={{ r: 6 }}
          />
        }
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}

SnowChart.propTypes = {
  detailedForecast: PropTypes.array,
  onConvertingCentimetersToInches: PropTypes.func,
  isCelsiusSelected: PropTypes.bool
}

export default SnowChart;