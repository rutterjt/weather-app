import React from 'react';

// redux
import { useAppSelector } from '../../app/hooks';
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
import { Temperature } from './Temperature';
import { Dropdown } from '../../components/Dropdown';

const Row: React.FC = ({ children }) => (
  <li className="py-3 border-b-[1px] border-b-black/30 last-of-type:border-b-0 flex flex-col justify-between items-start">
    {children}
  </li>
);

const Label: React.FC = ({ children }) => (
  <span className="block mb-1 text-sm text-black/70 pt-0">{children}</span>
);

const Value: React.FC = ({ children }) => (
  <span className="border-none">{children}</span>
);

export const WeatherDetails: React.FC = () => {
  const temp = useAppSelector(selectTemperature);
  const feelsLike = useAppSelector(selectFeelsLike);
  const humidity = useAppSelector(selectHumidity);
  const hourlyRainfall = useAppSelector(selectRainfall);
  const hourlySnowfall = useAppSelector(selectSnowfall);
  const wind = useAppSelector(selectWind);
  const { speed: windSpeed, direction: windDirection, gusts: windGusts } = wind;
  const pressure = useAppSelector(selectPressure);
  const cloudCover = useAppSelector(selectCloudCover);

  return (
    <Dropdown title="Current Conditions">
      <ul>
        {temp && (
          <Row>
            <Label>Temperature</Label>
            <Value>
              <Temperature value={temp} />
            </Value>
          </Row>
        )}
        {feelsLike && (
          <Row>
            <Label>Feels Like</Label>
            <Value>
              <Temperature value={feelsLike} />
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
