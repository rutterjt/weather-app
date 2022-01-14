import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
