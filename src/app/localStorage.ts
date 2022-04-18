import { LocationState } from '../features/location/locationSlice';

export const loadState = () => {
  return undefined;
  // try {
  //   const serializedState = localStorage.getItem('state');
  //   if (serializedState === null) {
  //     return undefined;
  //   }
  //   return JSON.parse(serializedState);
  // } catch (err) {
  //   return undefined;
  // }
};

export const saveState = (state: LocationState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.warn(
      'Warning: error while trying to persist state to localStorage.'
    );
  }
};
