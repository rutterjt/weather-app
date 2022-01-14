import React from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchLocations,
  locationAdded,
  selectLocations,
  fetchLocationFromBrowser,
} from './locationSlice';

const LocationPage = () => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);

  const getLocations = () => {
    dispatch(fetchLocations());
  };

  const addLocation = (coords, name) => {
    dispatch(locationAdded({ coords, name }));
  };
  const getLocationFromBrowser = () => {
    dispatch(fetchLocationFromBrowser());
  };

  let locationListContent;
  if (locations.length) {
    locationListContent = locations.map((location, index) => {
      const { coords, name } = location;
      return (
        <li key={index}>
          <button onClick={() => addLocation(coords, name)}>
            {name} ({coords.longitude}, {coords.latitude})
          </button>
        </li>
      );
    });
  }

  return (
    <div>
      <h1>We need your location to fetch the feather</h1>
      <button onClick={getLocationFromBrowser}>Detect location</button>
      <button onClick={getLocations}>Enter location</button>
      {locations && <ul>{locationListContent}</ul>}
    </div>
  );
};

export default LocationPage;
