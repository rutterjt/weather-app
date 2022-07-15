type Nullable<T> = T | undefined | null;

export type Location = {
  name: string;
  lat: number;
  lon: number;
};

export type LocationData = {
  city: Nullable<string>;
  country: Nullable<string>;
  countryCode: Nullable<string>;
  id: Nullable<number>;
  latitude: Nullable<number>;
  longitude: Nullable<number>;
  name: Nullable<string>;
  population: Nullable<number>;
  region: Nullable<string>;
  regionCode: Nullable<string>;
  type: Nullable<string>;
  wikiDataId: Nullable<string>;
};

export type LocationQuery = {
  data: LocationData[];
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
};

type UnsuccessfulGeoResponse = {
  message: string;
};

export type GeoResponse = LocationQuery | UnsuccessfulGeoResponse;

// Weather types

type WeatherStump = {
  id: Nullable<number>;
  main: Nullable<string>;
  description: Nullable<string>;
  icon: Nullable<string>;
};

type MinuteForecast = {
  dt: Nullable<number>;
  precipitation: Nullable<number>;
};

type HourlyForecast = {
  dt: Nullable<number>;
  temp: Nullable<number>;
  feels_like: Nullable<number>;
  pressure?: Nullable<number>;
  humidity?: Nullable<number>;
  dew_point?: Nullable<number>;
  uvi?: Nullable<number>;
  clouds?: Nullable<number>;
  visibility?: Nullable<number>;
  wind_speed?: Nullable<number>;
  wind_gust?: Nullable<number>;
  wind_deg?: Nullable<number>;
  pop?: Nullable<number>;
  rain?: Nullable<{ '1h': Nullable<number> }>;
  snow?: Nullable<{ '1h': Nullable<number> }>;
  weather: WeatherStump[];
};

type DailyForecast = {
  dt: Nullable<number>;
  sunrise: Nullable<number>;
  sunset: Nullable<number>;
  moonrise: Nullable<number>;
  moonset: Nullable<number>;
  moon_phase: Nullable<number>;
  temp: {
    morn: Nullable<number>;
    day: Nullable<number>;
    eve: Nullable<number>;
    night: Nullable<number>;
    min: Nullable<number>;
    max: Nullable<number>;
  };
  feels_like: {
    morn: Nullable<number>;
    day: Nullable<number>;
    eve: Nullable<number>;
    night: Nullable<number>;
  };
  pressure?: Nullable<number>;
  humidity?: Nullable<number>;
  dew_point?: Nullable<number>;
  wind_speed?: Nullable<number>;
  wind_gust?: Nullable<number>;
  wind_deg?: Nullable<number>;
  clouds?: Nullable<number>;
  uvi?: Nullable<number>;
  pop?: Nullable<number>;
  rain?: Nullable<number>;
  snow?: Nullable<number>;
  weather: WeatherStump[];
};

type WeatherAlert = {
  sender_name?: Nullable<string>;
  event?: Nullable<string>;
  start?: Nullable<number>;
  end?: Nullable<number>;
  description?: Nullable<string>;
  tags?: unknown[];
};

export type WeatherData = {
  lat: Nullable<number>;
  lon: Nullable<number>;
  timezone: Nullable<string>;
  timezone_offset: Nullable<number>;
  current: {
    dt: Nullable<number>;
    sunrise: Nullable<number>;
    sunset: Nullable<number>;
    temp: Nullable<number>;
    feels_like: Nullable<number>;
    pressure?: Nullable<number>;
    humidity?: Nullable<number>;
    dew_point?: Nullable<number>;
    clouds?: Nullable<number>;
    uvi?: Nullable<number>;
    visibility?: Nullable<number>;
    wind_speed?: Nullable<number>;
    wind_gust?: Nullable<number>;
    wind_deg?: Nullable<number>;
    rain?: Nullable<{ '1h': Nullable<number> }>;
    snow?: Nullable<{ '1h': Nullable<number> }>;
    weather: WeatherStump[];
  };
  minutely: MinuteForecast[];
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts?: WeatherAlert[];
};

// see https://openweathermap.org/faq#error401
type UnsuccessfulWeatherResponse = {
  cod: 401 | 404 | 429 | 500 | 502 | 503 | 504;
  message: string;
};

export type WeatherResponse = WeatherData | UnsuccessfulWeatherResponse;
