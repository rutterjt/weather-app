/**
 * Accepts a number, returns a function that accepts an array of two numbers representing a range. Returns true if the original number is within that range.
 */
export const isInRange = (num: number) => (range: number[]) => {
  if (range.length === 1) return num === range[0];
  else return num >= range[0] && num <= range[1];
};
