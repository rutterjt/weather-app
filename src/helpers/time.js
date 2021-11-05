export const isStale = (time, limit = 600000) => {
  return Date.now() > time + limit;
};
