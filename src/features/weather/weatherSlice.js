import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';

// helpers
import { get } from 'lodash';
import differenceInMinutes from 'date-fns/differenceInMinutes';

import { client } from '../../api/client';

const initialState = {
  status: 'idle',
  error: null,
  current: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async () => {
    const response = await client.get('/weather');
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.weather) {
          state.current = action.payload.weather;
        }
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;

export const selectWeather = (state) => state.weather;

export const selectCurrentWeather = (state) => selectWeather(state).current;

export const selectWeatherCode = (state) => {
  const currentWeather = selectCurrentWeather(state);
  return get(currentWeather, 'weather[0].id');
};

export const selectWeatherType = (state) => {
  const currentWeather = selectCurrentWeather(state);
  return get(currentWeather, 'weather[0].id');
};

export const selectWeatherDescription = (state) => {
  const currentWeather = selectCurrentWeather(state);
  return get(currentWeather, 'weather[0].id');
};

// TODO: convert selectSunrise, selectSunset, and selectCurrentTime to createSelector
export const selectSunrise = createSelector(
  selectCurrentWeather,
  (currentWeather) => {
    let sunrise = get(currentWeather, 'sys.sunrise');
    return sunrise ? sunrise * 1000 : undefined;
  }
);

export const selectSunset = createSelector(
  selectCurrentWeather,
  (currentWeather) => {
    let sunset = get(currentWeather, 'sys.sunset');
    return sunset ? sunset * 1000 : undefined;
  }
);

export const selectCurrentTime = createSelector(
  selectCurrentWeather,
  (currentWeather) => {
    let currentTime = get(currentWeather, 'dt');
    return currentTime ? currentTime * 1000 : undefined;
  }
);

export const selectTimeOfDay = createSelector(
  // inputs
  [selectSunrise, selectSunset, selectCurrentTime],
  // output
  (sunrise, sunset, currentTime) => {
    if (!sunrise || !sunset || !currentTime) {
      return 'day';
    }
    const sunriseDate = new Date(sunrise);
    const sunsetDate = new Date(sunset);
    const now = new Date(currentTime);

    if (
      differenceInMinutes(sunriseDate, now) > 30 ||
      differenceInMinutes(now, sunsetDate) > 30
    ) {
      // night: if it is more than 30 minutes before sunrise, or more than 30 minutes after sunset
      return 'night';
    } else if (
      differenceInMinutes(now, sunrise) > 30 &&
      differenceInMinutes(sunsetDate, now) > 30
    ) {
      // day: if it is more than 30 minutes after sunrise and more than 30 minutes before sunset
      return 'day';
    } else {
      return 'twilight';
    }
  }
);
