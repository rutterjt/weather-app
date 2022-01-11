import React from 'react';

// utils
import { isInRange } from 'helpers/utils';

// image imports
import Thunderstorm from 'images/thunderstorm.svg';
import Rain from 'images/rain.svg';
import Mix from 'images/mix.svg';
import Snow from 'images/snow.svg';
import Hail from 'images/hail.svg';
import Fog from 'images/fog.svg';
import Sun from 'images/sun.svg';
import MoonStars from 'images/moon-stars.svg';
import SunClouds from 'images/sun-clouds.svg';
import MoonClouds from 'images/moon-clouds.svg';
import LightClouds from 'images/light-clouds.svg';
import HeavyClouds from 'images/heavy-clouds.svg';
import Rainbow from 'images/rainbow.svg';

// array of objects mapping a weather icon to a range of weatherIDs and times of day
// range: an array containing one or more sub-arrays each representing a range of weatherIDs that map to the icon
// prettier-ignore
const icons = [
  { icon: Thunderstorm, ranges: [[200, 299]] },
  { icon: Rain, ranges: [[300, 510], [512, 599]] },
  { icon: Mix, ranges: [[511, 511], [614, 616]] },
  { icon: Snow, ranges: [[600, 610], [617, 699]] },
  { icon: Hail, ranges: [[611, 613]] },
  { icon: Fog, ranges: [[700, 799]] },
  { icon: Sun, ranges: [[800, 800]], time: ['day', 'twilight'] },
  { icon: MoonStars, ranges: [[800, 800]], time: ['night'] },
  { icon: SunClouds, ranges: [[801, 802]], time: ['day', 'twilight'] },
  { icon: MoonClouds, ranges: [[801, 802]], time: 'night' },
  { icon: LightClouds, ranges: [[803, 803]] },
  { icon: HeavyClouds, ranges: [[804, 804]] },
];

const WeatherImage = ({ weatherID = 800, timeOfDay = 'day' }) => {
  const isInWeatherRange = ({ ranges }) => ranges.some(isInRange(weatherID));
  const isTimeOfDay = ({ time }) =>
    time ? time.indexOf(timeOfDay) !== -1 : true;
  const isCorrectIcon = (mapObj) =>
    isInWeatherRange(mapObj) && isTimeOfDay(mapObj);

  const correctIcon = icons.find(isCorrectIcon);
  const src = correctIcon ? correctIcon.icon : Rainbow;

  return <img src={src} alt={`Illustration of the current weather event`} />;
};

export default WeatherImage;
