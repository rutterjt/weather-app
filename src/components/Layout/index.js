import React from 'react';

import * as s from './Layout.module.css';

// import Wrapper from 'components/Wrapper';

// components
import Background from 'components/Background';
import LoadingOverlay from 'components/LoadingOverlay';
import Footer from 'components/Footer';

const Layout = ({
  weatherID,
  timeOfDay,
  loading,
  header,
  left,
  right,
  children,
}) => {
  return (
    <div className={s.wrapper}>
      {loading && <LoadingOverlay />}
      <Background weatherID={weatherID} timeOfDay={timeOfDay}>
        <div className={s.contentWrap}>
          <main className={s.content}>
            {header}
            {left && right && (
              <div className={s.grid}>
                {left}
                {right}
              </div>
            )}
            {children}
          </main>
          <Footer />
        </div>
      </Background>
    </div>
  );
};

export default Layout;
