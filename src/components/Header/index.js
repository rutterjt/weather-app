import React from 'react';

// styles
import s from './Header.module.css';

// components
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';

// helpers
import { capitalize } from 'helpers/format';

const Header = ({ title, subtitle }) => {
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
          <div className={s.headings}>
            <h1 className={s.location}>{capitalize(title)}</h1>
            {subtitle && (
              <h2 className={s.description}>{capitalize(subtitle)}</h2>
            )}
          </div>
          <button className={s.settingsBtn}>
            <IoSettingsSharp />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
