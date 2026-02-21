
import React, { useState, useEffect } from 'react';
import {  BrowserRouter, Routes, Route, HashRouter, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Fleet } from './pages/Fleet';
import { Services } from './pages/Services';
import { Blog } from './pages/Blog';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { RouteDetail } from './pages/RouteDetail';
import { Sitemap } from './pages/Sitemap';
import { FloatingCallButton } from './components/FloatingCallButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Breadcrumbs } from './components/Breadcrumbs';

// Component to handle scroll behavior globally
const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Priority 1: Check for explicit scroll request via state (e.g., from Fleet page)
    if ((location.state as any)?.scrollToBook) {
      const element = document.getElementById('book');
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }

    // Priority 2: If there's a hash (like #book), scroll to that element
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
    
    // Priority 3: Otherwise, scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash, location.state]);

  return null;
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

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
      <ScrollHandler />
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark bg-slate-900' : 'bg-white'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Breadcrumbs />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/taxi/:routeId" element={<RouteDetail />} />
            <Route path="/sitemap" element={<Sitemap />} />
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
