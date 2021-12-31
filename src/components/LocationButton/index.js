import React from 'react';

// font awesome
import { FaLocationArrow } from 'react-icons/fa';

// styled components
import { Button } from './LocationButton.styles';

const LocationButton = ({ label, callback }) => {
  return (
    <Button onClick={callback}>
      {label}{' '}
      <FaLocationArrow style={{ display: 'block', marginLeft: '0.25rem' }} />
    </Button>
  );
};

export default LocationButton;
