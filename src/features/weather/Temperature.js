import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a formatted temperature value.
 *
 * @param {string} scale - (Optional) Whether Fahrenheit (F) or Celsius (C). Defaults to F.
 */
const Temperature = ({ children, scale }) => {
  return (
    <span
      aria-label={`${children} degrees ${
        scale === 'F' ? 'Fahrenheit' : 'Celsius'
      }`}
      className="font-number"
    >
      {Math.round(children)}°<span className="text-[0.8em]">{scale}</span>
    </span>
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
