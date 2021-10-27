const axios = require('axios');

const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = process.env.API_KEY;

exports.handler = async (event, context) => {
  const params = event.queryStringParameters;

  let QUERY;
  if (params.lat && params.lon) {
    QUERY = `lat=${params.lat}&lon=${params.lon}`;
  } else if (params.cityid) {
    QUERY = `id=${params.cityid}`;
  } else {
    QUERY = `q=${params.q}`;
  }

  const { type: TYPE } = params;

  const endpoint = `${API_URL}${TYPE}?${QUERY}&appid=${API_KEY}&units=imperial`;

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
