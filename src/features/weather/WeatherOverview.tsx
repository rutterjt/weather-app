import React from 'react';

// date util
import format from 'date-fns/format';

// redux
import { useAppSelector } from '../../app/hooks';
import {
  selectCurrentTime,
  selectSunrise,
  selectSunset,
  selectWeatherDescription,
  selectTemperature,
  selectFeelsLike,
} from './weatherSlice';

// components
import { Temperature } from './Temperature';

export const WeatherOverview: React.FC = () => {
  const now = useAppSelector(selectCurrentTime);
  const sunrise = useAppSelector(selectSunrise);
  const sunset = useAppSelector(selectSunset);
  const temp = useAppSelector(selectTemperature);
  const feelsLike = useAppSelector(selectFeelsLike);
  const description = useAppSelector(selectWeatherDescription);

  // if any values not present, return null to prevent error
  if (!now || !sunrise || !sunset || !temp || !feelsLike || !description)
    return null;
  return (
    <section className="mb-6 text-lg">
      <h2 className="mb-2 text-xl font-heading font-bold md:text-3xl">
        Tonight's Weather
      </h2>
      <p className="mb-4">
        {format(new Date(now), 'EEEE, MMMM do, p')}. It is{' '}
        <Temperature value={temp} />, and feels like{' '}
        <Temperature value={feelsLike} />. The current weather: {description}.
      </p>
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col mb-4">
          <span className="mb-1 text-sm opacity-80">Sunrise</span>
          <span>{format(new Date(sunrise), 'p')}</span>
        </div>
        <div className="flex flex-col mb-4">
          <span className="mb-1 text-sm opacity-80">Sunset</span>
          <span>{format(new Date(sunset), 'p')}</span>
        </div>
      </div>
    </section>
  );
};
