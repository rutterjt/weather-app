// takes two arguments: time of sunrise and time of sunset, in seconds
// returns "day", "night", or "twilight" depending on the time of day
export const getTimeOfDay = (sunrise, sunset) => {
  const current = Math.floor(Date.now() / 1000); // the current time, in seconds, Unix time
  // if the current time is earlier than 30 minutes before sunrise, or later than 30 minutes after sunset: it is night
  if (current < sunrise - 1800 || current > sunset + 1800) return 'night';
  // if the current time is both: later than 30 minutes after sunrise, and earler than 30 minutes before sunset: it is day
  if (current > sunrise + 1800 && current < sunset - 1800) return 'day';
  // otherwise: it is twilight
  return 'twilight';
};
