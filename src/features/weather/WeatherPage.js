import React, { useEffect, useCallback } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';

import { fetchWeather } from './weatherSlice';

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
    return <div>Loading...</div>;
  } else if (loadingStatus === 'failed') {
    return (
      <div>
        Oops, there was a problem.{' '}
        <button onClick={getWeather}>Try Again</button>
      </div>
    );
  }

  return <div>We have weather!</div>;
};

export default WeatherPage;
