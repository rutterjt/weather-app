import React, { useEffect, useCallback } from 'react';

import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { fetchWeather } from './weatherSlice';

import WeatherImage from './WeatherImage';
import Spinner from '../../components/Spinner';
import Header from './Header';
import TempOverview from './TempOverview';
import WeatherOverview from './WeatherOverview';
import WeatherDetails from './WeatherDetails';

const Wrapper = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const Col = styled.div`
  flex: ${(props) => props.span || 1};
`;

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  z-index: 2;
  align-items: center;
`;

const ImageWrap = styled.div`
  margin-bottom: 1.5rem;
`;

const WeatherPage = () => {
  const dispatch = useDispatch();

  const loadingStatus = useSelector((state) => state.weather.status);

  const getWeather = useCallback(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  useEffect(() => {
    if (loadingStatus === 'idle') {
      getWeather();
    }
  }, [loadingStatus, getWeather]);

  if (loadingStatus === 'loading') {
    return (
      <SpinnerWrapper>
        <Spinner size="lg" />
      </SpinnerWrapper>
    );
  } else if (loadingStatus === 'failed') {
    return (
      <div>
        Oops, there was a problem.{' '}
        <button onClick={getWeather}>Try Again</button>
      </div>
    );
  }

  return (
    <Wrapper>
      <Header />
      <Grid>
        <Col span={5}>
          <ImageWrap>
            <WeatherImage />
          </ImageWrap>
          <TempOverview />
        </Col>
        <Col span={4}>
          <WeatherOverview />
          <WeatherDetails />
        </Col>
      </Grid>
    </Wrapper>
  );
};

export default WeatherPage;
