import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchLocationFromBrowser } from './locationSlice';

import { FaLocationArrow } from 'react-icons/fa';
import ErrorMessage from '../../components/ErrorMessage';

const LocationButton = () => {
  const dispatch = useDispatch();
  const fetchLocationError = useSelector(
    (state) => state.location.current.error
  );
  const [errorOpen, setErrorOpen] = useState(!!fetchLocationError); // maintain separate state for error ui, so the error message can be closed

  const getLocationFromBrowser = () => {
    dispatch(fetchLocationFromBrowser());
  };

  const closeError = () => setErrorOpen(false);

  useEffect(() => {
    if (fetchLocationError) setErrorOpen(true);
    else setErrorOpen(false);
  }, [fetchLocationError]);

  return (
    <>
      <button
        className="relative py-7 px-4 rounded shadow-lg font-bold overflow-hidden cursor-pointer leading-none whitespace-nowrap w-full h-14 active:translate-y-[2px]  text-yellow-text bg-yellow-light hover:bg-yellow-dark transition-all flex items-center justify-center gap-2"
        onClick={getLocationFromBrowser}
        color="yellow"
      >
        <FaLocationArrow /> Detect Location
      </button>
      <ErrorMessage open={errorOpen} handleClose={closeError}>
        {fetchLocationError}
      </ErrorMessage>
    </>
  );
};

export default LocationButton;
