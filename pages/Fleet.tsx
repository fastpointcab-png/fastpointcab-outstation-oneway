import React from 'react';
import { Users, Info, ArrowRight, Gauge, MapPin, Repeat, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const fleetCategories = [
  {
    title: "Sedan",
    description: "Premium Sedans",
    capacity: "4 seater + 1 Driver",
    type: "Premium Sedan",
    image: "/images/Sedan.webp",
    oneWay: "₹ 15/km",
    roundTrip: "₹ 13/km"
  },
  {
    title: "Any SUV",
    description: "Ertiga, Xylo, or Kia Carens",
    capacity: "7 seater + 1 Driver",
    type: "SUV Car",
    image: "/images/Any SUV.webp",
    oneWay: "₹ 19/km",
    roundTrip: "₹ 18/km"
  },
  {
    title: "Innova/Crysta",
    description: "The Gold Standard for Comfort",
    capacity: "7 seater + 1 Driver",
    type: "Innova Car",
    image: "/images/Innova.webp",
    oneWay: "₹ 20/km",
    roundTrip: "₹ 19/km"
  },
  {
    title: "Tempo Traveller",
    description: "Force Traveller (12/14/17 Seater)",
    capacity: "12-17 Seater + Driver",
    type: "Group Van",
    image: "/images/Tempo Traveller.webp",
    oneWay: "N/A",
    roundTrip: "Call for Quote"
  },
  {
    title: "Force Urbania",
    description: "The European Standard Luxury Van",
    capacity: "10/13/17 Seater",
    type: "Luxury Van",
    image: "/images/Force Urbania.webp",
    oneWay: "N/A",
    roundTrip: "Call for Quote"
  },
  {
    title: "Tourist Bus",
    description: "Luxury AC Coaches for Large Events",
    capacity: "32/40/50 Seater",
    type: "Tourist Coach",
    image: "/images/Tourist Bus.webp",
    oneWay: "N/A",
    roundTrip: "Call for Quote"
  }
];

export const Fleet: React.FC = () => {
  const whatsappLink = `https://wa.me/919488834020?text=${encodeURIComponent("Hi FastPoint Cab, I'm interested in booking a large coach (Tempo Traveller/Bus). Please provide details.")}`;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 md:py-20">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 text-brand-red rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Gauge size={12} /> Our Fleet & Pricing
          </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight leading-tight px-4 sm:px-0">
  
  {/* Mobile Text */}
  <span className="block sm:hidden">
    Outstation Fares
  </span>

  {/* Desktop Text */}
  <span className="hidden sm:block uppercase">
    Outstation <span className="text-brand-red">Cab Fare Details</span>
  </span>

</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-bold uppercase tracking-tight text-xs md:text-sm">
            Transparent pricing for long-distance travel. We offer vehicles for every group size and budget.
          </p>
        </div>

        {/* Global Distance Rules Section */}
        <div className="max-w-4xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 group hover:border-brand-red/30 transition-all">
            <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-red/20 flex-shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">One Way</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase">130 KM <span className="text-xs text-brand-red">MINIMUM</span></h3>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 group hover:border-brand-red/30 transition-all">
            <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-red/20 flex-shrink-0">
              <Repeat size={24} />
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Round Trip</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase">250 KM <span className="text-xs text-brand-red">PER DAY MIN</span></h3>
            </div>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {fleetCategories.map((category) => (
            <div 
              key={category.title} 
              className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl group hover:-translate-y-1 transition-all duration-500 flex flex-col h-auto"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute top-4 right-4 bg-brand-red text-white text-[8px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-2xl">
                  {category.type}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="mb-6 min-h-[80px]">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">{category.title}</h2>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tight">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-6 border border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-brand-red/10 text-brand-red rounded-lg">
                    <Users size={16} />
                  </div>
                  <span className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest">
                    {category.capacity}
                  </span>
                </div>

                {/* Pricing Table */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-brand-red/5 p-4 rounded-2xl border border-brand-red/10 flex flex-col justify-center min-h-[70px]">
                    <span className="block text-[7px] font-black text-brand-red uppercase tracking-widest mb-1">One Way</span>
                    <span className="text-sm md:text-base font-black text-slate-900 dark:text-white">{category.oneWay}</span>
                  </div>
                  <div className="bg-brand-red/5 p-4 rounded-2xl border border-brand-red/10 flex flex-col justify-center min-h-[70px]">
                    <span className="block text-[7px] font-black text-brand-red uppercase tracking-widest mb-1">Round Trip</span>
                    <span className="text-sm md:text-base font-black text-slate-900 dark:text-white">{category.roundTrip}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link 
                    to="/" 
                    state={{ scrollToBook: true }}
                    className="w-full flex items-center justify-center gap-2 bg-brand-red text-white font-black py-4 rounded-xl
                               shadow-xl shadow-brand-red/20 hover:bg-brand-accent transition-all duration-300
                               active:scale-[0.98] uppercase tracking-[0.2em] text-[10px]"
                  >
                    Book {category.title} <ArrowRight size={14} />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Group Travel Specialized Section */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="bg-brand-red/5 rounded-[3rem] p-10 md:p-16 border-2 border-dashed border-brand-red/20 relative overflow-hidden">
             <div className="absolute top-10 right-10 text-brand-red/10 animate-pulse">
                <Sparkles size={120} />
             </div>
             <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase mb-6 tracking-tighter">Need a Large Coach?</h3>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-10 max-w-xl mx-auto leading-relaxed">
                  We provide premium buses for school trips, industrial tours, and large family weddings in Coimbatore.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="tel:+919488834020" className="px-10 py-5 bg-brand-red text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl shadow-brand-red/20 hover:scale-[1.05] transition-transform">Call for Quote</a>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors">WhatsApp Details</a>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Info Note */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div className="flex-shrink-0">
               <Info size={18} className="text-brand-red" />
            </div>
            <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed text-left">
              * Rates are indicative and may vary based on demand and specific travel requirements.<br/>
              * Parking, Toll, and Interstate permit charges are extra based on actual usage.<br/>
              * Hill station trips may have specific driver beta updates.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};