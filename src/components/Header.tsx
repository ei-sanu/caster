import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import LiveClock from './LiveClock';

interface NavItem {
  name: string;
  href: string;
  current: boolean;
  component?: React.FC;
}

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [navigation, setNavigation] = useState<NavItem[]>([
    { name: 'Home', href: '/', current: true },
    { name: 'Safety Measures', href: '/SafetyMeasures', current: false },
    { name: 'Caster AI ', href: '/caster', current: false },
    { name: 'News', href: '/news', current: false },
    { name: 'About', href: '/about', current: false },
    { name: 'Contact', href: '/contact', current: false },
  ]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // We'll implement search functionality later
    console.log(`Searching for: ${searchQuery}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl sm:text-2xl font-display font-bold text-primary-600 dark:text-primary-400">
                Weather<span className="text-accent-500">Cast</span>
              </span>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${item.current
                    ? 'border-primary-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
            <div className="hidden md:block">
              <LiveClock />
            </div>

            {/* <button
              type="button"
              className="ml-3 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              onClick={toggleSearch}
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button> */}

            <button
              type="button"
              className="ml-3 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute inset-0 z-50 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-4 pl-10 bg-gray-100 dark:bg-gray-800 border-none rounded-full focus:ring-2 focus:ring-primary-500 dark:text-white"
                  placeholder="Search for a city or zip code..."
                  autoFocus
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleSearch}
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${item.current
                    ? 'bg-primary-50 dark:bg-gray-700/50 border-primary-500 text-primary-700 dark:text-primary-300'
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-4">
                <LiveClock />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
