import React from 'react';

// components
import Layout from 'components/Layout';
import Header from 'components/Header';
import Overview from 'components/Overview';
import Details from 'components/Details';

// helpers
import { getTimeOfDay } from 'helpers/time-of-day';

const WeatherPage = ({ weather, fetchWeather, error, loading }) => {
  const { name: location } = weather;
  const {
    sys: { sunrise, sunset },
  } = weather;
  const current = weather.weather[0];
  const { id: weatherID, description } = current;
  const {
    main: { temp, feels_like: feelsLike },
  } = weather;

  const timeOfDay = getTimeOfDay(sunrise, sunset);

  return (
    <Layout
      weatherID={weatherID}
      timeOfDay={timeOfDay}
      loading={loading}
      header={<Header title={location} subtitle={description} />}
      left={
        <Overview
          weatherID={weatherID}
          timeOfDay={timeOfDay}
          temp={temp}
          feelsLike={feelsLike}
        />
      }
      right={<Details {...weather} />}
    ></Layout>
  );
};

export default WeatherPage;
