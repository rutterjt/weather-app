import React from 'react';

import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import get from 'lodash/get';

const rotate = keyframes`
    from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  border-radius: 50%;
  border: 4px solid transparent;
  border-top: 4px solid
    ${(props) =>
      get(
        props.theme.palette,
        `${props.color}.light`,
        props.theme.palette.white.light
      )};
  animation: ${rotate} 1s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
`;

/**
 * Renders a spinner component to display during loading times.
 *
 * @param {string} color - (Optional) a theme color value. Defaults to 'white'.
 * @param {string} size - (Optional) the spinner size, one of: 'sm', 'md', 'lg'. Defaults to 'md'.
 */
const Spinner = ({ color, size }) => {
  const diameter = size === 'sm' ? '2rem' : size === 'md' ? '3rem' : '5rem';
  return <StyledSpinner color={color} size={diameter} />;
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
