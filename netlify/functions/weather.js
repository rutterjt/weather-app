const axios = require('axios');

const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = process.env.WEATHER_API_KEY;

exports.handler = async (event, context) => {
  const { lat, lon } = event.queryStringParameters;
  if (!lat || !lon) {
    return {
      statusCode: 400,
      body: '400 Bad Request: request missing either lat or lon query parameters.',
    };
  }
  const COORDS = `lat=${lat}&lon=${lon}`;

  const weatherEndpoint = `${API_URL}weather?${COORDS}&appid=${API_KEY}&units=imperial`;
  const forecastEndpoint = `${API_URL}forecast?${COORDS}&appid=${API_KEY}&units=imperial`;

  // takes an endpoint and label
  // performs get request of endpoint
  // if response is good, returns an object with the response data and label, otherwise throws error
  const fetchFromApi = (endpoint, label) =>
    new Promise((resolve, reject) => {
      const badResponse = function (err) {
        reject(err);
      };
      const goodResponse = function (data) {
        resolve({ label, data });
      };
      axios.get(endpoint).then(({ status, data }) => {
        if (status === 200) goodResponse(data);
        else badResponse('There was a problem fetching weather data.');
      });
    });

  try {
    let response = await Promise.all([
      fetchFromApi(weatherEndpoint, 'weather'),
      fetchFromApi(forecastEndpoint, 'forecast'),
    ])
      .then((values) => {
        return {
          statusCode: 200,
          body: JSON.stringify([...values]),
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          statusCode: 404,
          body: 'There was an error loading data from the api.',
        };
      });
    return response;
  } catch (err) {
    return {
      statusCode: 500,
      body: 'The server encountered a problem.',
    };
  }
};
