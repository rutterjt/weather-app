import styled from 'styled-components';

export const IconWrap = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Controls = styled.div`
  max-width: 300px;
  margin: auto;
`;

export const ButtonWrap = styled.div`
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & button {
    margin-bottom: 1rem;
  }
`;
