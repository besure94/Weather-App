import React from "react";
import PropTypes from "prop-types";

function SearchForm(props) {

  function handleFormSubmission(event) {
    event.preventDefault();
    props.onFormSubmission({
      city: event.target.city.value
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleFormSubmission}>
        <input
          type="text"
          name="city"
          placeholder="Enter city and/or country"
          required/>
        <br/>
        <button type="submit">Get Weather</button>
      </form>
    </React.Fragment>
  )
}

SearchForm.propTypes = {
  onFormSubmission: PropTypes.func,
}

export default SearchForm;