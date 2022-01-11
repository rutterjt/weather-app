import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

export const TempOverview = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export const TempIcon = styled.img`
  max-width: 4rem;
  margin-right: 0.5rem;
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const Temp = styled.h2`
  font-size: 3.5rem;
`;

export const FeelsLike = styled.h3`
  font-size: 1rem;
`;

export const TempScale = styled.span`
  font-size: 0.8em;
`;
