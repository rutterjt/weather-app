const windDegrees = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
  'N',
];

export const capitalize = (str) => {
  return str
    .trim()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const getWindDirection = (deg) => {
  const index = (deg % 360) / 22.5;
  return windDegrees[Math.round(index)];
};

export const getInHg = (hpa) => hpa * 0.029529983071445;

export const mmToIn = (mm) => (mm * 0.0393701).toFixed(2);
