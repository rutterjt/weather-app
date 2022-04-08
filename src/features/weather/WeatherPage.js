import React, { useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchWeather } from './weatherSlice';

import WeatherImage from './WeatherImage';
import Spinner from '../../components/Spinner';
import Header from './Header';
import TempOverview from './TempOverview';
import WeatherOverview from './WeatherOverview';
import WeatherDetails from './WeatherDetails';
import ForecastOverview from '../forecast/ForecastOverview';

const WeatherPage = () => {
  const dispatch = useDispatch();

  const loadingStatus = useSelector((state) => state.weather.status);

  const getWeather = useCallback(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  useEffect(() => {
    if (loadingStatus === 'idle') {
      getWeather();
    }
  }, [loadingStatus, getWeather]);

  if (loadingStatus === 'loading') {
    return (
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/80 flex justify-center items-center z-20">
        <Spinner size="lg" />
      </div>
    );
  } else if (loadingStatus === 'failed') {
    return (
      <div>
        Oops, there was a problem.{' '}
        <button onClick={getWeather}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Header />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
        <div className="col-span-7">
          <div className="mb-6">
            <WeatherImage />
          </div>
          <TempOverview />
        </div>
        <div className="col-span-5">
          <WeatherOverview />
          <WeatherDetails />
          <ForecastOverview />
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
