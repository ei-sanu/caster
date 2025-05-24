import React from 'react';
import { MapPin, Calendar, Clock, CloudRain, Sun, Cloud, CloudSun, CloudFog, Thermometer } from 'lucide-react';
import { format } from 'date-fns';
import { WeatherData } from '../types/weather';

interface CurrentWeatherProps {
  data: WeatherData;
}

// Helper function to get the right weather icon
const getWeatherIcon = (condition: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Clear': <Sun className="h-20 w-20 text-yellow-500" />,
    'Sunny': <Sun className="h-20 w-20 text-yellow-500" />,
    'Partly cloudy': <CloudSun className="h-20 w-20 text-gray-500" />,
    'Cloudy': <Cloud className="h-20 w-20 text-gray-500" />,
    'Overcast': <Cloud className="h-20 w-20 text-gray-600" />,
    'Mist': <CloudFog className="h-20 w-20 text-gray-400" />,
    'Fog': <CloudFog className="h-20 w-20 text-gray-400" />,
    'Rain': <CloudRain className="h-20 w-20 text-blue-500" />,
    'Drizzle': <CloudRain className="h-20 w-20 text-blue-400" />,
  };

  return iconMap[condition] || <Cloud className="h-20 w-20 text-gray-500" />;
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="p-6 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-800 dark:to-primary-900 rounded-xl shadow-lg text-white">
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center mb-2">
          <MapPin className="h-5 w-5 mr-2" />
          <h2 className="text-xl font-semibold">{data.location}, {data.country}</h2>
        </div>
        <div className="text-sm opacity-80">
          Last updated: {format(new Date(data.lastUpdated), 'h:mm a')}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-4 transform transition-transform hover:scale-105 animate-float">
          {getWeatherIcon(data.condition)}
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="text-5xl font-bold">{data.temperature}</span>
            {/* <span className="text-3xl">°F</span> */}
          </div>
          <div className="text-xl mt-1">{data.condition}</div>
          <div className="mt-2 text-sm opacity-80">
            Feels like {data.feelsLike}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center text-xs opacity-80 mb-1">
            <Thermometer className="h-4 w-4 mr-1" />
            <span>HUMIDITY</span>
          </div>
          <span className="text-lg font-medium">{data.humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center text-xs opacity-80 mb-1">
            <Wind className="h-4 w-4 mr-1" />
            <span>WIND</span>
          </div>
          <span className="text-lg font-medium">{data.windSpeed} mph</span>
        </div>
      </div>
    </div>
  );
};

// Add this component here since it's missing
const Wind: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
  </svg>
);

export default CurrentWeather;
