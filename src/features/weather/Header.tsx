import React from 'react';

import { useAppSelector } from '../../app/hooks';

import { selectLocationName } from '../location/locationSlice';
import { selectWeatherDescription } from './weatherSlice';

const capitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

export const Header: React.FC = () => {
  const placeName = useAppSelector(selectLocationName);
  const description = useAppSelector(selectWeatherDescription);
  if (!placeName || !description) return null;
  return (
    <header className="mb-8 text-center font-bold">
      <h1 className="text-[2rem] md:text-5xl mb-2 font-black">{placeName}</h1>
      <h2 className="text-xl md:text-2xl">{capitalize(description)}</h2>
    </header>
  );
};
