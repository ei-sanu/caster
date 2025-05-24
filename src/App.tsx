import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import Caster from './components/Caster';
import Contact from './components/Contact'; // Make sure this import matches the filename case
import Footer from './components/Footer';
import Header from './components/Header';
import News from './components/News';
import PrivacyPolicy from './components/PrivacyPolicy';
import SafetyMeasures from './components/SafetyMeasures';
import TermsOfService from './components/TermsOfService';
import WeatherDashboard from './components/WeatherDashboard';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
          <Header />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/SafetyMeasures" element={<SafetyMeasures />} />
              <Route path="/caster" element={<Caster />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
