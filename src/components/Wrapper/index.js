import React from 'react';

import * as s from './Wrapper.module.css';

// components
import Background from 'components/Background';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Overview from 'components/Overview';
import Details from 'components/Details';

// helper functions
import { getTimeOfDay } from 'helpers/time-of-day';

const Wrapper = ({ weather }) => {
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
    <Background timeOfDay={timeOfDay} weatherID={weatherID}>
      <Layout>
        <Header location={location} description={description} />
        <Overview
          id={weatherID}
          timeOfDay={timeOfDay}
          temp={temp}
          feelsLike={feelsLike}
        />
        <Details {...weather} />
      </Layout>
    </Background>
  );
};

export default Wrapper;
