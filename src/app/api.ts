import type { LocationData, WeatherData } from '../types';

/**
 * Fetches location data from a serverless function.
 *
 * Returns a promise that either resolves with an array of type LocationData[], or rejects with an error.
 *
 * @param query - The search query
 *
 * @example
 * fetchLocations('toronto')
 *   .then((data) => console.log(data))
 *   .catch((error) => console.error(error.message))
 *
 */
export const fetchLocations = async (
  query: string
): Promise<LocationData[]> => {
  try {
    // fetch and process the data
    const response = await fetch(`/api/location?q=${query}`);
    const data = await response.json();
    // catch http errors
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    const result = data?.data;
    // catch errors resulting from unexpected responses from GeoDB
    if (!result || !Array.isArray(result))
      throw new Error(
        'An unknown error occurred. The data from GeoDB was improperly formatted.'
      );
    // otherwise return the resulting data
    return result;
  } catch (error) {
    // typescript workaround for errors in `catch` being typed as unknown
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
};

/**
 * Fetches location data from a serverless function.
 *
 * Returns a promise that either resolves with an array of type LocationData[], or rejects with an error.
 *
 * @param latitude - Latitude of the location to fetch the weather from
 * @param longitude - Longitude of the location to fetch the weather from
 *
 * @example
 * const lat = 43.670277777;
 * const lon = -79.386666666;
 * fetchWeather(lat, lon)
 *   .then((data) => console.log(data))
 *   .catch((error) => console.error(error.message))
 *
 */
export const fetchWeather = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  try {
    // fetch and process the data
    const response = await fetch(
      `/api/weather?lat=${latitude}&lon=${longitude}`
    );
    // catch http errors
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    // otherwise return the data
    return data;
  } catch (error) {
    // typescript workaround for errors in `catch` being typed as unknown
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
};
