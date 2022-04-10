const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    transitionDuration: {
      DEFAULT: '300ms',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      lightBlue: {
        light: '#00d5ff',
        dark: '#00a7c9',
        text: '#000000',
      },
      medBlue: {
        light: '#0da6f2',
        dark: '#0a81bd',
        text: '#000000',
      },
      darkBlue: {
        light: '#005496',
        dark: '#003359',
        text: '#ffffff',
      },
      cyan: {
        light: '#9DDEF2',
        dark: '#4D9ECC',
        text: '#000000',
      },
      darkCyan: {
        light: '#2E759E',
        dark: '#225877',
        text: '#ffffff',
      },
      purple: {
        light: '#7b6eaa',
        dark: '#4f486a',
        text: '#ffffff',
      },
      green: {
        light: '#33c986',
        dark: '#009e91',
        text: '#000000',
      },
      yellow: {
        light: '#ffc543',
        dark: '#ff8c00',
        text: '#000000',
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        number: ['Nunito', ...defaultTheme.fontFamily.sans],
        heading: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
