
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="relative h-[400px] bg-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
           <img 
            src="https://images.unsplash.com/photo-1556122501-1c2dfc944747?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30" 
            alt="Coimbatore Taxi Fleet"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-rose-900/80 to-slate-900/80" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
            Fast Point Cab & <br/> <span className="text-brand-red">TrustyYellow Cabs</span>
          </h1>
          <p className="mt-4 text-slate-300 font-bold uppercase tracking-[0.3em] text-xs">A Strategic Travel Partnership</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Fast Point & TrustyYellow: <br/>
              <span className="text-brand-red">Coimbatore's Premier Choice</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Based in the heart of <strong>Coimbatore</strong>, the collaboration between <strong>Fast Point Cab</strong> and <strong>TrustyYellow Cabs</strong> started with a unified mission: to provide the most reliable, comfortable, and safe outstation travel service for the people of Kovai.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              By merging our fleets and expertise, we are now the preferred choice for <strong>outstation taxi bookings in Coimbatore</strong>. Our joint operations ensure 100% vehicle availability, whether you need a quick airport drop or a 10-day tour of South India.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Our professional chauffeurs are trained across both brands to maintain a singular, high standard of safety and punctuality that TrustyYellow Cabs is famous for, combined with the tech-first efficiency of Fast Point.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <span className="block text-4xl font-black text-brand-red mb-2">15+</span>
                <span className="text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest text-[10px]">Combined Hubs</span>
              </div>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <span className="block text-4xl font-black text-brand-red mb-2">100k+</span>
                <span className="text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest text-[10px]">Joint Safe Trips</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4">
               <img src="/images/IMG_8949.webp" className="rounded-[2rem] shadow-xl hover:scale-105 transition-transform duration-500 border border-slate-100 dark:border-slate-800" alt="Coimbatore City" />
               <div className="bg-brand-red p-8 rounded-[2rem] text-white">
                 <h4 className="font-black text-xl uppercase tracking-tighter mb-2">Trusty Service</h4>
                 <p className="text-xs font-bold uppercase tracking-widest opacity-80">Our drivers are our greatest asset.</p>
               </div>
             </div>
             <div className="space-y-4 mt-12">
               <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
                 <h4 className="font-black text-xl uppercase tracking-tighter mb-2">Fast Dispatch</h4>
                 <p className="text-xs font-bold uppercase tracking-widest opacity-80">Technology meeting tradition.</p>
               </div>
               <img src="/images/IMG_8950.webp" className="rounded-[2rem] shadow-xl hover:scale-105 transition-transform duration-500 border border-slate-100 dark:border-slate-800" alt="Fleet Vehicle" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
