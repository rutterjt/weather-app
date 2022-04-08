import React from 'react';

import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

import { selectLocationCoords } from './features/location/locationSlice';

import WeatherPage from './features/weather/WeatherPage';
import LocationPage from './features/location/LocationPage';
import Background from './app/Background';
import Layout from './app/Layout';
import Footer from './app/Footer';

const App = () => {
  const location = useSelector(selectLocationCoords);

  const isLocation = location && !isEmpty(location);

  let appContent = isLocation ? <WeatherPage /> : <LocationPage />;

  return (
    <Background>
      <Layout>{appContent}</Layout>
      <Footer />
    </Background>
  );
};

export default App;
