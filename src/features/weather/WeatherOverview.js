import React from 'react';

import styled from 'styled-components';
import format from 'date-fns/format';
import { useSelector } from 'react-redux';

import {
  selectCurrentTime,
  selectSunrise,
  selectSunset,
  selectWeatherDescription,
  selectTemperature,
  selectFeelsLike,
} from './weatherSlice';

import Temperature from './Temperature';
import Dropdown from '../../components/Dropdown';

const Description = styled.p`
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Row = styled.span`
  display: block;
`;

const Label = styled(Row)`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.8);
`;

const WeatherOverview = () => {
  const now = useSelector(selectCurrentTime);
  const sunrise = useSelector(selectSunrise);
  const sunset = useSelector(selectSunset);
  const temp = useSelector(selectTemperature);
  const feelsLike = useSelector(selectFeelsLike);
  const description = useSelector(selectWeatherDescription);

  // if any values not present, return null to prevent error
  if (!now || !sunrise || !sunset || !temp || !feelsLike || !description)
    return null;
  return (
    <Dropdown
      title={now > sunset ? "Tonight's Weather" : "Today's Weather"}
      openOnMount
    >
      <Description>
        {format(new Date(now), 'EEEE, MMMM do, p')}. It is{' '}
        <Temperature>{temp}</Temperature>, and feels like{' '}
        <Temperature>{feelsLike}</Temperature>. The current weather:{' '}
        {description}.
      </Description>
      <Grid>
        <Col>
          <Label>Sunrise</Label>
          <Row>{format(new Date(sunrise), 'p')}</Row>
        </Col>
        <Col>
          <Label>Sunset</Label>
          <Row>{format(new Date(sunset), 'p')}</Row>
        </Col>
      </Grid>
    </Dropdown>
  );
};

export default WeatherOverview;
