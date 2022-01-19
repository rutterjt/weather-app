import React from 'react';

// styled components
import styled from 'styled-components';

// utils
import get from 'lodash/get';

// redux
import { useSelector } from 'react-redux';

import {
  selectTimeOfDay,
  selectWeatherCode,
} from '../features/weather/weatherSlice';

// helpers
import { isInRange } from '../helpers/utils';

/*
The background color depends on the time of day and current weather event's code:
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

/**
 * Array containing mappings of color strings to 'cases'.
 *
 * Each case is a scenario in which the color string should apply.
 *
 * The case can include either/both: an array of times (of 'day', 'twilight', or 'night'), and an array of ranges (each a subarray representing a range of color codes )
 *
 */
const colors = [
  {
    color: 'lightBlue',
    cases: [{ times: ['day'], ranges: [[800, 804]] }],
  },
  {
    color: 'yellow',
    cases: [{ times: ['twilight'], ranges: [[800, 804]] }],
  },
  {
    color: 'darkBlue',
    cases: [
      {
        times: ['night'],
        ranges: [
          [800, 804],
          [300, 510],
          [512, 599],
        ],
      },
    ],
  },
  {
    color: 'green',
    cases: [{ times: ['twilight', 'day'], ranges: [[700, 799]] }],
  },
  {
    color: 'purple',
    cases: [
      { times: ['night'], ranges: [[700, 799]] },
      { ranges: [[200, 299]] },
    ],
  },
  {
    color: 'cyan',
    cases: [{ times: ['day', 'twilight'], ranges: [[600, 699], [511]] }],
  },
  {
    color: 'darkCyan',
    cases: [{ times: ['night'], ranges: [[600, 699], [511]] }],
  },
  {
    color: 'medBlue',
    cases: [
      {
        times: ['day', 'twilight'],
        ranges: [
          [300, 510],
          [512, 599],
        ],
      },
    ],
  },
];

// Styled components
const Wrapper = styled.div`
  overflow: hidden;
  min-height: 100vh;
  height: 100%;
  width: 100%;

  background: ${(props) =>
    get(props.theme.gradients, `${props.color}`, '#fff')};
  color: ${(props) => get(props.theme.palette, `${props.color}.text`, '#000')};
`;

/**
 * Wrapper component for the app's background color.
 *
 * Selects the current weather code and time of day, and sets the app's background color and color based on those factors.
 */
const Background = ({ children }) => {
  const weatherCode = useSelector(selectWeatherCode);
  const timeOfDay = useSelector(selectTimeOfDay);

  console.group('Weather info');
  console.log('Weather Code:', weatherCode);
  console.log('Time of Day:', timeOfDay);
  console.groupEnd();

  // Default to 'lightBlue' background if no weather code or time of day
  if (!weatherCode || !timeOfDay) {
    return <Wrapper color={'lightBlue'}>{children}</Wrapper>;
  }

  // deciding on background color

  // helper functions
  const isInWeatherRange = ({ ranges }) => ranges.some(isInRange(weatherCode));
  const isTimeOfDay = ({ times }) =>
    times ? times.indexOf(timeOfDay) !== -1 : true;
  const caseMatches = (testCase) =>
    isTimeOfDay(testCase) && isInWeatherRange(testCase);
  const isCorrectColor = ({ cases }) => cases.some(caseMatches);

  const color = colors.find(isCorrectColor);
  const bg = get(color, 'color', 'lightBlue'); // fall back to lightblue if there was an error (e.g., timeOfDay/weatherCode combo does not yield a color, or the color object is missing a color key)
  console.log('Color:', bg);

  return <Wrapper color={bg}>{children}</Wrapper>;
};

export default Background;
