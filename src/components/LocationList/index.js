import React from 'react';

import * as s from './LocationList.module.css';

import { isEmpty } from 'helpers/utils';

const LocationList = ({ locations, setLocation }) => {
  const set = ({ latitude, longitude }) => setLocation({ latitude, longitude });

  if (!isEmpty(locations)) {
    return (
      <ul className={s.list}>
        {locations.map((location, index) => {
          const { label } = location;
          return (
            <li key={index} className={s.item}>
              <button onClick={() => set(location)} className={s.btn}>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
};

export default LocationList;
