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

const App = () => {
  const [current, setCurrent] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState({});
  const [dailyForecast, setDailyForecast] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setCurrent(data.current);
    setHourlyForecast(data.hourly);
    setDailyForecast(data.daily);
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <Wrapper>
        <Header />
        <main>
          <Overview forecast={current} />
          <Hourly forecast={hourlyForecast} />
          <Daily forecast={dailyForecast} />
          <Today forecast={current} />
        </main>
      </Wrapper>
    );
  }
};

export default App;
