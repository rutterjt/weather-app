import React from 'react';

import * as s from './LandingPage.module.css';

// components
import Layout from 'components/Layout';
import Header from 'components/Header';
import WeatherImage from 'components/WeatherImage';
import LocationButton from 'components/LocationButton';

const LandingPage = ({ fetchWeather, error, loading }) => {
  const weatherId = 100;
  const timeOfDay = 'day';
  return (
    <Layout
      weatherID={weatherId}
      timeOfDay={timeOfDay}
      loading={loading}
      header={<Header title="Weather App" />}
    >
      <div>
        <div className={s.iconWrap}>
          <WeatherImage weatherID={weatherId} timeOfDay={timeOfDay} />
        </div>
        <div className={s.btnWrap}>
          <LocationButton label="Get Weather" callback={fetchWeather} />
          {error && <p>Oops, there was an error. Please try again.</p>}
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
