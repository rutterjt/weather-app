import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem 1.5rem 2rem;
  min-height: calc(100vh - 4rem);
  height: 100%;
  @media screen and (min-width: 768px) {
    padding-x: 2rem 2rem 0;
  }
`;

const Content = styled.main`
  max-width: 992px;
  margin: auto;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Layout;
