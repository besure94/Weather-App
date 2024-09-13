import React from "react";
import PropTypes from "prop-types";

function CurrentConditionsDetails(props) {
  const { conditionsDetails } = props;

  return (
    <React.Fragment>
      <br/>
      <div className='current-weather'>
        <div className='location-weather'>
          <div className='current-weather-details'>
            <div className='details'>
              <h5>Rain</h5>
              <p>{conditionsDetails.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
            </div>
            <div className='details'>
              <h5>Snow</h5>
              <p>{conditionsDetails.forecast.forecastday[0].day.daily_chance_of_snow}%</p>
            </div>
            <div className='details'>
              <h5>Air Quality</h5>
              <p>{conditionsDetails.current.air_quality["us-epa-index"]}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

CurrentConditionsDetails.propTypes = {
  conditionsDetails: PropTypes.object
}

export default CurrentConditionsDetails;