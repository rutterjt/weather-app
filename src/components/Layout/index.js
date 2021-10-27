import React from 'react';

import * as s from './Layout.module.css';

// import Wrapper from 'components/Wrapper';

// components
import Background from 'components/Background';

const Layout = ({ weatherID, timeOfDay, children }) => {
  return (
    <div className={s.wrapper}>
      <Background weatherID={weatherID} timeOfDay={timeOfDay}>
        <div className={s.content}>{children}</div>
      </Background>
    </div>
  );
};

export default Layout;
