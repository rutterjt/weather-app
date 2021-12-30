import React from 'react';

// components
import Layout from 'components/Layout';
import Header from 'components/Header';
import Overview from 'components/Overview';
import Details from 'components/Details';
import LoadWeather from 'components/LoadWeather';

// helpers
import { getTimeOfDay } from 'helpers/time-of-day';
import { useGlobalContext } from 'context';
import { useEffect } from 'react/cjs/react.development';
import { isStale } from 'helpers/time';
import { readTime } from 'helpers/storage';
import { isEmpty } from 'helpers/utils';

const WeatherPage = ({ fetchWeather }) => {
  const { weather, loading } = useGlobalContext();

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

  useEffect(() => {
    if (!weather || (isStale(readTime()) && !isEmpty(location))) {
      fetchWeather();
    }
  }, [weather, fetchWeather, location]);

  if (weather) {
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
  } else {
    return <h1>No weather data available</h1>;
  }
};

export default WeatherPage;
