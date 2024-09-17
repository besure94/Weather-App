export const getWeather = async (city) => {
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=3&aqi=yes&alerts=no`);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  } else {
    const data = await response.json();
    return data;
  }
};