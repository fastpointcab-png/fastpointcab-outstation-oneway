import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ALL_SEO_PAGES } from '../data/seoPages';
import { MapPin, Clock, Navigation, Shield, Star, Phone, ChevronRight } from 'lucide-react';
import { BookingForm } from '../components/BookingForm';

export const RouteDetail: React.FC = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const page = ALL_SEO_PAGES.find((p) => p.id === routeId);

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-4">Page Not Found</h1>
        <Link to="/" className="text-brand-red font-bold uppercase tracking-widest text-xs border-b-2 border-brand-red pb-1">Back to Home</Link>
      </div>
    );
  }

  const relatedPages = ALL_SEO_PAGES
    .filter((p) => p.id !== routeId && p.category === page.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-rose-950 to-slate-900 opacity-90"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-brand-pink rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md">
              <Navigation size={10} className="text-brand-red" />
              <span>{page.category.toUpperCase()} SPECIALIST</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
              {page.title}
            </h1>
            <p className="text-slate-300 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
              {page.description} Book your {page.title} starting from just <span className="text-white font-black">{page.priceStart || 'Competitive Rates'}</span>.
            </p>

            {page.category === 'route' && (
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                  <Shield size={14} className="text-brand-red" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Safe & Secure</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                  <Clock size={14} className="text-brand-red" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">24/7 Support</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Flex container to allow mobile-first booking form */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12">

          {/* Booking Form on Mobile */}
          <div className="lg:hidden mb-8">
            <div className="bg-slate-900 p-1 rounded-[2rem] shadow-2xl">
              <BookingForm />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12 order-2 lg:order-1">
            {/* Page Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <Shield size={24} className="text-brand-red mb-4" />
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase mb-2">Safe & Reliable</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Our drivers are background-verified and experts in {page.title}. We ensure a safe journey for families and solo travelers.
                </p>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <Star size={24} className="text-brand-red mb-4" />
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase mb-2">Transparent Pricing</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  No hidden charges. The price we quote for your {page.title} is what you pay. Tolls and parking are clearly explained.
                </p>
              </div>
            </div>

            {/* SEO Content Section */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Why Choose FastPoint for {page.title}?</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Choosing the right taxi service for {page.title} is crucial for a stress-free travel experience. At FastPoint Cab, we prioritize your comfort and safety above all else. Our dedicated team works around the clock to ensure that every trip is smooth and enjoyable.
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 list-none p-0">
                <li className="flex items-center gap-2"><Shield size={14} className="text-brand-red" /> Door-to-door pickup and drop service.</li>
                <li className="flex items-center gap-2"><Shield size={14} className="text-brand-red" /> Well-maintained, sanitized vehicles for every trip.</li>
                <li className="flex items-center gap-2"><Shield size={14} className="text-brand-red" /> Professional drivers with extensive knowledge.</li>
                <li className="flex items-center gap-2"><Shield size={14} className="text-brand-red" /> 24/7 customer support for any assistance.</li>
              </ul>
            </div>
          </div>

          {/* Sidebar for Desktop */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="hidden lg:block sticky top-24">
              <div className="bg-slate-900 p-1 rounded-[2rem] shadow-2xl">
                <BookingForm />
              </div>

              {/* Related Pages */}
              {relatedPages.length > 0 && (
                <div className="mt-12 bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Navigation size={14} className="text-brand-red" /> Similar Services
                  </h3>
                  <div className="space-y-4">
                    {relatedPages.map((p) => (
                      <Link 
                        key={p.id} 
                        to={`/taxi/${p.id}`}
                        className="flex justify-between items-center group py-3 border-b border-slate-200 dark:border-slate-800 last:border-0 hover:translate-x-1 transition-transform"
                      >
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-xs group-hover:text-brand-red transition-colors">{p.title}</span>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-brand-red transition-colors" />
                      </Link>
                    ))}
                  </div>
                  <Link to="/sitemap" className="block text-center mt-6 text-[10px] font-black text-brand-red uppercase tracking-widest hover:underline">View Sitemap</Link>
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 p-8 bg-brand-red rounded-[2rem] text-white text-center shadow-xl shadow-brand-red/20">
                <Phone size={32} className="mx-auto mb-4" />
                <h4 className="text-lg font-black uppercase mb-2">Need Help?</h4>
                <p className="text-white/80 text-xs font-bold uppercase tracking-tight mb-6">Talk to our travel expert now</p>
                <a href="tel:+919488834020" className="block w-full py-3 bg-white text-brand-red rounded-xl font-black text-xs uppercase tracking-widest">Call +91 94888 34020</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};