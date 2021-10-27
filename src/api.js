export const geolocationFetch = (type = 'weather') => {
  return new Promise((resolve, reject) => {
    const success = ({ coords }) => {
      const { latitude: lat, longitude: lon } = coords;
      fetch(`/.netlify/functions/api?type=${type}&lat=${lat}&lon=${lon}`)
        .then((response) => response.json())
        .then((data) => resolve(data));
    };
    const error = (err) => reject(err);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      reject('Geolocation not authorized');
    }
  });
};
