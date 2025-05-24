export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionIcon: string;
  windSpeed: number;
  windDirection: string;
  humidity: number;
  pressure: number;
  uvIndex: number;
  visibility: number;
  lastUpdated: string;
}

export interface ForecastData {
  date: string;
  day: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  conditionIcon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export type WeatherCondition =
  | 'Clear'
  | 'Sunny'
  | 'Partly cloudy'
  | 'Cloudy'
  | 'Overcast'
  | 'Mist'
  | 'Fog'
  | 'Rain'
  | 'Drizzle';

export interface LocationSuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  isPostalCode?: boolean;
  postalCode?: string;
}
