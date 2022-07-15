import React, { useEffect } from 'react';
import { useState } from 'react';

import { Location } from '../types';
import { readLocation } from './localStorage';
import { fetchLocations, fetchWeather } from './api';

// components
import { SearchInput } from '../components/search-input';

export const App = () => {
  const [location, setLocation] = useState<Location | null>(readLocation());
  useEffect(() => {
    // fetchLocations('london')
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));
    // const lat = 43.670277777;
    // const lon = -79.386666666;
    // fetchWeather(lat, lon)
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (data: string | null) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Hello, weather!</h1>
      <SearchInput onChange={handleInputChange} />
    </div>
  );
};
