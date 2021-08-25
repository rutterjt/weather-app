import React from 'react';

// image imports
import LightClouds from 'images/light-clouds.svg';
import Fog from 'images/fog.svg';
import Hail from 'images/hail.svg';
import HeavyClouds from 'images/heavy-clouds.svg';
import Rain from 'images/rain.svg';
import Mix from 'images/mix.svg';
import MoonClouds from 'images/moon-clouds.svg';
import MoonStars from 'images/moon-stars.svg';
import Snow from 'images/snow.svg';
import SunClouds from 'images/sun-clouds.svg';
import Sun from 'images/sun.svg';
import ThunderstormDark from 'images/thunderstorm-dark.svg';
// import Thunderstorm from 'images/thunderstorm.svg';
import Rainbow from 'images/rainbow.svg';

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

The current weather event will depend on: the status code, and the time of day 

ThunderstormDark: 200-299
Rain: 301-599
  Except Mix: 511
Snow: 600-699
  Except:
    Hail: 611-613
    Mix: 615-616
Fog: 700-799
Sun: 800 (day, twilight)
MoonStars: 800 (night)
SunClouds: 801-802 (day, twilight)
MoonClouds: 801-802 (night)
LightClouds: 801-802
HeavyClouds: 803-804

*/

const WeatherImage = ({
  code = 800,
  description = '',
  timeOfDay = 'day',
  className,
}) => {
  let src;
  // probably a better way to do this, but this'll do for now
  if (code === 804) {
    src = HeavyClouds;
  } else if (code === 803) {
    src = LightClouds;
  } else if (code === 802 || code === 801) {
    if (timeOfDay === 'night') {
      src = MoonClouds;
    } else {
      src = SunClouds;
    }
  } else if (code === 800) {
    if (timeOfDay === 'night') {
      src = MoonStars;
    } else {
      src = Sun;
    }
  } else if (code >= 700) {
    src = Fog;
  } else if (code >= 600) {
    if (code === 616 || code === 615) {
      src = Mix;
    } else if (code >= 611 && code <= 613) {
      src = Hail;
    } else {
      src = Snow;
    }
  } else if (code >= 300) {
    if (code === 511) {
      src = Mix;
    } else {
      src = Rain;
    }
  } else if (code >= 200) {
    src = ThunderstormDark;
  } else {
    src = Rainbow;
  }
  return (
    <img
      src={src}
      alt={`Illustration of the current weather event ${description}`}
      className={className}
    />
  );
};

export default WeatherImage;
