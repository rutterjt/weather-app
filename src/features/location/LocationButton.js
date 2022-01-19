import React from 'react';

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

  const getLocationFromBrowser = () => {
    dispatch(fetchLocationFromBrowser());
  };

  return (
    <>
      <StyledButton onClick={getLocationFromBrowser} color="yellow">
        <FaLocationArrow /> Detect Location
      </StyledButton>
      {fetchLocationError ? (
        <ErrorMessage>{fetchLocationError}</ErrorMessage>
      ) : null}
    </>
  );
};

export default LocationButton;
