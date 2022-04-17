const windDegrees: string[] = [
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

export const getWindDirection = (deg: number): string => {
  const index = (deg % 360) / 22.5;
  return windDegrees[Math.round(index)];
};

export const getInHg = (hpa: number): number => hpa * 0.029529983071445;

export const mmToIn = (mm: number): string => (mm * 0.0393701).toFixed(2);
