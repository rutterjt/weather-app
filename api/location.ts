import fetch from 'node-fetch';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.GEO_API_KEY || '',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

/**
 *
 */
export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { q: query } = request.query;
  if (!query) {
    return response.status(400).send({
      message: 'Improperly configured request. Missing search query.',
    });
  } else {
    try {
      const endpoint = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&sort=population&limit=10&namePrefix=${query}`;
      const res = await fetch(endpoint, options);
      const data = await res.json();
      if (res.status >= 400)
        throw new Error(
          `There was an error retrieving the location data from GeoDB: error ${res.status}, ${data.message}`
        );
      return response.status(200).json({ ...data });
    } catch (err) {
      let message = 'Unknown Error';
      if (err instanceof Error) message = err.message;
      return response.status(400).json({ message });
    }
  }
}
