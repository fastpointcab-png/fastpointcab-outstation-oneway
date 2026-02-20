
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Car, Calendar, MessageSquare, Phone } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const handleBookClick = () => {
    const element = document.getElementById('book');
    if (element) {
      // Explicitly scroll to top of element
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/fleet', icon: Car, label: 'Fleet' },
    { path: '/#book', icon: Calendar, label: 'Book', highlight: true },
    { path: '/contact', icon: MessageSquare, label: 'Contact' },
    { path: 'tel:+919488834020', icon: Phone, label: 'Call', isExternal: true },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] px-3 pb-3 pointer-events-none">
      <nav className="flex items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] h-14 px-1 pointer-events-auto">
        {navItems.map((item) => {
          const active = !item.isExternal && (isActive(item.path) || (item.path === '/#book' && location.hash === '#book'));
          const Icon = item.icon;

          const commonClasses = `flex flex-col items-center justify-center h-full flex-1 transition-all active:scale-90 ${
            active 
              ? 'text-brand-red' 
              : 'text-slate-400 dark:text-slate-500'
          }`;

          if (item.highlight) {
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleBookClick}
                className="flex flex-col items-center justify-center h-full flex-1 group transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-brand-red to-brand-pink rounded-xl shadow-md shadow-brand-red/10 flex items-center justify-center text-white transform transition-all active:scale-90">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <span className={`text-[7px] font-black uppercase tracking-widest mt-0.5 ${active ? 'text-brand-red' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </Link>
            );
          }

          if (item.isExternal) {
            return (
              <a
                key={item.path}
                href={item.path}
                className={commonClasses}
              >
                <div className="p-1 rounded-lg">
                  <Icon size={18} strokeWidth={2} />
                </div>
                <span className="text-[7px] font-black uppercase tracking-tighter">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={commonClasses}
            >
              <div className={`p-1 rounded-lg transition-colors ${active ? 'bg-brand-red/10' : ''}`}>
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className="text-[7px] font-black uppercase tracking-tighter">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
