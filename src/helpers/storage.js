export const saveWeather = (data) => {
  localStorage.setItem('weather', JSON.stringify(data));
  localStorage.setItem('time', JSON.stringify(Date.now()));
};
export const saveLocation = (data) => {
  localStorage.setItem('location', JSON.stringify(data));
};
export const getItem = (item) => localStorage.getItem(item);
export const read = (item) => JSON.parse(getItem(item));
export const readWeather = () => read('weather');
export const readTime = () => read('time');
export const readLocation = () => read('location');
