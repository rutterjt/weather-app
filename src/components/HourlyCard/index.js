import React from 'react';

// styles
import s from './HourlyCard.module.css';

// components
import WeatherIcon from 'components/WeatherIcon';
import WeatherImage from 'components/WeatherImage';

// helpers
import { getDegreesF } from 'helpers/temp';
import { getHourAndMinute } from 'helpers/date';
import { getTimeOfDay } from 'helpers/time-of-day';

const HourlyCard = ({ temp, time, id, pop }) => {
  return (
    <div className={s.wrapper}>
      <span>{getDegreesF(temp)}°</span>
      <WeatherImage code={id} />
      <p>{getHourAndMinute(time)}</p>
    </div>
  );
};

export default HourlyCard;
