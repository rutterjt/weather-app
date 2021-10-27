import React from 'react';

// styles
import * as s from './Details.module.css';

// helpers
import { getDayOfWeek, getHourAndMinute, getMonthName } from 'helpers/date';
import { getWindDirection } from 'helpers/format';
import { getInHg } from 'helpers/format';

const F = () => {
  return (
    <span>
      ° <span className={s.degreesScale}>F</span>
    </span>
  );
};

const Details = ({ weather, main, sys, wind, clouds }) => {
  const { description } = weather[0];
  const { temp, feels_like: feelsLike, pressure, humidity } = main;
  const { sunrise, sunset } = sys;
  const { speed: windSpeed, deg: windDirection, gust } = wind;
  const { all: cloudCover } = clouds;
  const today = new Date();
  const now = today / 1000;

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <h2 className={s.title}>Today's Details</h2>
        <ul className={s.list}>
          <li>
            {getDayOfWeek(now)}, {getMonthName(now)} {today.getDate()},{' '}
            {getHourAndMinute(now)}
          </li>
          <li>
            Currently {Math.round(temp)}
            <F />, {description}.
          </li>
          <li>Sunrise: {getHourAndMinute(sunrise)}</li>
          <li>Sunset: {getHourAndMinute(sunset)}</li>
        </ul>

        <h3 className={s.subtitle}>Current Conditions</h3>
        <ul className={s.detailsList}>
          {temp && (
            <li>
              <span>Temperature: </span>
              <span>
                {Math.round(temp)}
                <F />
              </span>
            </li>
          )}
          {feelsLike && (
            <li>
              <span>Feels Like: </span>
              <span>
                {Math.round(feelsLike)}
                <F />
              </span>
            </li>
          )}
          {windSpeed && (
            <li>
              <span>Wind: </span>
              <span>
                {windDirection && getWindDirection(windDirection)}, {windSpeed}{' '}
                mph
              </span>
            </li>
          )}
          {gust && (
            <li>
              <span>Wind Gusts: </span>
              <span>{gust} mph</span>
            </li>
          )}
          {humidity && (
            <li>
              <span>Humidity: </span>
              <span>{humidity}%</span>
            </li>
          )}
          {pressure && (
            <li>
              <span>Pressure: </span>
              <span>{Math.round(getInHg(pressure) * 100) / 100} inHg</span>
            </li>
          )}
          {cloudCover && (
            <li>
              <span>Cloud cover: </span>
              <span>{cloudCover}%</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Details;
