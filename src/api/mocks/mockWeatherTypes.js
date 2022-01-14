export const mockWeatherTypes = [
  {
    id: 211,
    main: 'Thunderstorm',
    description: 'thunderstorm',
    icon: '11d',
  },
  {
    id: 301,
    main: 'Drizzle',
    description: 'drizzle',
    icon: '09d',
  },
  {
    id: 501,
    main: 'Rain',
    description: 'moderate rain',
    icon: '10d',
  },
  {
    id: 511,
    main: 'Rain',
    description: 'freezing rain',
    icon: '01d',
  },
  {
    id: 600,
    main: 'Snow',
    description: 'light snow',
    icon: '13d',
  },
  {
    id: 602,
    main: 'Snow',
    description: 'Heavy snow',
    icon: '13d',
  },
  {
    id: 616,
    main: 'Snow',
    description: 'Rain and snow',
    icon: '13d',
  },
  {
    id: 701,
    main: 'Mist',
    description: 'mist',
    icon: '50d',
  },
  {
    id: 781,
    main: 'Tornado',
    description: 'tornado',
    icon: '50d',
  },
  {
    id: 800,
    main: 'Clear',
    description: 'clear sky',
    icon: '01d',
  },
  {
    id: 801,
    main: 'Clouds',
    description: 'few clouds: 11-25%',
    icon: '02d',
  },
  {
    id: 803,
    main: 'Clouds',
    description: 'broken clouds: 51-84%',
    icon: '04d',
  },
  {
    id: 804,
    main: 'Clouds',
    description: 'overcast clouds: 85-100%',
    icon: '04d',
  },
];

export const getRandomWeatherType = () => {
  let randomIndex = Math.floor(Math.random() * mockWeatherTypes.length);
  return mockWeatherTypes[randomIndex];
};
