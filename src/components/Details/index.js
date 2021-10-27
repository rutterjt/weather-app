import React from 'react';

// styles
import * as s from './Details.module.css';

// helpers
import { getDayOfWeek, getHourAndMinute, getMonthName } from 'helpers/date';
import { getWindDirection } from 'helpers/format';
import { getInHg, mmToIn } from 'helpers/format';

// helper component: renders styled symbol for degrees fahrenheit,
const F = () => {
  return (
    <span>
      ° <span className={s.degreesScale}>F</span>
    </span>
  );
};

const Details = ({ weather, main, sys, wind, clouds, rain, snow }) => {
  const { description } = weather[0];
  const { temp, feels_like: feelsLike, pressure, humidity } = main;
  const { sunrise, sunset } = sys;
  const { speed: windSpeed, deg: windDirection, gust } = wind;
  const { all: cloudCover } = clouds;
  const today = new Date();
  const now = today / 1000;

  const has = (prop) => prop !== undefined;

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Today's Details</h2>
      <ul className={s.list}>
        <li>
          <div>
            {getDayOfWeek(now)}, {getMonthName(now)} {today.getDate()},{' '}
            {getHourAndMinute(now)}.
          </div>
          <div>
            Currently {Math.round(temp)}
            <F />, {description}.
          </div>
        </li>
        <li className={s.flexLi}>
          <div className={s.liBox}>
            <span>Sunrise:</span>
            <span>{getHourAndMinute(sunrise)}</span>
          </div>
          <div className={s.liBox}>
            <span>Sunset:</span>
            <span>{getHourAndMinute(sunset)}</span>
          </div>
        </li>
      </ul>

      <h3 className={s.subtitle}>Current Conditions</h3>
      <ul className={s.detailsList}>
        {has(temp) && (
          <li>
            <span>Temperature: </span>
            <span>
              {Math.round(temp)}
              <F />
            </span>
          </li>
        )}
        {has(feelsLike) && (
          <li>
            <span>Feels Like: </span>
            <span>
              {Math.round(feelsLike)}
              <F />
            </span>
          </li>
        )}
        {has(humidity) && (
          <li>
            <span>Humidity: </span>
            <span>{humidity}%</span>
          </li>
        )}
        {has(rain) && has(rain['1h']) && (
          <li>
            <span>Rainfall (last hour): </span>
            <span>{mmToIn(rain['1h'])}in</span>
          </li>
        )}
        {has(snow) && has(snow['1h']) && (
          <li>
            <span>Snowfall (last hour): </span>
            <span>{mmToIn(snow['1h'])}in</span>
          </li>
        )}

        {has(windSpeed) && (
          <li>
            <span>Wind: </span>
            <span>
              {windDirection && getWindDirection(windDirection)}, {windSpeed}{' '}
              mph
            </span>
          </li>
        )}
        {has(gust) && (
          <li>
            <span>Wind Gusts: </span>
            <span>{gust} mph</span>
          </li>
        )}
        {has(pressure) && (
          <li>
            <span>Pressure: </span>
            <span>{Math.round(getInHg(pressure) * 100) / 100} inHg</span>
          </li>
        )}
        {has(cloudCover) && (
          <li>
            <span>Cloud cover: </span>
            <span>{cloudCover}%</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Details;
