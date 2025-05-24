import React from 'react';
import { Sun, Sunrise, Sunset, Eye, Droplets, Gauge, Wind } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Weather Details</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <DetailCard 
          icon={<Eye className="h-8 w-8 text-primary-500" />} 
          title="Visibility" 
          value={`${data.visibility} miles`} 
        />
        <DetailCard 
          icon={<Droplets className="h-8 w-8 text-blue-500" />} 
          title="Humidity" 
          value={`${data.humidity}%`} 
        />
        <DetailCard 
          icon={<Wind className="h-8 w-8 text-gray-500" />} 
          title="Wind" 
          value={`${data.windSpeed} mph ${data.windDirection}`} 
        />
        <DetailCard 
          icon={<Gauge className="h-8 w-8 text-purple-500" />} 
          title="Pressure" 
          value={`${data.pressure} hPa`} 
        />
      </div>
      
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sunrise className="h-6 w-6 text-orange-500 mr-2" />
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Sunrise</div>
              <div className="font-medium text-gray-900 dark:text-white">6:42 AM</div>
            </div>
          </div>
          
          <div className="flex-1 mx-4 relative">
            <div className="h-1 bg-gradient-to-r from-orange-300 to-yellow-300 dark:from-orange-600 dark:to-yellow-600 rounded-full">
              <div 
                className="absolute h-3 w-3 bg-yellow-500 rounded-full -mt-1"
                style={{ left: '70%' }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="text-right">
              <div className="text-xs text-gray-600 dark:text-gray-400">Sunset</div>
              <div className="font-medium text-gray-900 dark:text-white">8:25 PM</div>
            </div>
            <Sunset className="h-6 w-6 text-orange-500 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ icon, title, value }) => {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex flex-col items-center">
      <div className="mb-2">
        {icon}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="font-medium text-gray-900 dark:text-white">{value}</div>
    </div>
  );
};

export default WeatherDetails;