export const palette = {
  lightBlue: { text: '#000', light: '#00d5ff', dark: '#00a7c9' },
  medBlue: { text: '#000', light: '#0da6f2', dark: '#0a81bd' },
  darkBlue: { text: '#fff', light: '#005496', dark: '#003359' },
  cyan: { text: '#000', light: '#9DDEF2', dark: '#4D9ECC' },
  // darkCyan: { text: '', light: '#4d9ecc', dark: '#28678b' },
  darkCyan: { text: '#fff', light: '#2E759E', dark: '#225877' },
  // purple: { text: '', light: '#8d82b6', dark: '#605880' },
  purple: { text: '#fff', light: '#7b6eaa', dark: '#4f486a' },
  green: { text: '#000', light: '#33c986', dark: '#009e91' },
  yellow: { text: '#000', light: '#ffc543', dark: '#ff8c00' },
  white: { text: '#000', light: '#fff', dark: '#fff' },
  black: { text: '#fff', light: '#000', dark: '#000' },
};

export const {
  lightBlue,
  medBlue,
  darkBlue,
  cyan,
  darkCyan,
  purple,
  green,
  yellow,
} = palette;

// auto generate gradients based on palette colors
export const gradients = Object.keys(palette).reduce((obj, colorName) => {
  obj[
    colorName
  ] = `linear-gradient(135deg, ${palette[colorName].light}, ${palette[colorName].dark})`;
  return obj;
}, {});
