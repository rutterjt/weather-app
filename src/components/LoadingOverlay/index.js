import React from 'react';

// styled components
import { Wrapper } from './LoadingOverlay.styles';

// components
import Spinner from 'components/Spinner';

const LoadingOverlay = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default LoadingOverlay;
