import React, { useState } from 'react';
import { BookingForm } from '../components/BookingForm';
import { TESTIMONIALS_DATA } from '../constants';
import { Star, Shield, Clock, MapPin, Navigation, ChevronDown, ChevronUp, Globe, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const [showAllRoutes, setShowAllRoutes] = useState(false);

  // Split testimonials into two groups dynamically
  const midPoint = Math.ceil(TESTIMONIALS_DATA.length / 2);
  const firstRow = TESTIMONIALS_DATA.slice(0, midPoint);
  const secondRow = TESTIMONIALS_DATA.slice(midPoint);

  const seoRoutes = [
    { name: 'Coimbatore to Ooty', distance: '86 KM', time: '3 Hours' },
    { name: 'Coimbatore to Kodaikanal', distance: '175 KM', time: '5 Hours' },
    { name: 'Coimbatore to Munnar', distance: '156 KM', time: '4.5 Hours' },
    { name: 'Coimbatore to Palani', distance: '110 KM', time: '2.5 Hours' },
    { name: 'Coimbatore to Madurai', distance: '210 KM', time: '4.5 Hours' },
    { name: 'Coimbatore to Kochi', distance: '190 KM', time: '4 Hours' },
    { name: 'Coimbatore to Valparai', distance: '105 KM', time: '3.5 Hours' },
    { name: 'Coimbatore to Wayanad', distance: '215 KM', time: '6 Hours' },
    { name: 'Coimbatore to Mysuru', distance: '200 KM', time: '5 Hours' },
    { name: 'Coimbatore to Bengaluru', distance: '360 KM', time: '7 Hours' },
    { name: 'Coimbatore to Yercaud', distance: '195 KM', time: '4.5 Hours' },
    { name: 'Coimbatore to Pondicherry', distance: '380 KM', time: '8 Hours' },
    { name: 'Coimbatore to Chennai', distance: '510 KM', time: '9 Hours' },
    { name: 'Coimbatore to Guruvayur', distance: '140 KM', time: '3.5 Hours' },
    { name: 'Coimbatore to Erode', distance: '65 KM', time: '1.5 Hours' },
    { name: 'Coimbatore to Salem', distance: '165 KM', time: '3 Hours' },
    { name: 'Coimbatore to Tiruchirappalli', distance: '215 KM', time: '4 Hours' },
    { name: 'Coimbatore to Palakkad', distance: '55 KM', time: '1 Hour' },
    { name: 'Coimbatore to Thrissur', distance: '115 KM', time: '2.5 Hours' },
    { name: 'Coimbatore to Rameshwaram', distance: '385 KM', time: '8.5 Hours' },
    { name: 'Coimbatore to Kanyakumari', distance: '445 KM', time: '9 Hours' },
    { name: 'Coimbatore to Thanjavur', distance: '270 KM', time: '5.5 Hours' },
    { name: 'Coimbatore to Velankanni', distance: '355 KM', time: '7.5 Hours' },
    { name: 'Coimbatore to Sabarimala', distance: '260 KM', time: '6.5 Hours' },
  ];

  const visibleRoutes = showAllRoutes ? seoRoutes : seoRoutes.slice(0, 6);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen lg:min-h-[90vh] flex items-center justify-center bg-slate-900 overflow-hidden py-8 lg:py-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-rose-950 to-slate-900"></div>
          <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-brand-red/30 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute top-[40%] -right-[10%] w-[400px] h-[400px] bg-brand-pink/20 rounded-full blur-[100px] mix-blend-screen"></div>
          <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[400px] bg-rose-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Booking Form - Visualized First on Mobile */}
          <div id="book" className="w-full flex flex-col justify-center order-1 lg:order-2 scroll-mt-[110px] lg:scroll-mt-32">
            <BookingForm />
          </div>

          {/* Hero Text - Visualized Second on Mobile */}
          <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-brand-pink rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md shadow-lg mx-auto lg:mx-0">
              <Star size={10} className="fill-brand-red text-brand-red" />
              <span>FastPoint Cab Outstation</span>
            </div>
            
            <h1 className="text-3xl md:text-6xl font-extrabold text-white leading-[1.1] drop-shadow-lg">
              Outstation Cabs <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-pink uppercase tracking-tighter">Coimbatore</span>
            </h1>
            
            <p className="text-base text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Premier Coimbatore outstation cab service providing affordable one-way taxis and reliable long-distance travel with 24/7 reliability.
            </p>

            <div className="flex flex-row gap-3 justify-center lg:justify-start items-center">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm font-bold uppercase tracking-widest text-[9px] text-slate-400">
                <Shield size={12} className="text-brand-red" /> Safe Drive
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm font-bold uppercase tracking-widest text-[9px] text-slate-400">
                <Clock size={12} className="text-brand-red" /> 24/7 Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coimbatore Specialist - Streamlined for Mobile */}
      <section className="py-12 md:py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
                Outstation Specialist <br/>
                <span className="text-brand-red">Coimbatore</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-md">
                Safe, reliable long-distance travel across South India. We focus exclusively on outstation expertise.
              </p>
              
              <div className="grid gap-3 pt-2">
                <div className="flex gap-3 items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-brand-red rounded-xl">
                    <Activity size={18} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white uppercase text-[9px] tracking-widest">Verified Drivers</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Background checked professionals only.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-brand-red rounded-xl">
                    <Globe size={18} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white uppercase text-[9px] tracking-widest">Tamil Nadu Wide</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Outstations covered all over Tamil Nadu.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl lg:-mt-10 relative z-10">
              <h3 className="text-sm font-black text-slate-900 dark:text-white mb-5 uppercase tracking-[0.2em] flex items-center gap-2">
                <Navigation size={14} className="text-brand-red" /> Top Routes
              </h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto thin-scrollbar pr-2">
                {visibleRoutes.map((route, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-pointer hover:translate-x-1 transition-transform animate-fade-in py-2 border-b border-slate-50 dark:border-slate-800 last:border-0">
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-xs">{route.name}</span>
                    <div className="text-right">
                      <span className="block text-[9px] font-black text-brand-red uppercase tracking-wider">{route.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setShowAllRoutes(!showAllRoutes)}
                className="w-full mt-5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-red hover:text-white transition-all"
              >
                {showAllRoutes ? (
                  <>Show Less <ChevronUp size={12} /></>
                ) : (
                  <>View All Routes <ChevronDown size={12} /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Infinite Marquee */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl md:text-5xl font-black text-center text-slate-900 dark:text-white uppercase tracking-tight">
            Customer Feed
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 mt-2 text-[9px] font-bold uppercase tracking-[0.4em]">
            Verified Trip Logs
          </p>
        </div>

        {/* Row 1 */}
        <div className="relative w-full mb-6">
          <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
            <div className="flex gap-4 px-2">
              {firstRow.map((t) => (
                <div key={t.id} className="w-[280px] md:w-[350px] flex-shrink-0 bg-slate-50 dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex gap-1 mb-3 text-brand-red">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-bold mb-4 text-[13px] leading-relaxed">"{t.comment}"</p>
                  <div className="flex items-center gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center text-white font-black text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white text-[9px] uppercase tracking-widest">{t.name}</h4>
                      <span className="text-[8px] text-brand-red font-black uppercase tracking-widest">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicated for loop */}
            <div className="flex gap-4 px-2">
              {firstRow.map((t) => (
                <div key={`${t.id}-dup`} className="w-[280px] md:w-[350px] flex-shrink-0 bg-slate-50 dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex gap-1 mb-3 text-brand-red">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-bold mb-4 text-[13px] leading-relaxed">"{t.comment}"</p>
                  <div className="flex items-center gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center text-white font-black text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white text-[9px] uppercase tracking-widest">{t.name}</h4>
                      <span className="text-[8px] text-brand-red font-black uppercase tracking-widest">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative w-full">
          <div className="flex w-max animate-scroll-reverse hover:[animation-play-state:paused]">
            <div className="flex gap-4 px-2">
              {secondRow.map((t) => (
                <div key={t.id} className="w-[280px] md:w-[350px] flex-shrink-0 bg-slate-50 dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex gap-1 mb-3 text-brand-red">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-bold mb-4 text-[13px] leading-relaxed">"{t.comment}"</p>
                  <div className="flex items-center gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center text-white font-black text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white text-[9px] uppercase tracking-widest">{t.name}</h4>
                      <span className="text-[8px] text-brand-red font-black uppercase tracking-widest">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
             <div className="flex gap-4 px-2">
              {secondRow.map((t) => (
                <div key={`${t.id}-dup`} className="w-[280px] md:w-[350px] flex-shrink-0 bg-slate-50 dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex gap-1 mb-3 text-brand-red">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-bold mb-4 text-[13px] leading-relaxed">"{t.comment}"</p>
                  <div className="flex items-center gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center text-white font-black text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white text-[9px] uppercase tracking-widest">{t.name}</h4>
                      <span className="text-[8px] text-brand-red font-black uppercase tracking-widest">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};