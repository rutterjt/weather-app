import React from 'react';

// redux
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

// components
import Temperature from './Temperature';
import Dropdown from '../../components/Dropdown';

const Row = ({ children }) => (
  <li className="py-3 border-b-[1px] border-b-black/30 flex flex-col justify-between items-start">
    {children}
  </li>
);

const Label = ({ children }) => (
  <span className="block mb-1 text-sm text-black/80 pt-0">{children}</span>
);

const Value = ({ children }) => <span className="border-none">{children}</span>;

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
      <ul>
        {temp && (
          <Row>
            <Label>Temperature</Label>
            <Value>
              <Temperature>{temp}</Temperature>
            </Value>
          </Row>
        )}
        {feelsLike && (
          <Row>
            <Label>Feels Like</Label>
            <Value>
              <Temperature>{feelsLike}</Temperature>
            </Value>
          </Row>
        )}
        {humidity && (
          <Row>
            <Label>Humidity</Label>
            <Value>{humidity}%</Value>
          </Row>
        )}
        {hourlyRainfall && (
          <Row>
            <Label>Rainfall (last hour)</Label>
            <Value>{hourlyRainfall} in</Value>
          </Row>
        )}
        {hourlySnowfall && (
          <Row>
            <Label>Snowfall (last hour)</Label>
            <Value>{hourlySnowfall} in</Value>
          </Row>
        )}
        {windSpeed && windDirection && (
          <Row>
            <Label>Wind</Label>
            <Value>
              {windDirection}, {windSpeed} mph
            </Value>
          </Row>
        )}
        {windGusts && (
          <Row>
            <Label>Wind Gusts</Label>
            <Value>{windGusts} mph</Value>
          </Row>
        )}
        {pressure && (
          <Row>
            <Label>Pressure</Label>
            <Value>{pressure} inHg</Value>
          </Row>
        )}
        {cloudCover && (
          <Row>
            <Label>Cloud cover</Label>
            <Value>{cloudCover}%</Value>
          </Row>
        )}
      </ul>
    </Dropdown>
  );
};

export default WeatherDetails;
