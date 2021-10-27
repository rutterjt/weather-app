import React from 'react';

// styles
import s from './Overview.module.css';

// components
import WeatherImage from 'components/WeatherImage';

const Overview = ({ id, timeOfDay, temp, feelsLike }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <WeatherImage code={id} timeOfDay={timeOfDay} className={s.image} />
        <h2 className={s.temp} aria-label={`${temp} degrees`}>
          {Math.round(temp)}° <span className={s.tempScale}>F</span>
        </h2>
        <h3 className={s.feelsLike}>
          Feels like: {Math.round(feelsLike)}°{' '}
          <span className={s.tempScale}>F</span>
        </h3>
      </div>
    </div>
  );
};

export default Overview;
