import React from 'react';

// styles
import s from './Header.module.css';

// components
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';

const Header = () => {
  return (
    <div className={s.wrapper}>
      <header className={s.content}>
        <div className={s.row}>
          <button
            className={s.openBtn}
            aria-label="Get weather for current location"
          >
            <FaMapMarkerAlt />
          </button>
          <h1 className={s.location}>Buffalo</h1>
          <button className={s.settingsBtn}>
            <IoSettingsSharp />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
