import React from 'react';

// styles
import {
  Wrapper,
  DegreesScale,
  Title,
  SubTitle,
  List,
  DetailsList,
  FlexListItem,
  LiBox,
} from './Details.styles';

// helpers
import { getDayOfWeek, getHourAndMinute, getMonthName } from 'helpers/date';
import { getWindDirection } from 'helpers/format';
import { getInHg, mmToIn } from 'helpers/format';

// helper component: renders styled symbol for degrees fahrenheit,
const F = () => {
  return (
    <span>
      ° <DegreesScale>F</DegreesScale>
    </span>
  );
};

const Details = ({ weather, main, sys, wind, clouds, rain, snow }) => {
  const { description } = weather[0];
  const { temp, feels_like: feelsLike, pressure, humidity } = main;
  const { sunrise, sunset } = sys;
  const { speed: windSpeed, deg: windDirection, gust } = wind;
  const { all: cloudCover } = clouds;
  const today = new Date();
  const now = today / 1000;

  const has = (prop) => prop !== undefined;

  return (
    <Wrapper>
      <Title>Today's Details</Title>
      <List>
        <li>
          <div>
            {getDayOfWeek(now)}, {getMonthName(now)} {today.getDate()},{' '}
            {getHourAndMinute(now)}.
          </div>
          <div>
            Currently {Math.round(temp)}
            <F />, {description}.
          </div>
        </li>
        <FlexListItem>
          <LiBox>
            <span>Sunrise:</span>
            <span>{getHourAndMinute(sunrise)}</span>
          </LiBox>
          <LiBox>
            <span>Sunset:</span>
            <span>{getHourAndMinute(sunset)}</span>
          </LiBox>
        </FlexListItem>
      </List>

      <SubTitle>Current Conditions</SubTitle>
      <DetailsList>
        {has(temp) && (
          <li>
            <span>Temperature: </span>
            <span>
              {Math.round(temp)}
              <F />
            </span>
          </li>
        )}
        {has(feelsLike) && (
          <li>
            <span>Feels Like: </span>
            <span>
              {Math.round(feelsLike)}
              <F />
            </span>
          </li>
        )}
        {has(humidity) && (
          <li>
            <span>Humidity: </span>
            <span>{humidity}%</span>
          </li>
        )}
        {has(rain) && has(rain['1h']) && (
          <li>
            <span>Rainfall (last hour): </span>
            <span>{mmToIn(rain['1h'])}in</span>
          </li>
        )}
        {has(snow) && has(snow['1h']) && (
          <li>
            <span>Snowfall (last hour): </span>
            <span>{mmToIn(snow['1h'])}in</span>
          </li>
        )}

        {has(windSpeed) && (
          <li>
            <span>Wind: </span>
            <span>
              {windDirection && getWindDirection(windDirection)}, {windSpeed}{' '}
              mph
            </span>
          </li>
        )}
        {has(gust) && (
          <li>
            <span>Wind Gusts: </span>
            <span>{gust} mph</span>
          </li>
        )}
        {has(pressure) && (
          <li>
            <span>Pressure: </span>
            <span>{Math.round(getInHg(pressure) * 100) / 100} inHg</span>
          </li>
        )}
        {has(cloudCover) && (
          <li>
            <span>Cloud cover: </span>
            <span>{cloudCover}%</span>
          </li>
        )}
      </DetailsList>
    </Wrapper>
  );
};

export default Details;
