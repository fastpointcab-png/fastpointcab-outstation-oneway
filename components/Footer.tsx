import React from 'react';
import { Link } from 'react-router-dom';


export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Fleet', path: '/fleet' },
    { name: 'Tours', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 pt-10 pb-28 md:pb-10 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          
          {/* Brand & Desktop-only Highlights */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link to="/" onClick={handleScrollToTop} className="flex items-center gap-1 group">
               <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">Plan Your</span>
               <span className="text-xl font-black tracking-tighter text-brand-red uppercase">Cab Booking</span>
            </Link>
            
            {/* Desktop Highlights */}
            <div className="hidden md:flex items-center gap-3">
               <a 
                 href="https://www.fastpointcab.in/" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="px-3 py-1.5 bg-brand-red text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-brand-accent transition-colors"
               >
                 Local Booking
               </a>
               <a 
                 href="https://www.trustyyellowcabs.in/" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-lg text-[9px] font-black uppercase tracking-widest hover:border-brand-red/30 transition-colors"
               >
                 Partner Fleet
               </a>
            </div>
          </div>

          {/* Minimal Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={handleScrollToTop}
                className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-brand-red transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Bar & Mobile-only Highlights */}
        <div className="pt-8 border-t border-slate-50 dark:border-slate-900 flex flex-col items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-slate-700">
            &copy; © 2026 All Rights Reserved
          </p>
          
{/* Mobile-only Highlights: compact for all phones */}
<div className="flex md:hidden flex-wrap justify-center gap-2 w-full">

  <a 
    href="https://www.fastpointcab.in/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="px-3 py-1.5 bg-brand-red text-white rounded-full text-[10px] font-semibold uppercase tracking-wide"
  >
    fastpointcab.in
  </a>

  <a 
    href="https://www.trustyyellowcabs.in/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-full text-[10px] font-semibold uppercase tracking-wide"
  >
    trustyyellowcabs.in
  </a>

</div>
  <div className="flex gap-6">
            <Link to="/about" className="text-[9px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-700 hover:text-brand-red">Privacy</Link>
            <Link to="/contact" className="text-[9px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-700 hover:text-brand-red">Terms</Link>
            <Link to="/sitemap" className="text-[9px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-700 hover:text-brand-red">Sitemap</Link>
          </div>
    </div>

      </div>

      
    </footer>
  );
};