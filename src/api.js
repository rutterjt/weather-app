export const getLocationFromBrowser = () => {
  return new Promise((resolve, reject) => {
    const success = ({ coords }) => resolve(coords);
    const error = (err) => reject(err);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      reject('No geolocation available');
    }
  });
};

export const fetchWeather = ({ latitude, longitude }) => {
  return new Promise((resolve, reject) => {
    fetch(`/.netlify/functions/weather?&lat=${latitude}&lon=${longitude}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const fetchGeolocation = (query) => {
  return new Promise((resolve, reject) => {
    fetch(`/.netlify/functions/geolocation?query=${query}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
