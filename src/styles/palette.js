export const palette = {
  lightBlue: { main: '', light: '#00d5ff', dark: '#00a7c9' },
  medBlue: { main: '', light: '#0da6f2', dark: '#0a81bd' },
  darkBlue: { main: '', light: '#005496', dark: '#003359' },
  cyan: { main: '', light: '#00d5ff', dark: '#00a7c9' },
  darkCyan: { main: '', light: '#4d9ecc', dark: '#28678b' },
  purple: { main: '', light: '#8d82b6', dark: '#605880' },
  green: { main: '', light: '#33c986', dark: '#009e91' },
  yellow: { main: '', light: '#ffc543', dark: '#ff8c00' },
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

export const gradients = {
  lightBlue: `linear-gradient(135deg, ${lightBlue.light}, ${lightBlue.dark})`,
  medBlue: `linear-gradient(135deg, ${medBlue.light}, ${medBlue.dark})`,
  darkBlue: `linear-gradient(135deg, ${darkBlue.light}, ${darkBlue.dark})`,
  cyan: `linear-gradient(135deg, ${cyan.light}, ${cyan.dark})`,
  darkCyan: `linear-gradient(135deg, ${darkCyan.light}, ${darkCyan.dark})`,
  purple: `linear-gradient(135deg, ${purple.light}, ${purple.dark})`,
  green: `linear-gradient(135deg, ${green.light}, ${green.dark})`,
  yellow: `linear-gradient(135deg, ${yellow.light}, ${yellow.dark})`,
};
