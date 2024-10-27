import React from "react";
import PropTypes from "prop-types";
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { IconButton } from "@mui/material";

function SearchForm(props) {

  function handleFormSubmission(event) {
    event.preventDefault();
    props.onFormSubmission({
      city: event.target.city.value
    });
  }

  return (
    <React.Fragment>
      <div className="search-form-container">
        <div className="search-form">
          <form onSubmit={handleFormSubmission}>
            <input
              type="text"
              name="city"
              placeholder="Enter a city"
              className="form-control"
              required/>
            <button className="btn btn-primary form-control" type="submit">Get Weather</button>
          </form>
        {/* <TextField
          type="text"
          name="city"
          placeholder="Enter a city"
          slotProps={
            <SearchIcon/>
          }
          onSubmit={handleFormSubmission}
          required/> */}
        </div>
      </div>
      <br/>
      <br/>
    </React.Fragment>
  )
}

SearchForm.propTypes = {
  onFormSubmission: PropTypes.func,
}

export default SearchForm;