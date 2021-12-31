import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }

`;

export const StyledSpinner = styled.div`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top: 4px solid white;
  animation: ${rotate} 1s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
`;
