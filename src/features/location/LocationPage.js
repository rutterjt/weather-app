import React from 'react';

// components
import WeatherImage from '../weather/WeatherImage';
import LocationInput from './LocationInput';
import LocationButton from './LocationButton';

const LocationPage = () => (
  <>
    <h1 className="text-[2rem] md:text-5xl text-center mb-2 font-black">
      React Weather App
    </h1>
    <div className="mb-6">
      <WeatherImage />
    </div>
    <div className="max-w-[500px] mx-auto flex justify-between items-start flex-wrap gap-4">
      <div className="mb-8 flex-[1_1_200px] relative">
        <LocationButton />
      </div>
      <div className="mb-8 flex-[1_1_200px] relative">
        <LocationInput />
      </div>
    </div>
  </>
);

export default LocationPage;
