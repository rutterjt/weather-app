import { configureStore } from '@reduxjs/toolkit';

import get from 'lodash/get';

// reducers
import locationReducer from '../features/location/locationSlice';
import weatherReducer from '../features/weather/weatherSlice';
import forecastReducer from '../features/forecast/forecastSlice';

import { loadState } from './localStorage';

const reducer = {
  location: locationReducer,
  weather: weatherReducer,
  forecast: forecastReducer,
};

const preloadedState = {
  location: get(loadState(), 'location', undefined),
};

export default configureStore({
  reducer,
  preloadedState,
});
