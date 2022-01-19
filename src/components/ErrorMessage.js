import styled from 'styled-components';

const ErrorMessage = styled.div`
  ${
    '' /* position: absolute;
  top: 3.5rem; */
  }
  position: relative;
  margin-top: 0.5rem;
  background-color: #fff;
  color: #000;
  width: auto;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 2px solid ${(props) => props.theme.palette.yellow.light};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 10px 10px rgba(0, 0, 0, 0.12);

  &::before {
    content: '';
    position: absolute;
    top: -0.5rem;
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid ${(props) => props.theme.palette.yellow.light};
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
  }
`;

export default ErrorMessage;
