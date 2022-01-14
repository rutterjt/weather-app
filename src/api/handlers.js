import { rest } from 'msw';

import { mockLocationData } from './mocks/mockLocationData';
import { mockWeatherData } from './mocks/mockWeatherData';
import { mockForecastData } from './mocks/mockForecastData';

// const DELAY = 500;

export const handlers = [
  rest.get('/location', (req, res, ctx) => {
    console.log('Testing');
    return res(ctx.status(200), ctx.json(mockLocationData));
  }),
  rest.get('/weather', (req, res, ctx) => {
    const data = { weather: mockWeatherData, forecast: mockForecastData };
    return res(ctx.status(200), ctx.json(data));
  }),
];
