import { AlertTriangle, MapPin, Search as SearchIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import useDebounce from '../hooks/useDebounce';
import { fetchForecast, fetchLocationSuggestions, fetchWeatherData } from '../services/weatherService';
import { ForecastData, LocationSuggestion, WeatherData } from '../types/weather';
import CurrentWeather from './CurrentWeather';
import ForecastPanel from './ForecastPanel';
import WeatherDetails from './WeatherDetails';
import WeatherHighlights from './WeatherHighlights';

const WeatherDashboard: React.FC = () => {
  const { theme } = useTheme();
  const [location, setLocation] = useState('New York');
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate loading
        const timer = setTimeout(async () => {
          const weather = await fetchWeatherData(location);
          const forecast = await fetchForecast(location);

          setWeatherData(weather);
          setForecastData(forecast);
          setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearch.length >= 2) {
        setIsLoading(true);
        const results = await fetchLocationSuggestions(debouncedSearch);
        setSuggestions(results);
        setIsLoading(false);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      // Check if the input contains coordinates
      if (searchInput.includes(',')) {
        setLocation(searchInput);
      } else {
        // For city searches, use the city name directly
        setLocation(searchInput.split(',')[0]); // Take just the city name
      }
      setSearchInput('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    setSearchInput(`${suggestion.name}, ${suggestion.country}`);
    setShowSuggestions(false);
    setLocation(`${suggestion.lat},${suggestion.lon}`);
  };

  const renderSuggestionContent = (suggestion: LocationSuggestion) => {
    if (suggestion.isPostalCode) {
      return (
        <>
          <MapPin className="h-4 w-4 text-gray-400" />
          <div>
            <span className="text-gray-900 dark:text-white">
              {suggestion.name} ({suggestion.postalCode})
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">
              {suggestion.country}
            </span>
          </div>
        </>
      );
    }

    return (
      <>
        <MapPin className="h-4 w-4 text-gray-400" />
        <div>
          <span className="text-gray-900 dark:text-white">
            {suggestion.name}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">
            {suggestion.state && `${suggestion.state},`} {suggestion.country}
          </span>
        </div>
      </>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary-300 dark:bg-primary-700 mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error</h3>
          <p className="mt-2 text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={() => setLocation('New York')}
            className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Weather Dashboard
        </h1>
        <div ref={searchRef} className="relative max-w-xs w-full">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by city or PIN code..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <button type="submit" className="hidden">Search</button>
          </form>

          {/* Suggestions dropdown */}
          {showSuggestions && (searchInput.length >= 2) && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
              {isLoading ? (
                <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Loading...
                </div>
              ) : suggestions.length > 0 ? (
                <ul className="max-h-60 overflow-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={`${suggestion.name}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2 text-sm"
                    >
                      {renderSuggestionContent(suggestion)}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  No locations found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {weatherData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <CurrentWeather data={weatherData} />

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Weather Alerts</h2>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Heat Advisory</h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      A heat advisory is in effect from 12 PM to 8 PM EDT. Take precautions if you plan to be outside.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {forecastData && <ForecastPanel forecast={forecastData} />}
            <WeatherHighlights data={weatherData} />
            <WeatherDetails data={weatherData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
