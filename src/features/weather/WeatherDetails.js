import React from 'react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
  selectFeelsLike,
  selectTemperature,
  selectHumidity,
  selectRainfall,
  selectSnowfall,
  selectWind,
  selectPressure,
  selectCloudCover,
} from './weatherSlice';

import Temperature from './Temperature';
import Dropdown from '../../components/Dropdown';

const DetailsList = styled.ul``;

const Row = styled.li`
  padding-bottom: 0.75rem;
  padding-top: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.8);
`;

const Col = styled.span``;

const WeatherDetails = () => {
  const temp = useSelector(selectTemperature);
  const feelsLike = useSelector(selectFeelsLike);
  const humidity = useSelector(selectHumidity);
  const hourlyRainfall = useSelector(selectRainfall);
  const hourlySnowfall = useSelector(selectSnowfall);
  const wind = useSelector(selectWind);
  const { speed: windSpeed, direction: windDirection, gusts: windGusts } = wind;
  const pressure = useSelector(selectPressure);
  const cloudCover = useSelector(selectCloudCover);

  return (
    <Dropdown title="Current Conditions">
      <DetailsList>
        {temp && (
          <Row>
            <Label>Temperature</Label>
            <Col>
              <Temperature>{temp}</Temperature>
            </Col>
          </Row>
        )}
        {feelsLike && (
          <Row>
            <Label>Feels Like</Label>
            <Col>
              <Temperature>{feelsLike}</Temperature>
            </Col>
          </Row>
        )}
        {humidity && (
          <Row>
            <Label>Humidity</Label>
            <Col>{humidity}%</Col>
          </Row>
        )}
        {hourlyRainfall && (
          <Row>
            <Label>Rainfall (last hour)</Label>
            <Col>{hourlyRainfall} in</Col>
          </Row>
        )}
        {hourlySnowfall && (
          <Row>
            <Label>Snowfall (last hour)</Label>
            <Col>{hourlySnowfall} in</Col>
          </Row>
        )}
        {windSpeed && windDirection && (
          <Row>
            <Label>Wind</Label>
            <Col>
              {windDirection}, {windSpeed} mph
            </Col>
          </Row>
        )}
        {windGusts && (
          <Row>
            <Label>Wind Gusts</Label>
            <Col>{windGusts} mph</Col>
          </Row>
        )}
        {pressure && (
          <Row>
            <Label>Pressure</Label>
            <Col>{pressure} inHg</Col>
          </Row>
        )}
        {cloudCover && (
          <Row>
            <Label>Cloud cover</Label>
            <Col>{cloudCover}%</Col>
          </Row>
        )}
      </DetailsList>
    </Dropdown>
  );
};

export default WeatherDetails;
