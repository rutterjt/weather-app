import React, { useState, useEffect, useRef, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { LocationList } from './LocationList';
import { ErrorMessage } from '../../components/ErrorMessage';

import { fetchLocations, locationsCleared } from './locationSlice';

export const LocationInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const fetchLocationsError = useAppSelector(
    (state) => state.location.locations.error
  );
  const [errorOpen, setErrorOpen] = useState(!!fetchLocationsError); // maintain separate state for error ui, so the error message can be closed
  const [input, setInput] = useState('');
  const initial = useRef(true); // prevent geolocation fetch on page load
  const [active, setActive] = useState(false);
  const status = useAppSelector((state) => state.location.locations.status);

  const getLocations = useCallback(
    (query) => {
      dispatch(fetchLocations(query));
    },
    [dispatch]
  );

  const clearLocations = useCallback(
    () => dispatch(locationsCleared()),
    [dispatch]
  );

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    } else {
      const timeout = setTimeout(() => {
        // only fetch geolocations if there is an input that is not empty or filled with whitespace
        if (input.trim()) getLocations(input);
        else clearLocations();
        // else clearLocations();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [input, getLocations, clearLocations]);

  const handleFocus = () => setActive(true);
  const handleBlur = () => {
    if (input === '') setActive(false);
  };

  const closeError = () => setErrorOpen(false);

  useEffect(() => {
    if (fetchLocationsError) setErrorOpen(true);
    else setErrorOpen(false);
  }, [fetchLocationsError]);

  return (
    <div>
      <div className="relative min-w-[10rem]">
        <div className="relative rounded bg-white shadow-lg">
          <label
            className={`absolute top-4 left-3 text-black text-base transition-all bg-white [transform-origin:left_top_0px] leading-normal ${
              active ? '-translate-y-4 scale-[65%] z-10' : 'translate-y-0'
            } `}
            htmlFor="location-input"
          >
            Enter Location
          </label>
          <input
            className="relative w-full outline-none py-4 px-8 rounded border-none bg-transparent focus:ring-2 focus:ring-yellow-dark"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={status === 'loading'}
          />
        </div>
        <LocationList open={active} />
      </div>
      <ErrorMessage open={errorOpen} handleClose={closeError}>
        {fetchLocationsError}
      </ErrorMessage>
    </div>
  );
};
