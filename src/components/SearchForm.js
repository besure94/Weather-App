import React from "react";
import PropTypes from "prop-types";
import SearchIcon from '@mui/icons-material/Search';

function SearchForm(props) {

  function handleFormSubmission(event) {
    event.preventDefault();
    props.onFormSubmission({
      city: event.target.city.value
    });
  }

  return (
    <React.Fragment>
      <div className="form-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleFormSubmission}>
              <input
                type="text"
                name="city"
                placeholder="Enter a city"
                className="form-control"
                required/>
              <br/>
              <button className="btn btn-primary form-control" type="submit">Get Weather</button>
            </form>
          </div>
        </div>
      </div>
      <hr/>
    </React.Fragment>
  )
}

SearchForm.propTypes = {
  onFormSubmission: PropTypes.func,
}

export default SearchForm;