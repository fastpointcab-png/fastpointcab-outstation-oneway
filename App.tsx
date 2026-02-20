import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Fleet } from './pages/Fleet';
import { Services } from './pages/Services';
import { Blog } from './pages/Blog';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FloatingCallButton } from './components/FloatingCallButton';
import { MobileBottomNav } from './components/MobileBottomNav';

// Component to handle scroll behavior globally
const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to element by state
    if ((location.state as any)?.scrollToBook) {
      const element = document.getElementById('book');
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }

    // Scroll to element by hash (optional, in case you still use #id links)
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }

    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash, location.state]);

  return null;
};

// Optional: redirect old hash URLs to clean paths
const HashRedirect = () => {
  useEffect(() => {
    if (window.location.hash) {
      const newPath = window.location.hash.replace('#', '');
      window.history.replaceState(null, '', newPath);
    }
  }, []);
  return null;
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <BrowserRouter>
      <HashRedirect />
      <ScrollHandler />
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark bg-slate-900' : 'bg-white'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <FloatingCallButton />
        <MobileBottomNav />
      </div>
    </BrowserRouter>
  );
};

export default App;