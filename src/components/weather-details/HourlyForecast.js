import React from "react";
import PropTypes from "prop-types";

// working on displaying hourly forecast
function HourlyForecast(props) {
  const { twentyFourHourForecast } = props;

  return (
    <React.Fragment>
      <br/>
      <br/>
      <div className="hourly-forecast">
        <h5>Hourly Forecast</h5>

      </div>
    </React.Fragment>
  )
}

HourlyForecast.propTypes = {
  twentyFourHourForecast: PropTypes.object
}

export default HourlyForecast;