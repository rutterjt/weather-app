import setHours from 'date-fns/setHours';

import { getRandomWeatherType } from './mockWeatherTypes';

const seconds = (milliseconds) => Math.floor(milliseconds / 1000);

const getRandom = (min, max) => Math.random() * (max - min + 1) + min;

const getRandomFloat = (min, max) => {
  return Number(getRandom(min, max).toFixed(2));
};

const getRandomInt = (min, max) => Math.floor(getRandom(min, max));

const getRandomMainDetails = () => {
  const temp = getRandomFloat(-10, 36);
  const feels_like = getRandomFloat(temp - 20, temp);
  const temp_min = getRandomFloat(temp - 10, temp);
  const temp_max = getRandomFloat(temp, temp + 10);
  const pressure = getRandomInt(1000, 1080);
  const humidity = getRandomInt(0, 100);
  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
  };
};

export const mockWeatherData = {
  coord: { lon: -78.8529, lat: 42.8908 },
  weather: [getRandomWeatherType()],
  base: 'stations',
  main: getRandomMainDetails(),
  visibility: 4023,
  wind: {
    speed: getRandomFloat(0, 35),
    deg: getRandomInt(0, 360),
    gust: getRandomInt(0, 45),
  },
  clouds: { all: getRandomInt(1, 100) },
  dt: seconds(Date.now()),
  sys: {
    type: 2,
    id: 2004318,
    country: 'US',
    sunrise: seconds(setHours(Date.now(), 7).getTime()),
    sunset: seconds(setHours(Date.now(), 17).getTime()),
  },
  snow: {
    '1h': getRandomInt(0, 200),
  },
  timezone: -18000,
  id: 5110629,
  name: 'Buffalo',
  cod: 200,
};
