export const geolocationFetch = async (type = 'weather') => {
  const success = async ({ coords }) => {
    const { latitude: lat, longitude: lon } = coords;
    const response = await fetch(
      `/.netlify/functions/api?type=${type}&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data;
  };

  const error = () => null;

  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(success, error);
  } else {
    return null;
  }
};
