import React, { useState } from 'react';

import { useGlobalContext } from 'context';

import { SET_WEATHER, SET_LOCATION, SET_ERROR, SET_LOADING } from 'reducer';

// components
import LandingPage from 'components/LandingPage';
import WeatherPage from 'components/WeatherPage';

// api
import { getLocationFromBrowser, fetchGeolocation, fetchWeather } from 'api';

// helper functions
import {
  saveWeather,
  saveLocation,
  getItem,
  read,
  readWeather,
  readTime,
  readLocation,
} from 'helpers/storage';
import { isStale } from 'helpers/time';
import { isEmpty } from 'helpers/utils';

const App = () => {
  const { weather, location, error, loading, dispatch } = useGlobalContext();

  const update = (type) => (payload) => dispatch({ type, payload });
  const setWeather = update(SET_WEATHER);
  const setLocation = update(SET_LOCATION);
  const setError = update(SET_ERROR);
  const setLoading = update(SET_LOADING);

  // takes a coordinates object, fetches weather data from the api, updates state
  const getWeather = () => {
    setLoading(true);
    fetchWeather(location)
      .then((data) => {
        setWeather(data);
        saveWeather(data);
        setError('');
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  // attempts to get geolocation data from browser: if successful calls getWeather() with the data, and saves the location in localStorage
  const fetchWeatherFromBrowser = () => {
    setLoading(true);
    getLocationFromBrowser()
      .then((coords) => {
        setLocation(coords);
        saveLocation(coords);
        getWeather(coords);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    // no need for setLoading(false) in finally block, because this will happen in getWeather(), which is always called from .then()
  };

  const fetchWeatherFromLocation = () => {
    setLoading(true);
  };

  const getLocation = (query, callback) => {
    // accepts a query string and a callback as arguments
    // fetches from a forward geocoding api with the query string, then passes the resulting data array to the callback
    if (!query) return;
    setLoading(true);
    fetchGeolocation(query)
      .then((data) => {
        console.log(data);
        if (callback) callback(data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        if (callback) callback([]);
      })
      .finally(() => setLoading(false));
  };

  if (weather && !isStale(time) && !isEmpty(location)) {
    return (
      <WeatherPage fetchWeather={getWeather} fetchLocation={getLocation} />
    );
  } else {
    return <LandingPage setLocation={setLocation} />;
  }
};

export default App;
