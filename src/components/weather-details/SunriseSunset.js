import React from "react";
import PropTypes from "prop-types";
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness4Icon from '@mui/icons-material/Brightness4';

function SunriseSunset(props) {
  const { weatherConditionsByDay, selectedForecastDay } = props;

  return (
    <React.Fragment>
      {selectedForecastDay !== 0 && (
        <div className="sunrise-sunset">
          <h5><Brightness6Icon fontSize="large"/>&nbsp;{weatherConditionsByDay.sunrise}</h5>
          <h5><Brightness4Icon fontSize="large"/>&nbsp;{weatherConditionsByDay.sunset}</h5>
        </div>
      )}
    </React.Fragment>
  )
}

SunriseSunset.propTypes = {
  weatherConditionsByDay: PropTypes.object,
  selectedForecastDay: PropTypes.number
}

export default SunriseSunset;