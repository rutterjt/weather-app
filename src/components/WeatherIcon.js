import React from 'react';

// icons
import {
  FaCloudSun,
  FaCloudMoon,
  FaCloud,
  FaSun,
  FaMoon,
  FaRegSnowflake,
  FaCloudShowersHeavy,
} from 'react-icons/fa';

// Fog
// Mix
// Hail
// Thunderstorm

const WeatherIcon = ({ code, timeOfDay }) => {
  // probably a better way to do this, but this'll do for now
  // if (code === 804) {
  //   src = HeavyClouds;
  // } else if (code === 803) {
  //   src = LightClouds;
  // } else if (code === 802 || code === 801) {
  //   if (timeOfDay === 'night') {
  //     src = MoonClouds;
  //   } else {
  //     src = SunClouds;
  //   }
  // } else if (code === 800) {
  //   if (timeOfDay === 'night') {
  //     src = MoonStars;
  //   } else {
  //     src = Sun;
  //   }
  // } else if (code >= 700) {
  //   src = Fog;
  // } else if (code >= 600) {
  //   if (code === 616 || code === 615) {
  //     src = Mix;
  //   } else if (code >= 611 && code <= 613) {
  //     src = Hail;
  //   } else {
  //     src = Snow;
  //   }
  // } else if (code >= 300) {
  //   if (code === 511) {
  //     src = Mix;
  //   } else {
  //     src = Rain;
  //   }
  // } else if (code >= 200) {
  //   src = ThunderstormDark;
  // } else {
  //   src = Rainbow;
  // }
  return <FaCloudSun style={{ fontSize: '1.5rem' }} />;
};

export default WeatherIcon;
