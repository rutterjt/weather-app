import styled from 'styled-components';

import { yellow } from 'styles/palette';

export const Wrapper = styled.div`
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
`;

export const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #ffffff;
  font-size: inherit;
  font-family: inherit;
  outline: none;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 10px 10px rgba(0, 0, 0, 0.12);
  margin-bottom: 0.1rem;

  &:focus {
    outline: 2px solid ${yellow.dark};
  }
`;
