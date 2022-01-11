import React from 'react';

// styles
import {
  Wrapper,
  TempOverview,
  TempIcon,
  Temp,
  FeelsLike,
  TempScale,
} from './Overview.styles';

// components
import WeatherImage from 'components/WeatherImage';

// icons
import TempWarm from 'images/temp-warm.svg';
import TempCold from 'images/temp-cold.svg';

const Overview = ({ weatherID, timeOfDay, temp, feelsLike }) => {
  const freezingPoint = 32;
  return (
    <Wrapper>
      <WeatherImage weatherID={weatherID} timeOfDay={timeOfDay} />
      <TempOverview>
        <TempIcon src={temp >= freezingPoint ? TempWarm : TempCold} alt="" />
        <div>
          <Temp aria-label={`${temp} degrees`}>
            {Math.round(temp)}°<TempScale>F</TempScale>
          </Temp>
          <FeelsLike>
            Feels like: {Math.round(feelsLike)}°<TempScale>F</TempScale>
          </FeelsLike>
        </div>
      </TempOverview>
    </Wrapper>
  );
};

export default Overview;
