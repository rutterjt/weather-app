import React, { useState } from 'react';

// helper functions
import { getTimeOfDay } from 'helpers/time-of-day';
import { getDegreesF } from 'helpers/temp';
import { getHourAndMinute } from 'helpers/date';

// styles
import s from './Overview.module.css';

// components
import WeatherImage from 'components/WeatherImage';
import {
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

const Overview = ({ forecast, alert }) => {
  const [alertOpen, setAlertOpen] = useState(false);

  const code = forecast.weather[0].id;
  const timeOfDay = getTimeOfDay(forecast.sunrise, forecast.sunset);
  const temp = getDegreesF(forecast.temp);
  const feelsLike = getDegreesF(forecast['feels_like']);
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <WeatherImage code={code} timeOfDay={timeOfDay} className={s.image} />
        <h2 className={s.temp} aria-label={`${s.temp} degrees`}>
          {temp}°
        </h2>
        <h3 className={s.feelsLike}>Feels like: {feelsLike}°</h3>
        {alert && (
          <div className={s.alertWrapper}>
            <button
              className={s.alertButton}
              aria-label="Open information about the weather alert"
              onClick={() => setAlertOpen(!alertOpen)}
            >
              <FaExclamationTriangle /> <span>{alert.event}</span>
              {alertOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {alertOpen && (
              <div className={s.alert}>
                <h3 className={s.alertTitle}>
                  {alert.event} until {getHourAndMinute(alert.end)}
                </h3>
                <p>Issued by: {alert['sender_name']}</p>
                <p>Start: {getHourAndMinute(alert.start)}</p>
                <p>End: {getHourAndMinute(alert.end)}</p>
                <p>Description: {alert.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
