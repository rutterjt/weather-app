import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { fetchLocationFromBrowser } from './locationSlice';

import { FaLocationArrow } from 'react-icons/fa';
import { ErrorMessage } from '../../components/ErrorMessage';

export const LocationButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const fetchLocationError = useAppSelector(
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
    <div>
      <button
        className="relative py-4 px-8 rounded shadow-lg font-bold overflow-hidden cursor-pointer w-full whitespace-nowrap active:translate-y-[2px]  text-yellow-text bg-yellow-light leading-normal hover:bg-yellow-dark transition-all flex items-center justify-center gap-2"
        onClick={getLocationFromBrowser}
        color="yellow"
      >
        <FaLocationArrow /> Detect Location
      </button>
      <ErrorMessage open={errorOpen} handleClose={closeError}>
        {fetchLocationError}
      </ErrorMessage>
    </div>
  );
};
