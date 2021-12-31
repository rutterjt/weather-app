import React from 'react';

// styled components
import { Wrapper } from './Footer.styles';
const Footer = () => {
  return (
    <Wrapper>
      <p>
        Copyright {new Date().getFullYear()},{' '}
        <a href="https://github.com/jonrutter" target="_blank" rel="noreferrer">
          Jon Rutter
        </a>
        .
      </p>
    </Wrapper>
  );
};

export default Footer;
