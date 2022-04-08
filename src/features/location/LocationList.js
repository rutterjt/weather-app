import React from 'react';

import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';
import { useSelector, useDispatch } from 'react-redux';

import { locationAdded, selectLocations } from './locationSlice';

import Spinner from '../../components/Spinner';

/**
 * Renders a dropdown list of locations for the user to choose from.
 *
 * Clicking on a list item sets it as the current location.
 */
const LocationList = ({ open }) => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const status = useSelector((state) => state.location.locations.status);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  const addLocation = (coords, name, fullName) => {
    dispatch(locationAdded({ coords, name, fullName }));
  };

  let locationListContent;
  if (locations.length) {
    locationListContent = locations.map((location, index) => {
      const { coords, fullName, name } = location;
      return (
        <li className="border-b-[1px] border-b-black/20 block" key={index}>
          <button
            className="block p-4 text-left w-full font-normal hover:bg-white/95 transition-all"
            onClick={() => addLocation(coords, name, fullName)}
          >
            {fullName}
          </button>
        </li>
      );
    });
  }

  if (!isEmpty(locations) && open) {
    return (
      <ul className="mt-2 z-10 text-left bg-white text-black shadow-lg flex flex-col rounded max-h-[200px] overflow-y-auto">
        {locationListContent}
      </ul>
    );
  } else {
    return null;
  }
};

LocationList.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default LocationList;
