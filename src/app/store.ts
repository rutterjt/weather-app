import { configureStore } from '@reduxjs/toolkit';

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
  location: loadState(),
};

export const store = configureStore({
  reducer,
  preloadedState,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
