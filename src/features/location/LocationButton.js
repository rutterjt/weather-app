import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { fetchLocationFromBrowser } from './locationSlice';

import { FaLocationArrow } from 'react-icons/fa';
import { FilledButton } from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';

const StyledButton = styled(FilledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

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
      <StyledButton onClick={getLocationFromBrowser} color="yellow">
        <FaLocationArrow /> Detect Location
      </StyledButton>
      <ErrorMessage open={errorOpen} handleClose={closeError}>
        {fetchLocationError}
      </ErrorMessage>
    </>
  );
};

export default LocationButton;
