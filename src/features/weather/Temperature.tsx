import React from 'react';

type Props = {
  scale?: 'F' | 'C';
  value: number;
};

/**
 * Renders a formatted temperature value.
 */
export const Temperature: React.FC<Props> = ({ value, scale = 'F' }) => {
  return (
    <span
      aria-label={`${value} degrees ${
        scale === 'F' ? 'Fahrenheit' : 'Celsius'
      }`}
      className="font-number"
    >
      {Math.round(value)}°<span className="text-[0.8em]">{scale}</span>
    </span>
  );
};
