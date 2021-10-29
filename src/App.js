import React, { useState } from 'react';

// components
import LandingPage from 'components/LandingPage';
import WeatherPage from 'components/WeatherPage';

// api
import { getLocationFromBrowser, fetchGeolocation, fetchWeather } from 'api';

const isStale = (time) => {
  return Date.now() > time + 600000;
};

// localStorage getter/setter functions
const saveWeather = (data) => {
  localStorage.setItem('weather', JSON.stringify(data));
  localStorage.setItem('time', JSON.stringify(Date.now()));
};
const saveLocation = (data) => {
  localStorage.setItem('location', JSON.stringify(data));
};
const getItem = (item) => localStorage.getItem(item);
const read = (item) => JSON.parse(getItem(item));
const readWeather = () => read('weather');
const readTime = () => read('time');
const readLocation = () => read('location');

const App = () => {
  const [weather, setWeather] = useState(() => {
    return localStorage.getItem('weather') ? readWeather() : '';
  });
  const [location, setLocation] = useState(() => {
    return getItem('location') ? readLocation() : '';
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // takes a coordinates object, fetches weather data from the api, updates state
  const getWeather = (coords) => {
    setLoading(true);
    fetchWeather(coords)
      .then((data) => {
        setWeather(data);
        saveWeather(data);
        setError('');
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  // attempts to get geolocation data from browser: if successful calls getWeather() with the data, and saves the location in localStorage
  const getWeatherFromGeolocation = () => {
    getLocationFromBrowser()
      .then((coords) => {
        setLocation(coords);
        saveLocation(coords);
        getWeather(coords);
      })
      .catch((err) => setError(err));
  };

  const getLocation = () => {
    setLoading(true);
    fetchGeolocation('Buffalo, NY')
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // landing page: renders if no weather data has ever been fetched, or if the localStorage weather is stale
  if (!weather || isStale(readTime()))
    return (
      <LandingPage
        fetchWeather={getWeatherFromGeolocation}
        fetchLocation={getLocation}
        error={error}
        loading={loading}
      />
    );
  else
    return (
      <WeatherPage
        weather={weather}
        fetchWeather={getWeather}
        fetchLocation={getLocation}
        error={error}
        loading={loading}
      />
    );
};

export default App;
