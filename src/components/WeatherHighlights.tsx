import React from 'react';
import { Sun, Thermometer, Droplets, Wind } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherHighlightsProps {
  data: WeatherData;
}

const WeatherHighlights: React.FC<WeatherHighlightsProps> = ({ data }) => {
  // Calculate UV Index severity
  const getUVIndexColor = (uv: number) => {
    if (uv <= 2) return 'text-green-500';
    if (uv <= 5) return 'text-yellow-500';
    if (uv <= 7) return 'text-orange-500';
    return 'text-red-500';
  };

  const getUVIndexDescription = (uv: number) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  // Calculate percentage for progress bars
  const uvPercentage = (data.uvIndex / 12) * 100; // 12 is max UV
  const humidityPercentage = data.humidity;
  const visibilityPercentage = (data.visibility / 10) * 100; // 10 miles is max visibility

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Today's Highlights</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* UV Index */}
        <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-gray-700 dark:text-gray-300">UV Index</h3>
            <Sun className="h-6 w-6 text-yellow-500" />
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-3xl font-bold ${getUVIndexColor(data.uvIndex)}`}>
              {data.uvIndex}
            </span>
            <span className={`text-sm font-medium ${getUVIndexColor(data.uvIndex)}`}>
              {getUVIndexDescription(data.uvIndex)}
            </span>
          </div>
          
          <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full ${
                getUVIndexColor(data.uvIndex).replace('text-', 'bg-')
              }`}
              style={{ width: `${uvPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
            <span>0</span>
            <span>3</span>
            <span>6</span>
            <span>9</span>
            <span>12</span>
          </div>
        </div>
        
        {/* Feels Like */}
        <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-gray-700 dark:text-gray-300">Feels Like</h3>
            <Thermometer className="h-6 w-6 text-red-500" />
          </div>
          
          <div className="text-center my-8">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              {data.feelsLike}°
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {data.feelsLike > data.temperature ? 'Feels warmer due to humidity' : 
               data.feelsLike < data.temperature ? 'Feels cooler due to wind' : 
               'Feels exactly like the actual temperature'}
            </p>
          </div>
        </div>
        
        {/* Humidity */}
        <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-gray-700 dark:text-gray-300">Humidity</h3>
            <Droplets className="h-6 w-6 text-blue-500" />
          </div>
          
          <div className="text-center mb-4">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              {data.humidity}%
            </span>
          </div>
          
          <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500"
              style={{ width: `${humidityPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        
        {/* Visibility */}
        <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-gray-700 dark:text-gray-300">Visibility</h3>
            <Eye className="h-6 w-6 text-primary-500" />
          </div>
          
          <div className="text-center mb-4">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              {data.visibility} <span className="text-lg">miles</span>
            </span>
          </div>
          
          <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary-500"
              style={{ width: `${visibilityPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
            <span>0</span>
            <span>5</span>
            <span>10+ miles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this component here since it's missing
const Eye: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default WeatherHighlights;