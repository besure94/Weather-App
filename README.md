# Weather App

#### A work-in-progress application that allows a user to search for current weather conditions and forecasts for a specific city or region.

#### By Brian Scherner

## Technologies Used

* React
* JavaScript
* HTML
* Webpack
* Node Package Manager
* Babel
* ES Lint
* Bootstrap
* CSS
* Weather API

## Description

This application presents users with a form, where they enter a city or region. The current weather conditions for that city/region are then shown, along with other weather information that users commonly like to know. The weather conditions are retrieved from the Weather API.

## Setup/Installation Requirements

#### Getting an API key

In order to use this application, you will also need an API key from the `Weather API`. Follow the instructions below:

* Go to [WeatherAPI](https://www.weatherapi.com/), and click `Sign Up`.

* Create an account.

* Go to your newly created account. Your API key will be stored here.

#### Project Setup

* Select the green `Code` button, and clone this repository to your desktop.

* In your terminal, navigate to this project's folder, and run the command `$ npm install` to install all relevant packages.

* Create a file in the the root directory of this project called `.env`.

* In your `.env` file, create a variable called `REACT_APP_API_KEY=[YOUR-API-KEY]`. Replace `[YOUR-API-KEY]` with your API key. **Note:** The variable must be named `REACT_APP_API_KEY` in order for it to work.

* Add `.env` to the `gitignore` file. **Make sure to first commit the `gitignore` file before moving on.** If you don't do this first, your API key will be exposed, which is a security risk for the application.

* Run the command `$ npm run start` to start a live development server. This will open the project in your web browser at the URL `localhost:3000`, allowing you to use the application.

## Known Bugs

No bugs, but changes to the UI are necessary and will be added soon.

## License

MIT

Copyright(c) 2024 Brian Scherner
