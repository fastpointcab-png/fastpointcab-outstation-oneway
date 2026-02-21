
import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_SEO_PAGES, PageCategory } from '../data/seoPages';
import { MapPin, Plane, Car, Navigation, Briefcase, ChevronRight } from 'lucide-react';

export const Sitemap: React.FC = () => {
  const categories: { type: PageCategory; label: string; icon: any }[] = [
    { type: 'route', label: 'Outstation Routes', icon: <Navigation size={18} /> },
    { type: 'airport', label: 'Airport Services', icon: <Plane size={18} /> },
    { type: 'service', label: 'Core Services', icon: <Briefcase size={18} /> },
    { type: 'vehicle', label: 'Vehicle Types', icon: <Car size={18} /> },
    { type: 'local', label: 'Local Areas', icon: <MapPin size={18} /> },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
      {/* Header */}
      <section className="relative py-16 md:py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-rose-950 to-slate-900 opacity-90"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            Sitemap & <span className="text-brand-red">All Routes</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-medium max-w-2xl mx-auto uppercase tracking-widest">
            Explore all our taxi services and outstation routes from Coimbatore.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((cat) => {
            const pages = ALL_SEO_PAGES.filter((p) => p.category === cat.type);
            if (pages.length === 0) return null;

            return (
              <div key={cat.type} className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-brand-red rounded-xl">
                    {cat.icon}
                  </div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{cat.label}</h2>
                </div>
                
                <div className="grid gap-3">
                  {pages.map((page) => (
                    <Link 
                      key={page.id} 
                      to={`/taxi/${page.id}`}
                      className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-brand-red/30 hover:shadow-md transition-all"
                    >
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-brand-red transition-colors">{page.title}</span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-brand-red transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
