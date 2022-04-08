import React from 'react';

import PropTypes from 'prop-types';

/**
 * Renders a spinner component to display during loading times.
 *
 * @param {string} size - (Optional) the spinner size, one of: 'sm', 'md', 'lg'. Defaults to 'md'.
 */
const Spinner = ({ size }) => {
  const diameter =
    size === 'sm'
      ? 'w-[2rem] h-[2rem]'
      : size === 'md'
      ? 'w-[3rem] h-[3rem]'
      : 'w-[5rem] h-[5rem]';
  return (
    <div
      className={`rounded-full border-4 border-transparent border-t-white animate-spin ${diameter}`}
    />
  );
};

Spinner.defaultProps = {
  color: 'white',
  size: 'md',
};

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Spinner;
