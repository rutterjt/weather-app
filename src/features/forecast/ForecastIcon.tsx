import React from 'react';

// helper functions
import { isInRange } from '../../helpers/utils';

import {
  WiThunderstorm,
  WiRain,
  WiRainMix,
  WiSnow,
  WiHail,
  WiFog,
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiAlien,
} from 'react-icons/wi';

type Range = number[];
type Time = 'day' | 'twilight' | 'night';
type Icon = {
  icon: React.ReactElement;
  ranges: Range[];
  time?: Time[];
};

/**
 * Array of objects mapping a weather icon to a range of weatherIDs and times of day.
 */
const icons: Icon[] = [
  { icon: <WiThunderstorm />, ranges: [[200, 299]] },
  {
    icon: <WiRain />,
    ranges: [
      [300, 510],
      [512, 599],
    ],
  },
  {
    icon: <WiRainMix />,
    ranges: [
      [511, 511],
      [614, 616],
    ],
  },
  {
    icon: <WiSnow />,
    ranges: [
      [600, 610],
      [617, 699],
    ],
  },
  { icon: <WiHail />, ranges: [[611, 613]] },
  { icon: <WiFog />, ranges: [[700, 799]] },
  { icon: <WiDaySunny />, ranges: [[800, 800]], time: ['day', 'twilight'] },
  { icon: <WiNightClear />, ranges: [[800, 800]], time: ['night'] },
  { icon: <WiDayCloudy />, ranges: [[801, 802]], time: ['day', 'twilight'] },
  { icon: <WiNightAltCloudy />, ranges: [[801, 802]], time: ['night'] },
  { icon: <WiCloud />, ranges: [[803, 803]] },
  { icon: <WiCloudy />, ranges: [[804, 804]] },
];

type Props = {
  weatherCode: number | undefined;
  timeOfDay: Time;
};

export const ForecastIcon: React.FC<Props> = ({
  weatherCode = 800,
  timeOfDay = 'day',
}) => {
  // helper functions
  const isInWeatherRange = ({ ranges }: Icon) =>
    ranges.some(isInRange(weatherCode));
  const isTimeOfDay = ({ time }: Icon) =>
    time ? time.indexOf(timeOfDay) !== -1 : true;
  const isCorrectIcon = (icon: Icon) =>
    isInWeatherRange(icon) && isTimeOfDay(icon);

  const correct = icons.find(isCorrectIcon);
  const correctIcon = correct ? correct.icon : <WiAlien />;

  return <div className="text-2xl border-none mr-2">{correctIcon} </div>;
};
