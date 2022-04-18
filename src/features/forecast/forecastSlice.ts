import {
  createSlice,
  createEntityAdapter,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';

import { EntityId } from '@reduxjs/toolkit';

import { fetchWeather } from '../weather/weatherSlice';

import { RootState } from '../../app/store';

type WeatherDetails = {
  id?: number;
  main?: string;
  description?: string;
  icon?: string;
};

type ForecastDetails = {
  dt: number;
  main?: {
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    sea_level?: number;
    grnd_level?: number;
    humidity?: number;
    temp_kf?: number;
  };
  weather?: WeatherDetails[];
  clouds?: {
    all?: number;
  };
  wind?: {
    speed?: number;
    deg?: number;
    gust?: number;
  };
  visibility?: number;
  pop?: number;
  sys?: {
    pod?: string;
  };
  dt_txt?: string;
};

type ForecastResults = {
  cod: string;
  message: any;
  cnt: any;
  list: ForecastDetails[];
};

const forecastAdapter = createEntityAdapter<ForecastDetails>({
  selectId: (forecast) => forecast.dt,
});

const initialState = forecastAdapter.getInitialState({
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | undefined | null,
});

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchWeather.fulfilled,
        (state, action: PayloadAction<{ forecast: ForecastResults }>) => {
          state.status = 'succeeded';
          state.error = null;
          const forecastList = action.payload.forecast?.list || [];
          forecastAdapter.setAll(state, forecastList);
        }
      )
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default forecastSlice.reducer;

export const { selectIds: selectForecastIds } = forecastAdapter.getSelectors(
  (state: RootState) => state.forecast
);

export const selectForecastById = createSelector(
  (state: RootState, id: EntityId) => state.forecast.entities[id],
  (forecast) => {
    let time = forecast?.dt;
    time = time ? time * 1000 : undefined;
    const code = forecast?.weather?.[0]?.id;
    const description = forecast?.weather?.[0]?.description;
    const temp = forecast?.main?.temp;
    return { time, code, description, temp };
  }
);
