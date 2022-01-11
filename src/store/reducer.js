// helper functions
import { readWeather, readLocation, getItem } from 'helpers/storage';

// action types
import { SET_WEATHER, SET_LOCATION, SET_ERROR, SET_LOADING } from './actions';

// default state
export const defaultState = {
  weather: getItem('weather') ? readWeather() : {},
  location: getItem('location') ? readLocation() : {},
  error: '',
  loading: false,
};

// reducer
export const reducer = (action, state) => {
  const { type, payload } = action;
  switch (type) {
    case SET_WEATHER: {
      return { ...state, weather: payload };
    }
    case SET_LOCATION: {
      return { ...state, location: payload };
    }
    case SET_ERROR: {
      return { ...state, error: payload };
    }
    case SET_LOADING: {
      return { ...state, loading: payload };
    }
    default: {
      console.warn('Unknown action type.');
      return { ...state };
    }
  }
};
