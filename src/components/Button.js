import React from 'react';

import styled from 'styled-components';

import get from 'lodash/get';

import PropTypes from 'prop-types';

const StyledButton = styled.button`
  color: #000000;
  background-color: #ffffff;
  position: relative;
  padding: 1.25rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 10px 10px rgba(0, 0, 0, 0.12);
  transition: all 0.2s;
  font-weight: bold;
  overflow: hidden;
  cursor: pointer;
  line-height: 1;
  white-space: no-wrap;
  width: 100%;
  height: 3.5rem;

  &:active {
    transform: translateY(2px);
  }

  &:hover {
    background-color: #ffffff;
  }
`;

export const FilledButton = styled(StyledButton)`
  color: ${(props) => get(props.theme.palette, `${props.color}.text`, '#000')};
  background-color: ${(props) =>
    get(props.theme.palette, `${props.color}.light`, '#fff')};
  &:hover {
    background-color: ${(props) =>
      get(props.theme.palette, `${props.color}.dark`, '#fff')};
  }
`;

export const OutlinedButton = styled(StyledButton)`
  border: 2px solid transparent;
  border-color: ${(props) =>
    get(props.theme.palette, `${props.color}.light`, '#fff')};
  color: ${(props) => get(props.theme.palette, `${props.color}.light`, '#fff')};
  &:hover {
    border-color: ${(props) =>
      get(props.theme.palette, `${props.color}.dark`, '#fff')};
    color: ${(props) =>
      get(props.theme.palette, `${props.color}.dark`, '#fff')};
  }
`;

/**
 * Renders a button with some basic styling. Passes all props through to the underlying HTML button.
 * 
 * @param {string} color - (Optional) a theme color, defaults to white.
 * @param {string} variant - (Optional) whether the button should be 'outlined' or 'filled'. Defaults to 'filled'.

 */
const Button = ({ children, color, variant, ...rest }) => {
  if (variant === 'outlined')
    return (
      <OutlinedButton color={color} {...rest}>
        {children}
      </OutlinedButton>
    );
  return (
    <FilledButton color={color} {...rest}>
      {children}
    </FilledButton>
  );
};

Button.defaultProps = {
  color: 'white',
  variant: 'filled',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'filled']),
};

export default Button;
