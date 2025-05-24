import axios from 'axios';
import { ForecastData, WeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${location}&units=metric&APPID=${API_KEY}`
    );

    return {
      location: response.data.name,
      country: response.data.sys.country,
      temperature: `${Math.round(response.data.main.temp)}°C`,
      feelsLike: `${Math.round(response.data.main.feels_like)}°C`,
      condition: response.data.weather[0].main,
      conditionIcon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      windSpeed: response.data.wind.speed,
      windDirection: response.data.wind.deg,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      uvIndex: response.data.uvi || 0, // Assuming uvi is part of the response
      visibility: response.data.visibility / 1000, // Convert meters to kilometers
      lastUpdated: new Date(response.data.dt * 1000).toISOString(),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchForecast = async (location: string): Promise<ForecastData[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${location}&units=metric&APPID=${API_KEY}`
    );

    const groupedData: { [key: string]: { temps: number[]; conditions: string[] } } = {};
    response.data.list.forEach((entry: any) => {
      const date = entry.dt_txt.split(' ')[0];
      if (!groupedData[date]) {
        groupedData[date] = { temps: [], conditions: [] };
      }
      groupedData[date].temps.push(entry.main.temp);
      groupedData[date].conditions.push(entry.weather[0].main);
    });

    const dailyForecasts: ForecastData[] = [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getMostFrequent = (arr: string[]): string => {
      const frequency: { [key: string]: number } = {};
      arr.forEach((item) => {
        frequency[item] = (frequency[item] || 0) + 1;
      });
      return Object.keys(frequency).reduce((a, b) => (frequency[a] > frequency[b] ? a : b));
    };

    Object.entries(groupedData).slice(0, 5).forEach(([date, data]: [string, any], index) => {
      const dayDate = new Date(date);
      dailyForecasts.push({
        date,
        day: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : days[dayDate.getDay()],
        maxTemp: `${Math.round(Math.max(...data.temps))}°C`,
        minTemp: `${Math.round(Math.min(...data.temps))}°C`,
        condition: getMostFrequent(data.conditions),
        conditionIcon: '', // Assuming conditionIcon is not available in the response
        precipitation: 0, // Assuming precipitation is not available in the response
        humidity: 0, // Assuming humidity is not available in the response
        windSpeed: 0, // Assuming windSpeed is not available in the response
      });
    });

    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
