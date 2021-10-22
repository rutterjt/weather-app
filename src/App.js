import React, { useEffect, useState } from 'react';

// components
import Wrapper from 'layout/Wrapper';
import Header from 'layout/Header';
// import Overview from 'layout/Overview';
// import Hourly from 'layout/Hourly';
// import Daily from 'layout/Daily';
// import Today from 'layout/Today';

// data
// import data from 'data.json';

import { geolocationFetch } from 'api';

const isStale = (time) => {
  return Date.now() > time + 300000;
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!getItem('time') || isStale(readTime())) {
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
    }
  }, []);

  if (loading) {
    return <h1 style={{ color: 'black' }}>Loading</h1>;
  } else {
    return (
      <Wrapper>
        <Header />
      </Wrapper>
    );
  }
};

export default App;
