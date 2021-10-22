import React, { useEffect, useState } from 'react';

// components
import Wrapper from 'layout/Wrapper';
import Header from 'layout/Header';
import Overview from 'layout/Overview';
import Hourly from 'layout/Hourly';
import Daily from 'layout/Daily';
import Today from 'layout/Today';

// data
import data from 'data.json';

import { geolocationFetch } from 'api';

const App = () => {
  const [current, setCurrent] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState({});
  const [dailyForecast, setDailyForecast] = useState({});
  const [alert, setAlert] = useState([]);

  const [weather, setWeather] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = geolocationFetch();
    if (!data) {
      setError('Could not get current position');
      console.log('Could not get current position');
    } else {
      setWeather(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);

    setCurrent(data.current);
    setHourlyForecast(data.hourly);
    setDailyForecast(data.daily);
    if (data.alerts) {
      setAlert(data.alerts[0]);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <Wrapper>
        <Header />
        <main>
          <Overview forecast={current} alert={alert} />
          <Hourly forecast={hourlyForecast} />
          <Daily forecast={dailyForecast} />
          <Today forecast={current} />
        </main>
      </Wrapper>
    );
  }
};

export default App;
