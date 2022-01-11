import styled from 'styled-components';

export const Wrapper = styled.main`
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
`;

export const ContentWrapper = styled.div`
  padding: 0 var(--x-padding);
  display: flex;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;

export const Content = styled.main`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 350px;
    gap: 1rem;
  }
`;
