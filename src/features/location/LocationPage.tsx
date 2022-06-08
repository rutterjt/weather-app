import React from 'react';

// components
import { WeatherImage } from '../weather/WeatherImage';
import { LocationInput } from './LocationInput';
import { LocationButton } from './LocationButton';

export const LocationPage: React.FC = () => (
  <>
    <h1 className="text-[2rem] md:text-6xl text-center mb-4 md:mb-12 font-black tracking-wide font-heading">
      Weatherlite
    </h1>
    <div className="mb-6 flex justify-center">
      <WeatherImage />
    </div>
    <div className="max-w-[500px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div className="mb-8 flex-1">
        <LocationButton />
      </div>
      <div className="mb-8 flex-1">
        <LocationInput />
      </div>
    </div>
  </>
);
