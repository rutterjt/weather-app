import HourlyCard from 'components/HourlyCard';
import { getDegreesF } from 'helpers/temp';
import React from 'react';

// styles
import s from './Hourly.module.css';

const Hourly = ({ forecast }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <ul className={s.list}>
          {forecast.slice(0, 25).map((item, index) => {
            const { dt, temp, weather, pop } = item;
            const id = weather[0].id;
            return (
              <li className={s.listItem} key={index}>
                <HourlyCard time={dt} temp={temp} id={id} pop={pop} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Hourly;
