import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 2rem;
  width: 100%;
  max-width: 400px;
  margin: auto;
`;

export const DegreesScale = styled.span`
  font-size: 0.8em;
`;

export const Title = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

export const SubTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
`;

export const List = styled.ul`
  margin-bottom: 3rem;
  & li {
    margin-bottom: 0.5rem;
  }
`;

export const DetailsList = styled.ul`
  margin-bottom: 3rem;
  & li {
    margin-bottom: 1rem;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
    justify-content: space-between;
  }
`;

export const FlexListItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

export const LiBox = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    font-weight: normal;
  }
`;
