import React from "react";
import PropTypes from "prop-types";
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness4Icon from '@mui/icons-material/Brightness4';

function SunriseSunset(props) {
  const { weatherConditionsByDay } = props;

  return (
    <React.Fragment>
      <div className="sunrise">
        <h5><Brightness6Icon fontSize="large"/>&nbsp;{weatherConditionsByDay.sunrise}</h5>
      </div>
      <div className="sunset">
        <h5><Brightness4Icon fontSize="large"/>&nbsp;{weatherConditionsByDay.sunset}</h5>
      </div>
    </React.Fragment>
  )
}

SunriseSunset.propTypes = {
  weatherConditionsByDay: PropTypes.object,
}

export default SunriseSunset;