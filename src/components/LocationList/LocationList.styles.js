import styled from 'styled-components';

export const List = styled.ul`
  padding: 1rem 0;
  text-align: left;
  background-color: hsl(190, 100%, 99%);
  color: hsl(190, 100%, 3%);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 10px 10px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
`;

export const Item = styled.li`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: block;
`;

export const Button = styled.button`
  display: block;
  padding: 1rem;
  text-align: left;
  width: 100%;
  font-weight: normal;

  &:hover {
    background-color: hsl(190, 100%, 90%);
  }
`;
