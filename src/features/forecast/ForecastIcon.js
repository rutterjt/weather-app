import React from 'react';

import Rainbow from '../../images/rainbow.svg';

// TODO: grab image by code/time

const ForecastIcon = () => {
  return (
    <div className="max-w-[3rem] border-none mr-2">
      <img
        src={Rainbow}
        alt=""
        className="max-w-full h-auto block border-none"
      />
    </div>
  );
};

export default ForecastIcon;
