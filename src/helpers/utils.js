export const isInRange =
  (num) =>
  ([min, max]) =>
    num >= min && num <= max;

export const isEmpty = (obj) => {
  /* takes an object or array as an argument, returns whether the object or array has no members */
  if (obj && Array.isArray(obj)) return obj.length === 0;
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};
