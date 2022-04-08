import React from 'react';

// redux
import { useSelector } from 'react-redux';
import { selectTemperature, selectFeelsLike } from './weatherSlice';

// images
import { TempCold, TempWarm } from '../../images';

// components
import Temperature from './Temperature';

const TempOverview = () => {
  const temp = useSelector(selectTemperature);
  const feelsLike = useSelector(selectFeelsLike);

  if (!temp || !feelsLike) return null;

  return (
    <div className="flex justify-center items-center font-bold mb-8 md:justify-start">
      <div className="hidden md:block max-w-[6rem] mr-2">
        {temp > 40 ? <TempWarm /> : <TempCold />}
      </div>
      <div className="flex flex-col justify-center items-center md:items-start">
        <div className="text-[3.5rem] flex">
          <Temperature>{temp}</Temperature>
        </div>
        <div className="text-base">
          Feels Like: <Temperature>{feelsLike}</Temperature>
        </div>
      </div>
    </div>
  );
};

export default TempOverview;
