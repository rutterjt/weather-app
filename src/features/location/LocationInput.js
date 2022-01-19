import React, { useState, useEffect, useRef, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import LocationList from './LocationList';
import ErrorMessage from '../../components/ErrorMessage';

import { fetchLocations, locationsCleared } from './locationSlice';

export const Wrapper = styled.div`
  position: relative;
  min-width: 10rem;
`;

export const InputWrap = styled.div`
  position: relative;
  border-radius: 0.25rem;
  background-color: #fff;
`;

export const Label = styled.label`
  position: absolute;
  top: 1rem;
  left: 0.75rem;
  display: block;
  color: black;
  font-size: 1rem;
  line-height: 1;
  transition: all 0.2s;
  ${'' /* font-weight: bold; */}
  background-color: white;
  transform-origin: left top 0px;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transform: ${(props) =>
    props.active ? 'translate(0rem, -1.6rem) scale(0.75)' : 'translateY(0);'};
  ${(props) => (props.active ? 'z-index: 1;' : '')}
  ${(props) =>
    props.active
      ? `border-top: 3px solid ${props.theme.palette.yellow.dark};`
      : ''}
`;

export const Input = styled.input`
  position: relative;
  height: 3.5rem;
  width: 100%;
  font-size: 1rem;
  padding: 1.25rem 1rem;
  border-radius: 0.25rem;
  border: none;
  background-color: transparent;
  font-size: inherit;
  font-family: inherit;
  outline: none;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 10px 10px rgba(0, 0, 0, 0.12);

  &:focus {
    outline: 2px solid ${(props) => props.theme.palette.yellow.dark};
  }
`;

const LocationInput = () => {
  const dispatch = useDispatch();
  const fetchLocationsError = useSelector(
    (state) => state.location.locations.error
  );
  const [errorOpen, setErrorOpen] = useState(!!fetchLocationsError); // maintain separate state for error ui, so the error message can be closed
  const [input, setInput] = useState('');
  const initial = useRef(true); // prevent geolocation fetch on page load
  const [active, setActive] = useState(false);
  const status = useSelector((state) => state.location.locations.status);

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

  const updateInput = (e) => setInput(e.target.value);
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
    <>
      <Wrapper>
        <InputWrap>
          <Label htmlFor="location-input" active={active}>
            Enter Location
          </Label>
          <Input
            type="text"
            value={input}
            onChange={updateInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={status === 'loading'}
          />
        </InputWrap>
        <LocationList open={active} />
      </Wrapper>
      <ErrorMessage open={errorOpen} handleClose={closeError}>
        {fetchLocationsError}
      </ErrorMessage>
    </>
  );
};

export default LocationInput;
