
import React from 'react';
import { Phone } from 'lucide-react';

export const FloatingCallButton: React.FC = () => {
  return (
    <a
      href="tel:+919488834020"
      /* Positioned on the right side above the mobile nav */
      className="fixed bottom-20 md:bottom-6 right-6 z-50 group"
      aria-label="Call Now"
    >
      <div className="absolute inset-0 bg-brand-red rounded-full animate-ping opacity-25 group-hover:opacity-50"></div>
      <div className="relative bg-gradient-to-r from-brand-red to-brand-pink text-white p-3.5 rounded-full shadow-xl shadow-brand-red/40 hover:shadow-brand-red/60 transform transition-all duration-300 hover:scale-110 flex items-center justify-center">
        <Phone size={24} className="animate-pulse-slow" />
      </div>
    </a>
  );
};
