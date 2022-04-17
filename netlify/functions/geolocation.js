const axios = require('axios');

const API_URL = 'http://api.positionstack.com/v1/';
const API_KEY = process.env.GEOLOCATION_API_KEY;

exports.handler = async (event, context) => {
  const params = event.queryStringParameters;
  const { query } = params;

  const endpoint = `${API_URL}forward?access_key=${API_KEY}&query=${query}`;

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
