import React from 'react';

// helper functions
import { getTimeOfDay } from 'helpers/time-of-day';

// styles
import s from './Overview.module.css';

import WeatherImage from 'components/WeatherImage';

const Overview = ({ forecast }) => {
  const code = forecast.weather[0].id;
  const timeOfDay = getTimeOfDay(forecast.sunrise, forecast.sunset);
  return (
    <div>
      <WeatherImage code={code} timeOfDay={timeOfDay} className={s.image} />
    </div>
  );
};

export default Overview;
