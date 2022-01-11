import React from 'react';

// styled components
import styled from 'styled-components';

// utils
import get from 'lodash/get';
import { isInRange } from 'helpers/utils';

// styles
import { gradients } from 'styles/palette';

/*
The background color depends on the time of day and current weather event:
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

// maps background colors to 'case' objects
// each case represents a scenario in which the background color renders
// the case can include either/both: a time array (of 'day', 'twilight', or 'night'), and a range array (of subarrays representing ranges of weatherIDs)
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
    bg: 'linear-gradient(135deg, #4d9ecc, #28678b)',
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

const Wrapper = styled.div`
  overflow: hidden;
  min-height: 100vh;
  height: 100%;
  width: 100%;

  background: ${(props) => gradients[props.color]};
`;

const Background = ({ weatherID, timeOfDay, children }) => {
  // curried function: takes a test callback function, returns a function that takes a cases array, which returns whether any of the cases array pass the test function

  const isInWeatherRange = ({ ranges }) => ranges.some(isInRange(weatherID));
  const isTimeOfDay = ({ times }) =>
    times ? times.indexOf(timeOfDay) !== -1 : true;
  const caseMatches = (testCase) =>
    isTimeOfDay(testCase) && isInWeatherRange(testCase);
  const isCorrectColor = ({ cases }) => cases.some(caseMatches);

  const color = colors.find(isCorrectColor);

  const bg = get(color.bg, 'linear-gradient(135deg, #00d5ff, #00a7c9)');

  return <Wrapper color={bg}>{children}</Wrapper>;
};

export default Background;
