import React, { useState } from 'react';

// components
import LandingPage from 'components/LandingPage';
import WeatherPage from 'components/WeatherPage';

// api
import { geolocationFetch } from 'api';

const isStale = (time) => {
  return Date.now() > time + 600000;
};

// localStorage getter/setter functions
const saveWeather = (data) => {
  localStorage.setItem('weather', JSON.stringify(data));
  localStorage.setItem('time', JSON.stringify(Date.now()));
};
const getItem = (item) => localStorage.getItem(item);
const read = (item) => JSON.parse(getItem(item));
const readWeather = () => read('weather');
const readTime = () => read('time');

const App = () => {
  const [weather, setWeather] = useState(() => {
    return localStorage.getItem('weather') ? readWeather() : '';
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // fetches weather data from the api
  const fetchWeather = () => {
    setLoading(true);
    geolocationFetch('weather')
      .then((data) => {
        setWeather(data);
        saveWeather(data);
        setError('');
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  // landing page: renders if no weather data has ever been fetched, or if the localStorage is not
  if (!weather || isStale(readTime()))
    return (
      <LandingPage
        fetchWeather={fetchWeather}
        error={error}
        loading={loading}
      />
    );
  else
    return (
      <WeatherPage
        weather={weather}
        fetchWeather={fetchWeather}
        error={error}
        loading={loading}
      />
    );
};

export default App;
