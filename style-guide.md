# Style Guide for Weather App

## Background Styles

The main background styles are mostly gradients. Their colors depend on the time of day and current weather event.

Times of day:

- Day
- Sunrise/Sunset
- Night

Weather Categories:

- Clear (code 800)
- Clouds (codes 8xx [except 800]: e.g. scattered clouds, overcast)
- Snow (codes 511, 6xx: e.g. snow, freezing rain, rain and snow, sleet)
- Rain (codes 3xx, 5xx [except 511]: e.g. drizzle, light rain, moderate rain)
- Thunderstorms (codes 2xx)
- Atmosphere (code 7xx: e.g. mist, fog, haze, dust, tornado)

Backgrounds:

- Day (Clear, Clouds): linear-gradient(-45deg, #00D5FF, #00A7C9)
- Day (Snow), Sunrise/Sunset (Snow): linear-gradient(-45deg, #9DDEF2, #4D9ECC)
- Night (Clear, Clouds, Rain): linear-gradient(-45deg, #005496, #003359)
- Sunrise/Sunset (Clear, Clouds): linear-gradient(-45deg, #FFC543, #FF8C00)
- All (Thunderstorms) / Night (Atmosphere): linear-gradient(-45deg, #8D82B6, #605880)
- Day (Atmosphere), Sunrise/Sunset (Atmosphere): linear-gradient(-45deg, #33C986, #009E91)

Still need:

- Day (Rain), Sunrise / Sunset (Rain): make slightly darker and greyer than Day (Clear)
- Night (snow): make slightly darker than Day (Snow), but not by much
