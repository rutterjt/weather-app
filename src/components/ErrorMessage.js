import React, { useEffect, useRef, useCallback } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledErrorMessage = styled.div`
  position: relative;
  margin-top: 0.5rem;
  background-color: #fff;
  color: #000;
  width: auto;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 2px solid ${(props) => props.theme.palette.yellow.light};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 10px 10px rgba(0, 0, 0, 0.12);

  &::before {
    content: '';
    position: absolute;
    top: -0.5rem;
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid ${(props) => props.theme.palette.yellow.light};
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
  }
`;

const ErrorMessage = ({ open, handleClose, children }) => {
  const componentRef = useRef(null);

  // setting/unsetting the click-away listener
  const checkClose = useCallback(
    (e) => {
      // only close the message if the click target is not the same node as the message
      if (e.target !== componentRef.current) handleClose();
    },
    [componentRef, handleClose]
  );
  useEffect(() => {
    const clearListener = () =>
      document.body.removeEventListener('click', checkClose);
    if (open) {
      // set the event listener when the box is open
      document.body.addEventListener('click', checkClose);
    } else {
      // clear the event listener when the box is closed
      clearListener();
    }
    // clear on unmount
    return () => clearListener();
  }, [open, checkClose]);

  if (open) {
    return (
      <StyledErrorMessage ref={componentRef}>{children}</StyledErrorMessage>
    );
  } else {
    return null;
  }
};

ErrorMessage.defaultProps = {
  open: false,
};

ErrorMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
