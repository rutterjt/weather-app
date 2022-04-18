import React from 'react';

// date helper
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';
import differenceInDays from 'date-fns/differenceInDays';

// redux
import { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';
import { selectForecastById } from './forecastSlice';
import { selectSunrise, selectSunset } from '../weather/weatherSlice';

// components
import { Temperature } from '../weather/Temperature';
import { ForecastIcon } from './ForecastIcon';

type Props = {
  id: EntityId;
};

export const ForecastItem: React.FC<Props> = ({ id }) => {
  const forecast = useAppSelector((state) => selectForecastById(state, id));
  const sunrise = useAppSelector(selectSunrise);
  const sunset = useAppSelector(selectSunset);

  if (!forecast) return null;
  const { time, description, temp, code } = forecast;

  if (!time || !code || !sunrise || !sunset) return null;

  // the problem: convert time to 'day' or 'night' depending on whether time is before or after sunset/sunrise
  // we do not know sunset/sunrise for each given day. because we the forecast only has a granularity of 3 hours, you can just use the sunrise/sunset values of the current day

  /*

  Given: 
  - currentTime: number = ms unix time
  - sunriseToday: number = ms unix time
  - sunsetToday: number = ms unix time
  - time: number = ms unix time

  If time is today:
  - If time > sunsetToday: return night
  - If time > sunriseToday: return day;
  - return night

  If time is tomorrow:
  - If time > 1 day + sunsetToday: return night
  - If time > 1 day + sunriseToday: return day
  - return night

  If we can detect how many calendar days past today it is (d); then the sunset/sunrise for that day is d day + sunsetToday/sunriseToday.

  If today, then d is 0, so 0  day + sunsetToday/sunriseToday = sunsetToday/sunriseToday


  */

  const evaluateTimeOfDay = (
    time: number,
    sunrise: number,
    sunset: number
  ): 'day' | 'night' => {
    console.log(time, sunrise, sunset);
    if (time > sunset || time < sunrise) return 'night';
    return 'day';
  };

  const getTimeOfDay = (time: number, sunrise: number, sunset: number) => {
    if (isToday(time)) return evaluateTimeOfDay(time, sunrise, sunset);
    // grab the current date
    const now = Date.now();
    // figure out how many days difference there is between the time of the forecast and now
    // need to add 1 to the result, because differenceInDays rounds down to the nearest day. Because we know that the first day we are checking must be tomorrow (because we already controlled for today), and we know that
    const difference = differenceInDays(time, now) + 1;

    return evaluateTimeOfDay(
      time,
      addDays(sunrise, difference).getTime(),
      addDays(sunset, difference).getTime()
    );
  };

  const timeOfDay = getTimeOfDay(time, sunrise, sunset);

  return (
    <li className="py-3 mb-2 border-b-[1px] border-b-black/30 last-of-type:border-b-0 flex flex-col justify-between items-start">
      {time && (
        <span className="block mb-2 text-sm text-black/80 pt-0">
          {format(time, 'h a, EEEE')}
        </span>
      )}
      <div className="flex w-full justify-between space-x-4 items-center">
        <div className="flex items-center">
          <ForecastIcon weatherCode={800} timeOfDay={timeOfDay} />
          {description}
        </div>
        {temp && (
          <div className="flex items-center">
            <Temperature value={temp} />
          </div>
        )}{' '}
      </div>
    </li>
  );
};
