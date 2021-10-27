import React from 'react';

// styles
import s from './Overview.module.css';

// components
import WeatherImage from 'components/WeatherImage';

// icons
import TempWarm from 'images/temp-warm.svg';
import TempCold from 'images/temp-cold.svg';

const Overview = ({ weatherID, timeOfDay, temp, feelsLike }) => {
  const freezingPoint = 32;
  return (
    <div className={s.wrapper}>
      <WeatherImage weatherID={weatherID} timeOfDay={timeOfDay} />
      <div className={s.tempOverview}>
        <img
          src={temp >= freezingPoint ? TempWarm : TempCold}
          alt=""
          className={s.tempIcon}
        />
        <div>
          <h2 className={s.temp} aria-label={`${temp} degrees`}>
            {Math.round(temp)}°<span className={s.tempScale}>F</span>
          </h2>
          <h3 className={s.feelsLike}>
            Feels like: {Math.round(feelsLike)}°
            <span className={s.tempScale}>F</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Overview;
