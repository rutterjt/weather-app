import React from 'react';

import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  padding: 2rem;
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
`;

const Link = styled.a`
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Copyright>
        Copyright {new Date().getFullYear()},{' '}
        <Link
          href="https://github.com/jonrutter"
          target="_blank"
          rel="noreferrer"
        >
          Jon Rutter
        </Link>
        .
      </Copyright>
    </StyledFooter>
  );
};

export default React.memo(Footer);
