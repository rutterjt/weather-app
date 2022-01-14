import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { get } from 'lodash';

import { fetchWeather } from '../weather/weatherSlice';

const forecastAdapter = createEntityAdapter({
  selectId: (forecast) => forecast.dt,
});

const initialState = forecastAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        const forecastList = get(action.payload, 'forecast.list', []);
        forecastAdapter.setAll(state, forecastList);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default forecastSlice.reducer;

export const { selectIds: selectForecastIds, selectById: selectForecastById } =
  forecastAdapter.getSelectors((state) => state.forecast);
