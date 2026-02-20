
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/fleet', label: 'Fleet' },
    { path: '/services', label: 'Tours' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleBookClick = () => {
    setIsOpen(false);
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Text */}
          <Link
  to="/"
  onClick={handleScrollToTop}
  className="flex items-center gap-1 group"
>
  <span className="text-lg sm:text-2xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-brand-red transition-colors uppercase">
    Book
  </span>

  <span className="text-lg sm:text-2xl font-black tracking-tighter text-brand-red transition-colors uppercase">
    -Your Cab
  </span>
</Link>


          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleScrollToTop}
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-brand-red ${
                  isActive(link.path) 
                    ? 'text-brand-red dark:text-brand-pink' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-brand-pink border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link 
              to="/#book" 
              onClick={handleBookClick}
              className="bg-brand-red text-white px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-red/20 hover:bg-brand-accent active:scale-95"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="md:hidden flex items-center gap-3">
             <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-brand-pink border border-slate-200 dark:border-slate-700"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-12 h-12 flex flex-col items-center justify-center bg-brand-red rounded-2xl shadow-lg transition-transform active:scale-90 focus:outline-none overflow-hidden"
            >
              <div className="relative w-5 h-4">
                <span 
                  className={`absolute left-0 w-full h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${
                    isOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span 
                  className={`absolute left-0 w-3/4 h-0.5 bg-white rounded-full transition-all duration-300 ease-out top-1.5 ${
                    isOpen ? 'opacity-0 -translate-x-full' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`absolute left-0 w-full h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${
                    isOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={`fixed inset-0 top-20 z-[90] md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-slate-950/20 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />
        
        <div 
          className={`absolute top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-transform duration-500 ease-in-out transform ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="px-6 py-10 space-y-2">
            {links.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleScrollToTop}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className={`flex items-center justify-between px-5 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all transform ${
                  isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                } ${
                  isActive(link.path)
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
                <div className={`w-1.5 h-1.5 rounded-full ${isActive(link.path) ? 'bg-white' : 'bg-transparent'}`} />
              </Link>
            ))}
            
            <div className={`pt-8 transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <Link
                to="/#book"
                onClick={handleBookClick}
                className="flex items-center justify-center w-full bg-brand-red text-white px-6 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-brand-red/20 active:scale-95"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
