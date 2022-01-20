import React from 'react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectWeatherCode, selectTimeOfDay } from './weatherSlice.js';

import { isInRange } from '../../helpers/utils';

import {
  Thunderstorm,
  Rain,
  Mix,
  Snow,
  Hail,
  Fog,
  Sun,
  MoonStars,
  SunClouds,
  MoonClouds,
  LightClouds,
  HeavyClouds,
  Rainbow,
} from '../../images';

/**
 * Array of objects mapping a weather icon to a range of weatherIDs and times of day.
 */
const icons = [
  { icon: <Thunderstorm />, ranges: [[200, 299]] },
  {
    icon: <Rain />,
    ranges: [
      [300, 510],
      [512, 599],
    ],
  },
  {
    icon: <Mix />,
    ranges: [
      [511, 511],
      [614, 616],
    ],
  },
  {
    icon: <Snow />,
    ranges: [
      [600, 610],
      [617, 699],
    ],
  },
  { icon: <Hail />, ranges: [[611, 613]] },
  { icon: <Fog />, ranges: [[700, 799]] },
  { icon: <Sun />, ranges: [[800, 800]], time: ['day', 'twilight'] },
  { icon: <MoonStars />, ranges: [[800, 800]], time: ['night'] },
  { icon: <SunClouds />, ranges: [[801, 802]], time: ['day', 'twilight'] },
  { icon: <MoonClouds />, ranges: [[801, 802]], time: 'night' },
  { icon: <LightClouds />, ranges: [[803, 803]] },
  { icon: <HeavyClouds />, ranges: [[804, 804]] },
];

// styled components
const Wrapper = styled.div`
  width: 100%;
  max-width: 450px;
  margin: auto;

  & svg {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
`;

/**
 * Renders a weather icon based on the current weatherCode and timeOfDay
 */
const WeatherImage = () => {
  const weatherCode = useSelector(selectWeatherCode);
  const timeOfDay = useSelector(selectTimeOfDay);

  // helper functions
  const isInWeatherRange = ({ ranges }) => ranges.some(isInRange(weatherCode));
  const isTimeOfDay = ({ time }) =>
    time ? time.indexOf(timeOfDay) !== -1 : true;
  const isCorrectIcon = (mapObj) =>
    isInWeatherRange(mapObj) && isTimeOfDay(mapObj);

  const correctIcon = icons.find(isCorrectIcon);
  // const src = correctIcon ? correctIcon.icon : Rainbow;

  return <Wrapper>{correctIcon ? correctIcon.icon : <Rainbow />}</Wrapper>;
};

export default WeatherImage;
