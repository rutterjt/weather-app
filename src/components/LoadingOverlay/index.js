import React from 'react';

import * as s from './LoadingOverlay.module.css';

import Spinner from 'components/Spinner';

const LoadingOverlay = () => {
  return (
    <div className={s.wrapper}>
      <Spinner />
    </div>
  );
};

export default LoadingOverlay;
