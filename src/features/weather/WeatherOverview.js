import React from 'react';

// date util
import format from 'date-fns/format';

// redux
import { useSelector } from 'react-redux';
import {
  selectCurrentTime,
  selectSunrise,
  selectSunset,
  selectWeatherDescription,
  selectTemperature,
  selectFeelsLike,
} from './weatherSlice';

// components
import Temperature from './Temperature';
import Dropdown from '../../components/Dropdown';

const WeatherOverview = () => {
  const now = useSelector(selectCurrentTime);
  const sunrise = useSelector(selectSunrise);
  const sunset = useSelector(selectSunset);
  const temp = useSelector(selectTemperature);
  const feelsLike = useSelector(selectFeelsLike);
  const description = useSelector(selectWeatherDescription);

  // if any values not present, return null to prevent error
  if (!now || !sunrise || !sunset || !temp || !feelsLike || !description)
    return null;
  return (
    <Dropdown
      title={now > sunset ? "Tonight's Weather" : "Today's Weather"}
      openOnMount
    >
      <p className="mb-4">
        {format(new Date(now), 'EEEE, MMMM do, p')}. It is{' '}
        <Temperature>{temp}</Temperature>, and feels like{' '}
        <Temperature>{feelsLike}</Temperature>. The current weather:{' '}
        {description}.
      </p>
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col mb-4">
          <span className="mb-1 text-sm text-black/80">Sunrise</span>
          <span>{format(new Date(sunrise), 'p')}</span>
        </div>
        <div className="flex flex-col mb-4">
          <span className="mb-1 text-sm text-black/80">Sunset</span>
          <span>{format(new Date(sunset), 'p')}</span>
        </div>
      </div>
    </Dropdown>
  );
};

export default WeatherOverview;
