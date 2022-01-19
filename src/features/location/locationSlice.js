// TODO: persist location to localStorage. But defer that until more progress on UI, for testing purposes.

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, isEmpty } from 'lodash';

import { client } from '../../api/client';

const initialState = {
  current: {
    status: 'idle',
    error: null,
    coords: null,
    name: '',
    fullName: '',
  },
  locations: {
    status: 'idle',
    error: null,
    entities: [],
  },
};

export const fetchLocations = createAsyncThunk(
  'location/fetchLocations',
  async (query) => {
    return new Promise((resolve, reject) => {
      client
        .get('/location')
        .then((response) => resolve(response.data))
        .catch(() =>
          reject(
            'Sorry, there was a problem fetching the location data. Please try again.'
          )
        );
    });
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
          'Please give permission for the app to use your location, or enter your location manually.'
        );

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        reject("Sorry, your browser doesn't support geolocation.");
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
        state.current.coords = coords;
        state.current.status = 'idle';
        state.locations.entities = [];
        state.current.error = null;
        state.locations.error = null;

        if (name) {
          state.current.name = name;
        }
      }
    },
    locationRemoved(state, action) {
      state.current.coords = null;
      state.current.name = '';
    },
    locationsCleared(state, action) {
      if (state.status !== 'loading') {
        state.locations.entities = [];
        state.locations.status = 'idle';
        state.locations.error = null;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLocations.pending, (state, action) => {
        state.locations.status = 'loading';
        state.locations.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations.status = 'succeeded';
        state.locations.entities = [];
        action.payload.data.forEach((location) => {
          const { latitude, longitude, name, label } = location;
          state.locations.entities.push({
            name,
            coords: { latitude, longitude },
            fullName: label,
          });
        });
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.locations.status = 'failed';
        state.locations.error = action.error.message;
      })
      .addCase('weather/fetchWeather/fulfilled', (state, action) => {
        if (!state.current.name && get(action, 'payload.weather.name')) {
          // Browser geolocation doesn't provide a place name. Because OpenWeatherMap does provide a place name, use this as a convenient default if none otherise specified
          state.current.name = action.payload.weather.name;
        }
      })
      .addCase(fetchLocationFromBrowser.pending, (state, action) => {
        state.current.status = 'loading';
        state.current.error = null;
      })
      .addCase(fetchLocationFromBrowser.fulfilled, (state, action) => {
        state.current.status = 'succeeded';
        state.current.coords = action.payload;
      })
      .addCase(fetchLocationFromBrowser.rejected, (state, action) => {
        state.current.status = 'failed';
        state.current.error = action.error.message;
      });
  },
});

export const { locationAdded, locationRemoved, locationsCleared } =
  locationSlice.actions;

export default locationSlice.reducer;

export const selectLocation = (state) => state.location;
export const selectLocations = (state) =>
  selectLocation(state).locations.entities;
export const selectLocationName = (state) => selectLocation(state).current.name;
export const selectLocationCoords = (state) =>
  selectLocation(state).current.coords;
