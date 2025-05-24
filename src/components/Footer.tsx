import { Bookmark, Cloud, CloudLightning, CloudRain, ExternalLink, Github, Globe, Heart, Instagram, Mail, Smile, Twitter, Waves } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Weather<span className="text-accent-500">Cast</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Providing accurate weather forecasts and predictions to keep you prepared for any conditions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Weather</h3>
              <ul className="space-y-3">
                <FooterLink icon={<Cloud className="h-4 w-4" />} text="Today's Forecast" to='/'/>
                <FooterLink icon={<CloudRain className="h-4 w-4" />} text="Precipitation" to='/'/>
                <FooterLink icon={<Globe className="h-4 w-4" />} text="Radar Maps"to='/' />
                <FooterLink icon={<CloudLightning className="h-4 w-4" />} text="Severe Weather" to='/'/>
                <FooterLink icon={<Waves className="h-4 w-4" />} text="Hurricane Center" to='/'/>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
              <ul className="space-y-3">
                <FooterLink icon={<Bookmark className="h-4 w-4" />} text="Saved Locations" to='/' />
                <FooterLink icon={<ExternalLink className="h-4 w-4" />} text="Weather News" to='/' />
                <FooterLink icon={<CloudRain className="h-4 w-4" />} text="Rainfall Forecast" to='/'/>
                <FooterLink icon={<Thermometer className="h-4 w-4" />} text="Climate Data" to='/'/>
                <FooterLink icon={<Wind className="h-4 w-4" />} text="Air Quality" to='/'/>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <FooterLink text="About Us" to="/about" />
                <FooterLink text="Privacy Policy" to="/privacy" />
                <FooterLink text="Terms of Service" to="/terms" />
                <FooterLink text="Contact Us" to="/contact" />
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} WeatherCast. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span>for weather enthusiasts</span>
              <div className="ml-4 flex items-center border-l border-gray-300 dark:border-gray-600 pl-4">
                <Smile className="h-4 w-4 text-yellow-500 mr-1" />
                <a
                  href="https://somesh.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  made by somesh.social
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  icon?: React.ReactNode;
  text: string;
  to?: string; // Add optional 'to' prop for routing
}

const FooterLink: React.FC<FooterLinkProps> = ({ icon, text, to }) => {
  const className = "flex items-center text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors";

  // If 'to' prop is provided, use Link component, otherwise use anchor tag
  return (
    <li>
      {to ? (
        <Link to={to} className={className}>
          {icon && <span className="mr-2 text-gray-500 dark:text-gray-500">{icon}</span>}
          <span className="text-sm">{text}</span>
        </Link>
      ) : (
        <a href="#" className={className}>
          {icon && <span className="mr-2 text-gray-500 dark:text-gray-500">{icon}</span>}
          <span className="text-sm">{text}</span>
        </a>
      )}
    </li>
  );
};

// Add these components here since they're missing
const Thermometer: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
  </svg>
);

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

export default Footer;
