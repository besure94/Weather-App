# Weather Forecast

#### An application that allows a user to search for a five day weather forecast for a specific city.

#### By Brian Scherner

## Technologies Used

* React
* JavaScript
* JSX
* HTML
* Webpack
* Node Package Manager
* Babel
* ES Lint
* Bootstrap
* CSS
* OpenWeatherMap API

## Description

This application presents users with a form, where they enter a city. After submitting the form, they are shown a five day weather forecast for that city, which contains the weather for each day in 3 hour steps (8 total for each day).

Users can click on a specific forecast in the weather forecast list, which will show a table displaying important weather information for that specific forecast.

## Setup/Installation Requirements

#### Getting an API key

In order to use this application, you will also need an API key from the `OpenWeatherMap API`. Follow the instructions below:

* Go to [openweathermap.org](https://openweathermap.org/api), and click `sign up`.

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

None.

## License

MIT

Copyright(c) 2024 Brian Scherner