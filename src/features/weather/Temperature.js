import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

export const BaseTemp = styled.span`
  font-family: 'Nunito';
`;

const TempScale = styled.span`
  font-size: 0.8em;
`;

/**
 * Renders a formatted temperature value.
 *
 * @param {string} scale - (Optional) Whether Fahrenheit (F) or Celsius (C). Defaults to F.
 */
const Temperature = ({ children, scale }) => {
  return (
    <BaseTemp
      aria-label={`${children} degrees ${
        scale === 'F' ? 'Fahrenheit' : 'Celsius'
      }`}
    >
      {Math.round(children)}°<TempScale>{scale}</TempScale>
    </BaseTemp>
  );
};

Temperature.defaultProps = {
  scale: 'F',
};

Temperature.propTypes = {
  children: PropTypes.number.isRequired,
  scale: PropTypes.oneOf(['F', 'C']).isRequired,
};

export default Temperature;
