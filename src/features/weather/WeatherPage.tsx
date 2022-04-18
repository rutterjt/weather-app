import React, { useEffect, useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { fetchWeather } from './weatherSlice';
import { selectLocationCoords } from '../location/locationSlice';

import { WeatherImage } from './WeatherImage';
import { Spinner } from '../../components/Spinner';
import { Header } from './Header';
import { TempOverview } from './TempOverview';
import { WeatherOverview } from './WeatherOverview';
import { WeatherDetails } from './WeatherDetails';
import { ForecastOverview } from '../forecast/ForecastOverview';

export const WeatherPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const loadingStatus = useAppSelector((state) => state.weather.status);
  const coords = useAppSelector(selectLocationCoords);

  const getWeather = useCallback(() => {
    if (
      coords !== null &&
      loadingStatus !== 'loading' &&
      loadingStatus !== 'succeeded'
    ) {
      dispatch(fetchWeather(coords));
    }
  }, [coords, loadingStatus, dispatch]);

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
        <div className="md:col-span-7">
          <div className="mb-6 flex justify-center md:justify-start">
            <div className="w-auto">
              <WeatherImage />
            </div>
          </div>
          <TempOverview />
        </div>
        <div className="md:col-span-5">
          <WeatherOverview />
          <WeatherDetails />
          <ForecastOverview />
        </div>
      </div>
    </div>
  );
};
