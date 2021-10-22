import React from 'react';

import s from './Wrapper.module.css';

/*

Reference for the status codes provcodeed by the OpenWeathermap API.
Source: https://openweathermap.org/weather-conditions

2xx   Thunderstorm
3xx   Drizzle
5xx   Rain
  511   Freezing Rain
6xx   Snow
  611   Sleet
  612   Light shower sleet
  613   Shower sleet
  615   Light rain and snow
  616   Rain and snow
7xx   Atmosphere
800   Clear
80x   Clouds
  803   Broken clouds 51-84%
  804   Overcast clouds 85-100%

*/

/*

Color reference:
- lightBlue
- medBlue
- darkBlue
- cyan
- darkCyan
- yellow
- purple
- green

*/

/*

The background color depends on the time of day and current weather event

800-804 && Day: lightBlue
800-804 && Twilight: yellow
800-804 && Night: darkBlue
700-799 && Day | Twilight: green
700-799 && Night: purple
600-699 && Day | Twilight: cyan
600-699 && Night: darkCyan
300-599 && Day | Twilight: medBlue
  Except: 
    511 && Day | Twilight: cyan
    511 && Night: darkCyan
300-599 && Night: darkBlue
200-299: purple 

*/

const Wrapper = ({ timeOfDay = 'day', code = 800, children }) => {
  let color;

  // probably a more elegant way to do this, but this'll do for the moment
  if (code >= 800) {
    color =
      timeOfDay === 'day'
        ? 'lightBlue'
        : timeOfDay === 'twilight'
        ? 'yellow'
        : 'darkBlue';
  } else if (code >= 700) {
    color = timeOfDay === 'night' ? 'purple' : 'green';
  } else if (code >= 600 || code === 511) {
    color = timeOfDay === 'night' ? 'darkCyan' : 'cyan';
  } else if (code >= 300) {
    color = timeOfDay === 'night' ? 'darkBlue' : 'medBlue';
  } else if (code >= 200) {
    color = 'purple';
  } else {
    color = 'lightBlue';
  }

  return (
    <div className={s[color]}>
      <div className={s.content}>{children}</div>
    </div>
  );
};

export default Wrapper;
