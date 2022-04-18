import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import isEmpty from 'lodash/isEmpty';

import { RootState } from '../../app/store';
import { client } from '../../api/client';
import { fetchWeather, WeatherConditions } from '../weather/weatherSlice';

export type Coords = {
  latitude: number;
  longitude: number;
};

export type Location = {
  coords: Coords | null;
  name?: string;
  fullName?: string;
};

type FullLocation = {
  latitude: number;
  longitude: number;
  label: string;
  name: string;
  type?: string | null;
  number?: string | null;
  street?: string | null;
  postal_code?: string | null;
  confidence?: number | null;
  region?: string | null;
  region_code: string | null;
  administrative_area?: string | null;
  neighbourhood?: string | null;
  country?: string | null;
  country_code?: string | null;
  map_url?: string | null;
};

export type LocationState = {
  current: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined | null;
  } & Location;
  locations: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined | null;
    entities: Location[];
  };
};

const initialState: LocationState = {
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
  async (query: string) => {
    const response = await client.get('/location');
    const result: Location[] = response.data.data.map(
      (location: FullLocation) => ({
        coords: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        name: location.name,
        fullName: location.label,
      })
    );
    return result;
  }
);

export const fetchLocationFromBrowser = createAsyncThunk<Coords, void>(
  'location/fetchLocationFromBrowser',
  () => {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }: GeolocationPosition) => {
            resolve({ latitude: coords.latitude, longitude: coords.longitude });
          },
          (err) => {
            console.group('Error fetching user location');
            console.warn(
              "There was an error fetching the user's location from the browser."
            );
            console.warn(
              'navigator.geolocation.getCurrentPosition threw an error.'
            );
            console.warn('Error message:', err.message);
            console.groupEnd();
            reject(
              'Sorry, there was a problem getting your location from your browser.'
            );
          }
        );
      } else {
        reject("Sorry, your browser doesn't support geolocation");
      }
    });
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    locationAdded(state, action: PayloadAction<Location>) {
      const { coords, name } = action.payload;
      if (coords && !isEmpty(coords)) {
        state.current.coords = coords;
        state.current.status = 'succeeded';
        state.locations.entities = [];
        state.current.error = null;
        state.locations.error = null;

        if (name) {
          state.current.name = name;
        }
      }
    },
    locationRemoved(state) {
      state.current.coords = null;
      state.current.name = '';
      state.current.fullName = '';
      state.current.status = 'idle';
      state.current.error = null;
    },
    locationsCleared(state) {
      if (state.locations.status !== 'loading') {
        state.locations.entities = [];
        state.locations.status = 'idle';
        state.locations.error = null;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.locations.status = 'loading';
        state.locations.error = null;
      })
      .addCase(
        fetchLocations.fulfilled,
        (state, action: PayloadAction<Location[]>) => {
          state.locations.status = 'succeeded';
          state.locations.entities = action.payload;
        }
      )
      .addCase(fetchLocations.rejected, (state, action) => {
        state.locations.status = 'failed';
        state.locations.error = action.error.message;
      })
      .addCase(
        fetchWeather.fulfilled,
        (state, action: PayloadAction<{ weather: WeatherConditions }>) => {
          if (!state.current.name && action.payload.weather?.name) {
            // Browser geolocation doesn't provide a place name. Because OpenWeatherMap does provide a place name, use this as a convenient default if none otherise specified
            state.current.name = action.payload.weather?.name;
            state.current.fullName = action.payload.weather?.name;
          }
        }
      )
      .addCase(fetchLocationFromBrowser.pending, (state, action) => {
        state.current.status = 'loading';
        state.current.error = null;
      })
      .addCase(
        fetchLocationFromBrowser.fulfilled,
        (state, action: PayloadAction<Coords>) => {
          state.current.status = 'succeeded';
          state.current.coords = action.payload;
        }
      )
      .addCase(fetchLocationFromBrowser.rejected, (state, action) => {
        state.current.status = 'failed';
        state.current.error = action.error.message;
      });
  },
});

export const { locationAdded, locationRemoved, locationsCleared } =
  locationSlice.actions;

export default locationSlice.reducer;

export const selectLocation = (state: RootState) => state.location;
export const selectLocations = (state: RootState) =>
  selectLocation(state).locations.entities;
export const selectLocationName = (state: RootState) =>
  selectLocation(state).current.name;
export const selectLocationCoords = (state: RootState) =>
  selectLocation(state).current.coords;
