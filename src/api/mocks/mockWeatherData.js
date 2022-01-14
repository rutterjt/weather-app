import setHours from 'date-fns/setHours';

export const mockWeatherData = {
  coord: { lon: -78.8529, lat: 42.8908 },
  weather: [{ id: 701, main: 'Mist', description: 'mist', icon: '50d' }],
  base: 'stations',
  main: {
    temp: 36.18,
    feels_like: 36.18,
    temp_min: 31.82,
    temp_max: 40.5,
    pressure: 1010,
    humidity: 86,
  },
  visibility: 4023,
  wind: { speed: 1.99, deg: 308, gust: 4 },
  clouds: { all: 100 },
  dt: Date.now(),
  sys: {
    type: 2,
    id: 2004318,
    country: 'US',
    sunrise: setHours(Date.now(), 7).getTime(),
    sunset: setHours(Date.now(), 17).getTime(),
  },
  timezone: -18000,
  id: 5110629,
  name: 'Buffalo',
  cod: 200,
};
