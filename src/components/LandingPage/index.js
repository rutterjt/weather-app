import React from 'react';

import * as s from './LandingPage.module.css';

// components
import Layout from 'components/Layout';
import Header from 'components/Header';
import WeatherImage from 'components/WeatherImage';

const LandingPage = () => {
  const weatherId = 100;
  const timeOfDay = 'day';
  return (
    <Layout weatherID={weatherId} timeOfDay={timeOfDay}>
      <Header title="Weather App" />
      <div className={s.iconWrap}>
        <WeatherImage weatherID={weatherId} timeOfDay={timeOfDay} />
      </div>
    </Layout>
  );
};

export default LandingPage;
