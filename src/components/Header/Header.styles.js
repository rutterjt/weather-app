import styled from 'styled-components';

import { maxWidth } from 'styles/layout';

export const Wrapper = styled.div`
  padding: 2rem 0 0;
`;

export const Content = styled.header`
  max-width: ${maxWidth};
  margin: auto;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const OpenButton = styled.button`
  margin-right: 1rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  line-height: 1;
`;

export const SettingsButton = styled.button`
  margin-left: 1rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  line-height: 1;
`;

export const Headings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  word-break: break-word;
  line-height: 1.3;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const SubTitle = styled.p`
  font-size: 1rem;
  @media screen and (min-width: 768px) {
    font-size: 1.25rem;
  }
`;
