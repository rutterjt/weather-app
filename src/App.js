import React, { useEffect, useState } from 'react';

// components
import LandingPage from 'components/LandingPage';
import Wrapper from 'components/Wrapper';

// api
import { geolocationFetch } from 'api';

// helper functions
import { getTimeOfDay } from 'helpers/time-of-day';

const isStale = (time) => {
  return Date.now() > time + 600000;
};

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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!getItem('time') || isStale(readTime())) {
  //     setLoading(true);
  //     geolocationFetch('weather')
  //       .then((data) => {
  //         setWeather(data);
  //         saveWeather(data);
  //         console.log(data);
  //         setError('');
  //       })
  //       .catch((err) => {
  //         setError(err);
  //       })
  //       .finally(() => setLoading(false));
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

  return <LandingPage />;

  // if (loading) {
  //   return <h1 style={{ color: 'black' }}>Loading</h1>;
  // } else if (weather) {
  //   return <Wrapper weather={weather} />;
  // } else {
  //   return <h1 style={{ color: 'black' }}>Error</h1>;
  // }
};

export default App;
