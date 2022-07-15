import type { Location } from '../types';

const isLocation = (location: any): location is Location => {
  return (
    typeof location?.name === 'string' &&
    typeof location?.lat === 'number' &&
    typeof location?.lon === 'number'
  );
};

/**
 * Attempts to get the persisted location from localStorage.
 *
 * Returns an object of type Location, or null.
 */
export const readLocation = () => {
  try {
    const persistedState = localStorage.getItem('location');
    // if no state, return null
    if (!persistedState) return null;
    const parsedState = JSON.parse(persistedState);
    if (isLocation(parsedState)) {
      return parsedState;
    } else {
      return null;
    }
  } catch (error) {
    let message =
      'An unknown error occurred while trying to read persisted location in localStorage.';
    if (error instanceof Error) message = error.message;
    console.error(message);
    return null;
  }
};

/**
 * Persists location data to localStorage
 */
export const setLocation = (location: Location) => {
  try {
    if (isLocation(location)) {
      localStorage.setItem('location', JSON.stringify(location));
    } else {
      throw new Error(
        'Location data is incorrectly formatted and cannot be persisted to localStorage.'
      );
    }
  } catch (error) {
    let message =
      'An unknown error occurred while trying to persist location to localStorage.';
    if (error instanceof Error) message = error.message;
    console.error(message);
  }
};

/**
 * Removes location data from localStorage
 */
export const clearLocation = () => {
  try {
    localStorage.removeItem('location');
  } catch (error) {
    console.error(
      "An error occurred while trying to delete the location data from localStorage. Please use your browser's settings to delete the data instead."
    );
  }
};
