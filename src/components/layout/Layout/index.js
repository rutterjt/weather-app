import React from 'react';

// components
import Background from 'components/layout/Background';
import LoadingOverlay from 'components/LoadingOverlay';
import Footer from 'components/layout/Footer';

// styled components
import { Wrapper, ContentWrapper, Content, Grid } from './Layout.styles';

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
    <Wrapper>
      {loading && <LoadingOverlay />}
      <Background weatherID={weatherID} timeOfDay={timeOfDay}>
        <ContentWrapper>
          <Content>
            {header}
            {left && right && (
              <Grid>
                {left}
                {right}
              </Grid>
            )}
            {children}
          </Content>
          <Footer />
        </ContentWrapper>
      </Background>
    </Wrapper>
  );
};

export default Layout;
