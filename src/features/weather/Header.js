import React from 'react';

import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { selectLocationName } from '../location/locationSlice';
import { selectWeatherDescription } from './weatherSlice';

import Title from '../../components/Title';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

const StyledHeader = styled.header`
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;
`;

const Location = styled(Title)`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  line-height: 1.15;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Weather = styled.h2`
  font-size: 1.25rem;

  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Header = () => {
  const placeName = useSelector(selectLocationName);
  const description = useSelector(selectWeatherDescription);
  if (!placeName || !description) return null;
  return (
    <StyledHeader>
      <Location>{placeName}</Location>
      <Weather>{capitalize(description)}</Weather>
    </StyledHeader>
  );
};

export default Header;
