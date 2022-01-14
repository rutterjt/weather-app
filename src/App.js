import React from 'react';

// lodash
import { isEmpty } from 'lodash';

// redux
import { useSelector } from 'react-redux';

// selectors
import { selectLocationCoords } from './features/location/locationSlice';

// components
import WeatherPage from './features/weather/WeatherPage';
import LocationPage from './features/location/LocationPage';

// import { SET_WEATHER, SET_LOCATION, SET_ERROR, SET_LOADING } from 'reducer';

// api
// import { getLocationFromBrowser, fetchGeolocation, fetchWeather } from 'api';

// helper functions
// import {
//   saveWeather,
//   saveLocation,
//   getItem,
//   read,
//   readWeather,
//   readTime,
//   readLocation,
// } from 'helpers/storage';
// import { isStale } from 'helpers/time';
// import { isEmpty } from 'helpers/utils';

// lodash helpers
// import isEmpty from 'lodash/isEmpty';

// components
// import LandingPage from 'pages/LandingPage';
// import WeatherPage from 'pages/WeatherPage';

// store
// import { useStore } from 'store/useStore';

const App = () => {
  const location = useSelector(selectLocationCoords);

  const isLocation = location && !isEmpty(location);

  // fetch('/location')
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));
  // const { location } = useStore();

  // const update = (type) => (payload) => dispatch({ type, payload });
  // const setWeather = update(SET_WEATHER);
  // const setLocation = update(SET_LOCATION);
  // const setError = update(SET_ERROR);
  // const setLoading = update(SET_LOADING);

  // takes a coordinates object, fetches weather data from the api, updates state
  // const getWeather = (coords) => {
  //   setLoading(true);
  //   fetchWeather(coords)
  //     .then((data) => {
  //       setWeather(data);
  //       saveWeather(data);
  //       setError('');
  //     })
  //     .catch((err) => setError(err))
  //     .finally(() => setLoading(false));
  // };

  // attempts to get geolocation data from browser: if successful calls getWeather() with the data, and saves the location in localStorage
  // const fetchWeatherFromBrowser = () => {
  //   setLoading(true);
  //   getLocationFromBrowser()
  //     .then((coords) => {
  //       setLocation(coords);
  //       saveLocation(coords);
  //       getWeather(coords);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       setLoading(false);
  //     });
  // no need for setLoading(false) in finally block, because this will happen in getWeather(), which is always called from .then()
  // };

  // const fetchWeatherFromLocation = () => {
  //   setLoading(true);
  // };

  // const getLocation = (query, callback) => {
  // accepts a query string and a callback as arguments
  // fetches from a forward geocoding api with the query string, then passes the resulting data array to the callback
  //   if (!query) return;
  //   setLoading(true);
  //   fetchGeolocation(query)
  //     .then((data) => {
  //       console.log(data);
  //       if (callback) callback(data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setError(err);
  //       if (callback) callback([]);
  //     })
  //     .finally(() => setLoading(false));
  // };

  // useEffect(() => {
  //   getWeather({ latitude: 40.722133201018664, longitude: -74.10605365691892 });
  // }, []);
  // console.log(weather);

  // if there is no location saved, load the landing page to allow the user to select a location
  // if there is a location saved, jump straight to fetching the weather
  // if (isEmpty(location)) {
  //   return <LandingPage />;
  // } else {
  //   return <WeatherPage />;
  // }

  if (isLocation) {
    return <WeatherPage />;
  } else {
    return <LocationPage />;
  }
};

export default App;
