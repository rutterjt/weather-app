import React from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectTemperature, selectFeelsLike } from './weatherSlice';

import { TempCold, TempWarm } from '../../images';

import Temperature from './Temperature';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 2rem;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const TempWrapper = styled.div`
  font-size: 3.5rem;
  display: flex;
`;

const FeelsLikeWrapper = styled.div`
  font-size: 1rem;
`;

const TempIcon = styled.div`
  display: none;
  max-width: 8rem;
  margin-right: 0.5rem;

  & svg {
    max-width: 100%;
    height: auto;
  }

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    align-items: flex-start;
  }
`;

const TempOverview = () => {
  const temp = useSelector(selectTemperature);
  const feelsLike = useSelector(selectFeelsLike);

  if (!temp || !feelsLike) return null;

  return (
    <Wrapper>
      <TempIcon>{temp > 40 ? <TempWarm /> : <TempCold />}</TempIcon>
      <Content>
        <TempWrapper>
          <Temperature>{temp}</Temperature>
        </TempWrapper>
        <FeelsLikeWrapper>
          Feels Like: <Temperature>{feelsLike}</Temperature>
        </FeelsLikeWrapper>
      </Content>
    </Wrapper>
  );
};

export default TempOverview;
