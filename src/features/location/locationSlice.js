// TODO: persist location to localStorage. But defer that until more progress on UI, for testing purposes.

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, isEmpty } from 'lodash';

import { client } from '../../api/client';

const initialState = {
  status: 'idle',
  error: null,
  coords: null,
  name: '',
  locations: [],
};

export const fetchLocations = createAsyncThunk(
  'location/fetchLocations',
  async () => {
    const response = await client.get('/location');
    return response.data;
  }
);

export const fetchLocationFromBrowser = createAsyncThunk(
  'location/fetchLocationFromBrowser',
  async () => {
    return new Promise((resolve, reject) => {
      const success = ({ coords }) =>
        resolve({ latitude: coords.latitude, longitude: coords.longitude });
      const error = () =>
        reject(
          'Please give permission for the browser to access your location, in order to you the app.'
        );

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        reject('Browser does not support geolocation.');
      }
    });
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    locationAdded(state, action) {
      const { coords, name } = action.payload;
      if (coords && !isEmpty(coords)) {
        state.coords = coords;
        state.status = 'idle';
        state.locations = [];
        state.error = null;

        if (name) {
          state.name = name;
        }
      }
    },
    locationRemoved(state, action) {
      state.coords = null;
      state.name = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLocations.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = [];
        action.payload.data.forEach((location) => {
          const { latitude, longitude, name } = location;
          state.locations.push({ name, coords: { latitude, longitude } });
        });
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase('weather/fetchWeather/fulfilled', (state, action) => {
        if (!state.name && get(action, 'payload.weather.name')) {
          // Browser geolocation doesn't provide a place name. Because OpenWeatherMap does provide a place name, use this as a convenient default if none otherise specified
          state.name = action.payload.weather.name;
        }
      })
      .addCase(fetchLocationFromBrowser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchLocationFromBrowser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coords = action.payload;
      })
      .addCase(fetchLocationFromBrowser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { locationAdded, locationRemoved } = locationSlice.actions;

export default locationSlice.reducer;

export const selectLocation = (state) => state.location;
export const selectLocations = (state) => selectLocation(state).locations;
export const selectLocationName = (state) => selectLocation(state).name;
export const selectLocationCoords = (state) => selectLocation(state).coords;
