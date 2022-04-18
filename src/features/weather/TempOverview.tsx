import React from 'react';

// redux
import { useAppSelector } from '../../app/hooks';
import { selectTemperature, selectFeelsLike } from './weatherSlice';

// images
import TempCold from '../../images/temp-cold.png';
import TempWarm from '../../images/temp-warm.png';

// components
import { Temperature } from './Temperature';

export const TempOverview: React.FC = () => {
  const temp = useAppSelector(selectTemperature);
  const feelsLike = useAppSelector(selectFeelsLike);

  if (!temp || !feelsLike) return null;

  return (
    <div className="flex justify-center items-center font-bold mb-8 md:justify-start">
      <div className="hidden md:block max-w-[6rem] mr-2">
        <img
          src={temp > 40 ? TempWarm : TempCold}
          alt="Illustration of thermometer"
        />
      </div>
      <div className="flex flex-col justify-center items-center md:items-start">
        <div className="text-[3.5rem] flex">
          <Temperature value={temp} />
        </div>
        <div className="text-base">
          Feels Like: <Temperature value={feelsLike} />
        </div>
      </div>
    </div>
  );
};
