import React from 'react';

import * as s from './LocationButton.module.css';

import { FaLocationArrow } from 'react-icons/fa';

const LocationButton = ({ label, callback }) => {
  return (
    <button className={s.btn} onClick={callback}>
      {label} <FaLocationArrow className={s.icon} />
    </button>
  );
};

export default LocationButton;
