import React from 'react';

// redux
import { useAppSelector } from '../../app/hooks';
import { selectForecastIds } from './forecastSlice';

// components
import { Dropdown } from '../../components/Dropdown';
import { ForecastItem } from './ForecastItem';

export const ForecastOverview: React.FC = () => {
  const ids = useAppSelector(selectForecastIds);

  const listContent = ids.map((id, index) => (
    <ForecastItem id={id} key={index} />
  ));

  return (
    <Dropdown title="Forecast">
      <ul>{listContent}</ul>
    </Dropdown>
  );
};
