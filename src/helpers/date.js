// These helper functions parse a current date in seconds (Unix time), and return human-readable strings representing the date and time
// These functions take the current time in seconds, instead of miliseconds, because the weather API this project uses returns all date/time values in seconds (Unix time)

// takes a value in seconds, returns a new Date object
export const parseDate = (seconds) => {
  return new Date(seconds * 1000);
};

// takes a value in seconds, returns the current hour in 12-hour format
export const getHours = (seconds) => {
  const date = parseDate(seconds);
  let hours = date.getHours();
  if (hours >= 12) {
    hours -= 12;
  }
  // if hours is 0, it is actually 12 (because we start counting hours at 12), so must convert before returning.
  // Otherwise return the current hours in string format
  return hours === 0 ? '12' : hours.toString();
};

// takes a value in seconds, returns 'AM' or 'PM'
export const getAMOrPM = (seconds) => {
  const date = parseDate(seconds);
  return date.getHours() >= 12 ? 'PM' : 'AM';
};

// takes a value in seconds, returns a date in HH:MM AM/PM format
// e.g. '6:23 PM'
export const getHourAndMinute = (seconds) => {
  const date = parseDate(seconds);

  return `${getHours(seconds)}:${
    date.getMinutes() < 10
      ? '0' + date.getMinutes().toString()
      : date.getMinutes()
  } ${getAMOrPM(seconds)}`;
};

// takes a value in seconds, returns the day of the week
export const getDayOfWeek = (seconds) => {
  const date = parseDate(seconds);
  const dayOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]; // Date.getDay() returns a number, 0-6, representing the day of the week, starting with Sunday
  return dayOfWeek[date.getDay()];
};

export const getMonthName = (seconds) => {
  const date = parseDate(seconds);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[date.getMonth()];
};
