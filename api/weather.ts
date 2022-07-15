import fetch from 'node-fetch';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { lat, lon } = request.query;
  if (!lat || !lon) {
    response.status(400).send({
      message:
        'Improperly configured request. Missing latitude and/or longitude.',
    });
  } else {
    try {
      const endpoint = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`;
      const res = await fetch(endpoint);
      const data = await res.json();

      if (res.status >= 400)
        // checking for http errors
        throw new Error(
          `There was an error retrieving the weather data from Openweathermap: error ${res.status}, ${data?.message}`
        );
      else if (data?.cod && data.cod >= 400) {
        // when openweathermap encounters a problem, it sometimes sends an error response with an http status of 200. this checks to make sure that the response is not one of these errors
        throw new Error(
          `There was an error retrieving the weather data from Openweathermap: error code ${data?.cod}, ${data?.message}`
        );
      }
      return response.status(200).json({ ...data });
    } catch (err) {
      let message = 'Unknown Error';
      if (err instanceof Error) message = err.message;
      return response.status(400).json({ message });
    }
  }
}
