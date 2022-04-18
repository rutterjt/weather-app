import React from 'react';

// redux
import { useAppSelector } from '../../app/hooks';
import { selectWeatherCode, selectTimeOfDay } from './weatherSlice';

// helper functions
import { isInRange } from '../../helpers/utils';

import Thunderstorm from '../../images/thunderstorm.png';
import Rain from '../../images/rain.png';
import Mix from '../../images/mix.png';
import Snow from '../../images/snow.png';
import Hail from '../../images/hail.png';
import Fog from '../../images/fog.png';
import Sun from '../../images/sun.png';
import MoonStars from '../../images/moon-stars.png';
import SunClouds from '../../images/sun-clouds.png';
import MoonClouds from '../../images/moon-clouds.png';
import LightClouds from '../../images/light-clouds.png';
import HeavyClouds from '../../images/heavy-clouds.png';
import Rainbow from '../../images/rainbow.png';

type Range = number[];
type Time = 'day' | 'twilight' | 'night';
type Icon = {
  src: string;
  ranges: Range[];
  time?: Time[];
};
/**
 * Array of objects mapping a weather icon to a range of weatherIDs and times of day.
 */
const icons: Icon[] = [
  { src: Thunderstorm, ranges: [[200, 299]] },
  {
    src: Rain,
    ranges: [
      [300, 510],
      [512, 599],
    ],
  },
  {
    src: Mix,
    ranges: [
      [511, 511],
      [614, 616],
    ],
  },
  {
    src: Snow,
    ranges: [
      [600, 610],
      [617, 699],
    ],
  },
  { src: Hail, ranges: [[611, 613]] },
  { src: Fog, ranges: [[700, 799]] },
  { src: Sun, ranges: [[800, 800]], time: ['day', 'twilight'] },
  { src: MoonStars, ranges: [[800, 800]], time: ['night'] },
  { src: SunClouds, ranges: [[801, 802]], time: ['day', 'twilight'] },
  { src: MoonClouds, ranges: [[801, 802]], time: ['night'] },
  { src: LightClouds, ranges: [[803, 803]] },
  { src: HeavyClouds, ranges: [[804, 804]] },
];

/**
 * Renders a weather icon based on the current weatherCode and timeOfDay
 */
export const WeatherImage: React.FC = () => {
  const weatherCode = useAppSelector(selectWeatherCode) || 1;
  const timeOfDay = useAppSelector(selectTimeOfDay);

  // helper functions
  const isInWeatherRange = ({ ranges }: Icon) =>
    ranges.some(isInRange(weatherCode));
  const isTimeOfDay = ({ time }: Icon) =>
    time ? time.indexOf(timeOfDay) !== -1 : true;
  const isCorrectIcon = (icon: Icon) =>
    isInWeatherRange(icon) && isTimeOfDay(icon);

  const correctIcon = icons.find(isCorrectIcon);
  const correctSrc = correctIcon ? correctIcon.src : Rainbow;

  return (
    <img
      src={correctSrc}
      alt="Illustration of the current weather"
      className="w-full h-auto max-w-[300px] md:max-w-[450px]"
    />
  );
};
