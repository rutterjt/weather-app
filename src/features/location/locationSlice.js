import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  error: null,
  coords: null,
  name: '',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    locationAdded(state, action) {
      const { coords, name } = action.payload;
      state.coords = coords;
      state.name = name;
    },
    locationRemoved(state, action) {
      state.coords = null;
      state.name = null;
    },
  },
});

export const { locationAdded, locationRemoved } = locationSlice;

export default locationSlice.reducer;

export const selectLocation = (state) => state.location;
export const selectLocationName = (state) => selectLocation(state).name;
export const selectLocationCoords = (state) => selectLocation(state).coords;
