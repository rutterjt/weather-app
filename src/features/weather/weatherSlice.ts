import {
  createAsyncThunk,
  createSlice,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

// helpers
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { mmToIn } from '../../helpers/format';
import { getInHg } from '../../helpers/format';
import { getWindDirection } from '../../helpers/format';

import { client } from '../../api/client';
import { Coords } from '../location/locationSlice';

// openWeatherMap's docs say that 'Only really measured or calculated data is displayed in API response', so it is unclear which parameters can be safely assumed to be present in the data. So as a precaution, I am typing as optional all properties in state that were queried from openWeatherMap.

export type WeatherOverview = {
  id?: number;
  main?: string;
  description?: string;
  icon?: string;
};

export type WeatherConditions = {
  coord?: {
    lon?: number;
    lat?: number;
  };
  weather?: WeatherOverview[];
  base?: string;
  main?: {
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    humidity?: number;
  };
  visibility?: number;
  wind?: {
    speed?: number;
    deg?: number;
    gust?: number;
  };
  clouds?: {
    all?: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
  dt?: number;
  sys?: {
    type?: number;
    id?: number;
    message?: number;
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number;
};

export type WeatherState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined | null;
  current: WeatherConditions | null;
};

const initialState: WeatherState = {
  status: 'idle',
  error: null,
  current: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ latitude, longitude }: Coords) => {
    // const response = await client.get(
    //   `/.netlify/functions/weather?latitude=${latitude}&longitude=${longitude}`
    // );
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
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchWeather.fulfilled,
        (state, action: PayloadAction<{ weather: WeatherConditions }>) => {
          state.status = 'succeeded';
          if (action.payload) {
            state.current = action.payload.weather;
          }
          state.error = null;
        }
      )
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;

export const selectWeather = (state: RootState) => state.weather;

export const selectCurrentWeather = (state: RootState) =>
  selectWeather(state).current;

export const selectWeatherCode = createSelector(
  selectCurrentWeather,
  (current) => current?.weather?.[0]?.id
);

export const selectWeatherType = createSelector(
  selectCurrentWeather,
  (current) => current?.weather?.[0]?.main
);

export const selectWeatherDescription = createSelector(
  selectCurrentWeather,
  (current) => {
    let description = current?.weather?.[0]?.description;
    if (!description) return undefined;
    else if (description.includes(':')) return description.split(':')[0];
    else return description;
  }
);

export const selectTemperature = createSelector(
  selectCurrentWeather,
  (current) => current?.main?.temp
);

export const selectFeelsLike = createSelector(
  selectCurrentWeather,
  (current) => current?.main?.feels_like
);

export const selectSunrise = createSelector(
  selectCurrentWeather,
  (currentWeather) => {
    let sunrise = currentWeather?.sys?.sunrise;
    // openWeatherMap returns sunrise/sunset in seconds, so need to convert to miliseconds to be useful
    return sunrise ? sunrise * 1000 : undefined;
  }
);

export const selectSunset = createSelector(
  selectCurrentWeather,
  (currentWeather) => {
    let sunset = currentWeather?.sys?.sunset;
    // openWeatherMap returns sunrise/sunset/currentTime in seconds, so need to convert to miliseconds to be useful
    return sunset ? sunset * 1000 : undefined;
  }
);

export const selectCurrentTime = createSelector(
  selectCurrentWeather,
  (currentWeather) => {
    let currentTime = currentWeather?.dt;
    // openWeatherMap returns sunrise/sunset/currentTime in seconds, so need to convert to miliseconds to be useful
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
      // otherwise it is twilight
      return 'twilight';
    }
  }
);

export const selectHumidity = createSelector(
  selectCurrentWeather,
  (current) => current?.main?.humidity
);

export const selectRainfall = createSelector(
  selectCurrentWeather,
  (current) => {
    const rainFall = current?.rain?.['1h'];
    return rainFall ? mmToIn(rainFall) : undefined;
  }
);

export const selectSnowfall = createSelector(
  selectCurrentWeather,
  (current) => {
    const snowFall = current?.snow?.['1h'];
    return snowFall ? mmToIn(snowFall) : undefined;
  }
);

export const selectWind = createSelector(selectCurrentWeather, (current) => {
  const speed = current?.wind?.speed;
  const deg = current?.wind?.deg;
  const gusts = current?.wind?.gust;
  return {
    speed,
    direction: deg ? getWindDirection(deg) : undefined,
    gusts,
  };
});

export const selectPressure = createSelector(
  selectCurrentWeather,
  (current) => {
    const pressure = current?.main?.pressure;
    return pressure ? Math.round(getInHg(pressure) * 100) / 100 : undefined;
  }
);

export const selectCloudCover = createSelector(
  selectCurrentWeather,
  (current) => current?.clouds?.all
);
