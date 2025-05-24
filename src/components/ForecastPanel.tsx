import React from 'react';
import { Sun, Cloud, CloudSun, CloudRain, Droplets } from 'lucide-react';
import { ForecastData } from '../types/weather';

interface ForecastPanelProps {
  forecast: ForecastData[];
}

// Helper function to get the right weather icon
const getWeatherIcon = (condition: string, className: string = "h-10 w-10") => {
  const iconMap: Record<string, React.ReactNode> = {
    'Clear': <Sun className={`${className} text-yellow-500`} />,
    'Sunny': <Sun className={`${className} text-yellow-500`} />,
    'Partly cloudy': <CloudSun className={`${className} text-gray-500`} />,
    'Cloudy': <Cloud className={`${className} text-gray-500`} />,
    'Overcast': <Cloud className={`${className} text-gray-600`} />,
    'Rain': <CloudRain className={`${className} text-blue-500`} />,
    'Drizzle': <CloudRain className={`${className} text-blue-400`} />,
  };

  return iconMap[condition] || <Cloud className={`${className} text-gray-500`} />;
};

const ForecastPanel: React.FC<ForecastPanelProps> = ({ forecast }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">5-Day Forecast</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div 
            key={day.date} 
            className={`p-4 rounded-lg flex flex-col items-center ${
              index === 0 
                ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800' 
                : 'bg-gray-50 dark:bg-gray-700/50'
            }`}
          >
            <div className="font-medium text-gray-900 dark:text-white mb-2">
              {day.day}
            </div>
            
            <div className="my-2 transform transition hover:scale-110">
              {getWeatherIcon(day.condition)}
            </div>
            
            <div className="flex items-center justify-center space-x-2 mt-2">
              <span className="font-bold text-gray-900 dark:text-white">{day.maxTemp}°</span>
              <span className="text-gray-500 dark:text-gray-400">{day.minTemp}°</span>
            </div>
            
            <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Droplets className="h-3 w-3 mr-1" />
              <span>{day.precipitation}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastPanel;