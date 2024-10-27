import React from "react";
import PropTypes from "prop-types";
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from "@mui/material";

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
            <TextField
              type="text"
              name="city"
              placeholder="Enter a city"
              slotProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
            }}
            required/>
          </form>
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