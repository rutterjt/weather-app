import React from 'react';

// styled components
import styled from 'styled-components';

const Wrapper = styled.footer`
  padding-top: 3rem;
  text-align: center;
  padding-bottom: 1.5rem;
  font-size: 0.8rem;
`;

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
