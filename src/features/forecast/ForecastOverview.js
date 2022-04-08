import React from 'react';

// redux
import { useSelector } from 'react-redux';
import { selectForecastIds } from './forecastSlice';

// components
import Dropdown from '../../components/Dropdown';
import ForecastItem from './ForecastItem';

const ForecastOverview = () => {
  const ids = useSelector(selectForecastIds);

  const listContent = ids.map((id, index) => (
    <ForecastItem id={id} key={index} />
  ));

  return (
    <Dropdown title="Forecast">
      <ul>{listContent}</ul>
    </Dropdown>
  );
};

export default ForecastOverview;
