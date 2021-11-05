import React from 'react';

import * as s from './LandingPage.module.css';

// components
import Layout from 'components/Layout';
import Header from 'components/Header';
import WeatherImage from 'components/WeatherImage';
import LocationButton from 'components/LocationButton';
import LocationInput from 'components/LocationInput';

const LandingPage = ({
  fetchWeather,
  fetchLocations,
  error,
  loading,
  locations,
  setLocation,
}) => {
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
        <div className={s.controls}>
          <div className={s.btnWrap}>
            <LocationButton label="Detect location" callback={fetchWeather} />
            {error && (
              <p>
                Oops, there was a problem. Your device's privacy settings may
                prevent getting your location.
              </p>
            )}
          </div>
          <LocationInput locations={locations} setLocation={setLocation} />
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
