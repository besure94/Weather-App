require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/weather/:city', async (request, response) => {
  const city = request.params.city;
  // const city = 'London';
  const apiCallUrl = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=yes`;

  try {
    const apiResponse = await axios.get(apiCallUrl);
    console.log(apiResponse);
    response.json(apiResponse.data);
  } catch (error) {
    response.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || error.message || `Error fetching weather data for ${city}.`
    });
  }
});

app.listen(3001, () => console.log('Backend proxy server running on port 3001'));