import React from 'react';

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

type Range = number[];
type Time = 'day' | 'night' | 'twilight';
type Case = {
  times?: Time[];
  ranges?: Range[];
};
type Color = {
  color: string;
  cases: Case[];
};

/**
 * Array containing mappings of color strings to 'cases'.
 *
 * Each case is a scenario in which the color string should apply.
 *
 * The case can include either/both: an array of times (of 'day', 'twilight', or 'night'), and an array of ranges (each a subarray representing a range of color codes )
 *
 */
const colors: Color[] = [
  {
    color: 'from-lightBlue-light to-lightBlue-dark text-lightBlue-text',
    cases: [{ times: ['day'], ranges: [[800, 804]] }],
  },
  {
    color: 'from-yellow-light to-yellow-dark text-yellow-text',
    cases: [{ times: ['twilight'], ranges: [[800, 804]] }],
  },
  {
    color: 'from-darkBlue-light to-darkBlue-dark text-darkBlue-text',
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
    color: 'from-green-light to-green-dark text-green-text',
    cases: [{ times: ['twilight', 'day'], ranges: [[700, 799]] }],
  },
  {
    color: 'from-purple-light to-purple-dark text-purple-text',
    cases: [
      { times: ['night'], ranges: [[700, 799]] },
      { ranges: [[200, 299]] },
    ],
  },
  {
    color: 'from-cyan-light to-cyan-dark text-cyan-text',
    cases: [{ times: ['day', 'twilight'], ranges: [[600, 699], [511]] }],
  },
  {
    color: 'from-darkCyan-light to-darkCyan-dark text-darkCyan-text',
    cases: [{ times: ['night'], ranges: [[600, 699], [511]] }],
  },
  {
    color: 'from-medBlue-light to-medBlue-dark text-medBlue-text',
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

/**
 * Wrapper component for the app's background color.
 *
 * Selects the current weather code and time of day, and sets the app's background color and color based on those factors.
 */
export const Background: React.FC = ({ children }) => {
  const weatherCode = useSelector(selectWeatherCode);
  const timeOfDay = useSelector(selectTimeOfDay);

  console.group('Weather info');
  console.log('Weather Code:', weatherCode);
  console.log('Time of Day:', timeOfDay);
  console.groupEnd();

  // Default to 'lightBlue' background if no weather code or time of day
  if (!weatherCode || !timeOfDay) {
    <div
      className={`overflow-hidden min-h-screen h-full w-full bg-gradient-to-br from-lightBlue-light to-lightBlue-dark text-lightBlue-text`}
    >
      {children}
    </div>;
  }

  // deciding on background color

  // helper functions
  // TODO: see if I can refactor this. These functions proved to be very confusing on revisiting, and there must be a clearer way to write this
  const isInWeatherRange = ({ ranges }: Case) =>
    ranges && weatherCode ? ranges.some(isInRange(weatherCode)) : false;
  const isTimeOfDay = ({ times }: Case) =>
    times ? times.indexOf(timeOfDay) !== -1 : true;
  const caseMatches = (testCase: Case) =>
    isTimeOfDay(testCase) && isInWeatherRange(testCase);
  const isCorrectColor = ({ cases }: Color) => cases.some(caseMatches);

  const color = colors.find(isCorrectColor);
  const classNames =
    color?.color ||
    'from-lightBlue-light to-lightBlue-dark text-lightBlue-text'; // fall back to lightblue if there was an error (e.g., timeOfDay/weatherCode combo does not yield a color, or the color object is missing a color key)

  return (
    <div
      className={`overflow-hidden min-h-screen h-full w-full bg-gradient-to-br ${classNames}`}
    >
      {children}
    </div>
  );
};
