import React, { useEffect, useRef, useCallback } from 'react';

import PropTypes from 'prop-types';

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
      <div
        className="relative mt-2 bg-white text-black w-auto p-2 rounded border-2 border-yellow-light shadow-lg before:absolute before:-top-2 before:w-0 before:h-0 before:border-l-[0.5rem] before:border-l-transparent before:border-r-[0.5rem] before:border-r-transparent before:border-b-[0.5rem] before:border-b-yellow-light rounded-t"
        ref={componentRef}
      >
        {children}
      </div>
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
  children: PropTypes.node,
};

export default ErrorMessage;
