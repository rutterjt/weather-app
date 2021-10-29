const axios = require('axios');

const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = process.env.WEATHER_API_KEY;

exports.handler = async (event, context) => {
  const params = event.queryStringParameters;

  const QUERY = `lat=${params.lat}&lon=${params.lon}`;

  const endpoint = `${API_URL}weather?${QUERY}&appid=${API_KEY}&units=imperial`;

  try {
    const response = await axios.get(endpoint);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      body: 'There was an error loading data from the api.',
    };
  }
};
