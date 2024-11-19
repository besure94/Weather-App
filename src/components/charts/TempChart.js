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
        <XAxis dataKey="time" padding={{ left: 15, right: 15 }}/>
        <YAxis
          yAxisId="left"
          domain={['auto', 'auto']}
          label={{
            value: isCelsiusSelected ? 'Celsius' : 'Fahrenheit',
            position: 'outsideLeft',
            fontSize: "115%",
            dx: -30,
            angle: -90,
          }}
          tick={{ dx: -5 }}
        />
        <Tooltip/>
        <Legend/>
        <Line
          type="monotone"
          yAxisId="left"
          dataKey= {isCelsiusSelected ? "temp_c" : "temp_f"}
          name="Temperature"
          stroke="#FF6384"
          activeDot={{ r: 6 }}
        />
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