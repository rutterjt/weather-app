import React from 'react';

// date helper
import { format } from 'date-fns';

// redux
import { useSelector } from 'react-redux';
import { selectForecastById } from './forecastSlice';

// components
import Temperature from '../weather/Temperature';
import ForecastIcon from './ForecastIcon';

const ForecastItem = ({ id }) => {
  const forecast = useSelector((state) => selectForecastById(state, id));
  if (!forecast) return null;
  const { time, code, description, temp } = forecast;
  return (
    <li className="py-3 border-b-[1px] border-b-black/30 flex flex-col justify-between items-start">
      <span className="block mb-1 text-sm text-black/80 pt-0">
        {format(time, 'h a, EEEE')}
      </span>
      <div className="flex w-full justify-between space-x-4 items-center">
        <div className="flex items-center">
          <ForecastIcon />
          {description}
        </div>
        <div className="flex items-center">
          <Temperature>{temp}</Temperature>
        </div>
      </div>
    </li>
  );
};

export default ForecastItem;
