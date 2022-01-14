import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { client } from '../../api/client';

const initialState = {
  status: 'idle',
  error: null,
  weather: null,
  forecast: null,
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
        const { weather, forecast } = action.payload;
        state.status = 'succeeded';
        state.weather = weather;
        state.forecast = forecast;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;

export const selectWeatherState = (state) => state.weather;

export const selectWeather = (state) => selectWeatherState(state).weather;
export const selectForecast = (state) => selectWeatherState(state).forecast;
