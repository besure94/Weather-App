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

// look into possibly converting times to have format like 6pm, 7pm, etc vs 6:00pm, 7:00pm, etc

// could also maybe refactor code for chart, as the only difference in the y axis components are the 'value' property

function TempChart(props) {
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
            domain={['auto', 'auto']}
            label={{
              value: 'Celsius',
              position: 'outsideLeft',
              fontSize: "115%",
              dx: -20,
              angle: -90,
            }}
            tick={{ dx: -5 }}
            tickFormatter={(tick) => Math.round(tick)}
          />
          :
          <YAxis
            yAxisId="left"
            domain={['auto', 'auto']}
            label={{
              value: 'Fahrenheit',
              position: 'outsideLeft',
              fontSize: "115%",
              dx: -20,
              angle: -90,
            }}
            tick={{ dx: -5 }}
            tickFormatter={(tick) => Math.round(tick)}
          />
        }
        <Tooltip/>
        <Legend/>
        {isCelsiusSelected ?
          <Line
            type="monotone"
            yAxisId="left"
            dataKey="temp_c"
            name="Temperature"
            stroke="#FF6384"
            activeDot={{ r: 6 }}
          />
          :
          <Line
            type="monotone"
            yAxisId="left"
            dataKey="temp_f"
            name="Temperature"
            stroke="#FF6384"
            activeDot={{ r: 6 }}
          />
        }
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}

TempChart.propTypes = {
  detailedForecast: PropTypes.array,
  isCelsiusSelected: PropTypes.bool
}

export default TempChart;