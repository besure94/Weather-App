import React from "react";
import PropTypes from "prop-types";
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDrop from '@mui/icons-material/WaterDrop';

function ConditionsDetails(props) {
  const { weatherConditionsByDay, rainLikely, snowLikely, isCelsiusSelected } = props;

  return (
    <React.Fragment>
        <div className="humidity-wind-rain-snow">
        <h5><WaterIcon fontSize="large"/>&nbsp;{weatherConditionsByDay.humidity}</h5>
        {isCelsiusSelected ?
          <h5><AirIcon fontSize='large'/>&nbsp;{weatherConditionsByDay.wind_kph}</h5>
          :
          <h5><AirIcon fontSize='large'/>&nbsp;{weatherConditionsByDay.wind_mph}</h5>
        }
        {/* <h5><AirIcon fontSize='large'/>&nbsp;{weatherConditionsByDay.wind_mph}</h5> */}
        {rainLikely && (
          <h5><WaterDrop fontSize="large"/>&nbsp;{weatherConditionsByDay.chanceOfRain}</h5>
        )}
        {snowLikely && (
          <h5><AcUnitIcon fontSize="large"/>&nbsp;{weatherConditionsByDay.chanceOfSnow}</h5>
        )}
      </div>
  </React.Fragment>
  )
}
ConditionsDetails.propTypes = {
  weatherConditionsByDay: PropTypes.object,
  rainLikely: PropTypes.bool,
  snowLikely: PropTypes.bool,
  isCelsiusSelected: PropTypes.bool
}

export default ConditionsDetails;