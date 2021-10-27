import React from 'react';

import * as s from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <p>
        Copyright {new Date().getFullYear()},{' '}
        <a href="https://github.com/jonrutter" target="_blank" rel="noreferrer">
          Jon Rutter
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
