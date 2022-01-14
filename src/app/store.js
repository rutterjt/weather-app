import { configureStore } from '@reduxjs/toolkit';

// reducers
import locationReducer from '../features/location/locationSlice';
import weatherReducer from '../features/weather/weatherSlice';
import forecastReducer from '../features/forecast/forecastSlice';

export default configureStore({
  reducer: {
    location: locationReducer,
    weather: weatherReducer,
    forecast: forecastReducer,
  },
});
