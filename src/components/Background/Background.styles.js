import styled from 'styled-components';

const colorMap = {
  lightBlue: 'linear-gradient(135deg, #00d5ff, #00a7c9)',
  medBlue: 'linear-gradient(135deg, #0da6f2, #0a81bd)',
  darkBlue: 'background: linear-gradient(135deg, #005496, #003359)',
  cyan: 'linear-gradient(135deg, #00d5ff, #00a7c9)',
  darkCyan: 'linear-gradient(135deg, #4d9ecc, #28678b)',
  yellow: 'linear-gradient(135deg, #ffc543, #ff8c00)',
  purple: 'linear-gradient(135deg, #8d82b6, #605880)',
  green: 'linear-gradient(135deg, #33c986, #009e91)',
};

export const Wrapper = styled.div`
  overflow: hidden;
  min-height: 100vh;
  height: 100%;
  width: 100%;

  background: ${(props) =>
    props.color ? colorMap[props.color] : colorMap['lightBlue']};
`;
