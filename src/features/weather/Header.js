import React from 'react';

import { useSelector } from 'react-redux';

import { selectLocationName } from '../location/locationSlice';
import { selectWeatherDescription } from './weatherSlice';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

const Header = () => {
  const placeName = useSelector(selectLocationName);
  const description = useSelector(selectWeatherDescription);
  if (!placeName || !description) return null;
  return (
    <header className="mb-8 text-center font-bold">
      <h1 className="text-[2rem] md:text-5xl mb-2 font-black">{placeName}</h1>
      <h2 className="text-xl md:text-2xl">{capitalize(description)}</h2>
    </header>
  );
};

export default Header;
