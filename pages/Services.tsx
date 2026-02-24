
import React from 'react';
import { Send, MapPin, Sparkles, MessageSquare, Compass, CheckCircle2 } from 'lucide-react';

const topTenTours = [
  {
    title: "Ooty",
    quote: "The Queen of Hills is best experienced with a slow drive through the pines.",
    image: "/images/Ooty.webp",
    duration: "2-3 Days"
  },
  {
    title: "Munnar",
    quote: "Greenery that heals the soul. The tea gardens of Kerala are calling.",
    image: "/images/Munnar.webp",
    duration: "3-4 Days"
  },
  {
    title: "Kodaikanal",
    quote: "Mist-covered peaks and quiet lakes. Perfect for a weekend escape.",
    image: "/images/Kodaikanal.webp",
    duration: "2-3 Days"
  },
  {
    title: "Madurai",
    quote: "Step into history. The architecture of Meenakshi Temple is a divine marvel.",
    image: "/images/Madurai.webp",
    duration: "1-2 Days"
  },
  {
    title: "Valparai",
    quote: "Untouched, wild, and beautiful. A journey through 40 hair-pin bends.",
    image: "/images/Valparai.webp",
    duration: "2 Days"
  },
  {
    title: "Wayanad",
    quote: "Experience the heart of the Western Ghats with deep forest drives.",
    image: "/images/Wayanad.webp",
    duration: "3-5 Days"
  },
  {
    title: "Pondicherry",
    quote: "A slice of France in South India. Cycle through the white town.",
    image: "/images/Pondicherry.webp",
    duration: "3 Days"
  },
  {
    title: "Mysuru",
    quote: "The City of Palaces. Royalty and heritage at every corner.",
    image: "/images/Mysuru.webp",
    duration: "2-3 Days"
  },
  {
    title: "Rameshwaram",
    quote: "A spiritual odyssey to the edge of the ocean. Pure peace.",
    image: "/images/Rameshwaram.webp",
    duration: "2 Days"
  },
  {
    title: "Kanyakumari",
    quote: "Where three seas meet. The ultimate sunrise and sunset destination.",
    image: "/images/Kanyakumari.webp",
    duration: "3 Days"
  }
];

export const Services: React.FC = () => {
  const handleBooking = (title: string) => {
    const text = `Hi FastPoint Cab, I want to book a tour to ${title}. Please send me a quote.`;
    window.open(`https://wa.me/919488834020?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCustomTrip = () => {
    const text = "Hi FastPoint Cab, I want to plan a custom tour package with specific destinations.";
    window.open(`https://wa.me/919488834020?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
<div className="min-h-screen bg-white dark:bg-slate-950 pb-16 sm:pb-24 transition-colors duration-500">
  {/* Dynamic Visual Header */}
  <section className="relative h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[70vh] flex items-center justify-center bg-slate-900 overflow-hidden">
    
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <img 
        src="/images/IMG_8962.webp" 
        className="w-full h-full object-cover sm:opacity-60 lg:opacity-100 transition-opacity duration-500"
        alt="Travel background"
      />
      {/* Gradient overlay: lighter on mobile, subtle on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-slate-900/20 lg:via-transparent to-slate-900/50 lg:to-transparent"></div>
    </div>

    {/* Content */}
    <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 animate-fade-in max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-snug sm:leading-tight drop-shadow-xl">
         <br className="hidden sm:block"/>
        <span className="text-brand-red block sm:inline">
          
        </span>
      </h1>
    </div>

  </section>

      <div className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-20">
        {/* Top 10 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {topTenTours.map((tour, index) => (
            <div 
              key={tour.title}
              className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="relative h-56 md:h-80 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                
                {/* Refined Image Overlay - Lighter for better visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                
                {/* Destination Index Badge */}
                <div className="absolute top-6 left-6 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl">
                  <span className="text-white text-xs font-black">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Tour Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-brand-red rounded-lg">
                      <MapPin size={14} className="text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{tour.title}</h2>
                  </div>
                  <p className="text-slate-200 italic font-medium text-xs md:text-sm leading-relaxed max-w-sm drop-shadow-md">
                    "{tour.quote}"
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 flex items-center justify-between bg-white dark:bg-slate-900">
                <div className="space-y-1">
                   <span className="block text-[8px] md:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Duration</span>
                   <div className="flex items-center gap-1.5">
                     <Compass size={12} className="text-brand-red" />
                     <span className="text-xs md:text-sm font-black text-slate-900 dark:text-white uppercase">{tour.duration}</span>
                   </div>
                </div>
                <button 
                  onClick={() => handleBooking(tour.title)}
                  className="group/btn flex items-center gap-2 bg-brand-red text-white px-6 py-3 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-brand-red/20 hover:bg-brand-accent transition-all active:scale-95"
                >
                  Book Now 
                  <Sparkles size={14} className="group-hover/btn:animate-pulse" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Short & Clean Customize Section */}
        <div className="mt-20 max-w-4xl mx-auto">
           <div className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 text-center border border-slate-100 dark:border-slate-800 relative overflow-hidden group shadow-sm">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-red/5 rounded-full blur-[80px] group-hover:bg-brand-red/10 transition-colors duration-700"></div>
              
              <div className="relative z-10">
                <div className="text-[10px] font-black text-brand-red uppercase tracking-[0.4em] mb-4">
               Taxi Services Available 24/7
                </div>
                
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4 leading-none">
                  Plan your trip
                </h2>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-bold uppercase tracking-tight mb-8 max-w-md mx-auto leading-relaxed">
                  Anywhere to Anywhere Travel Across South India.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={handleCustomTrip}
                    className="w-full sm:w-auto bg-brand-red text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-brand-red/20 hover:bg-brand-accent transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    Start Planning <Send size={14} />
                  </button>
                  <button 
                    onClick={() => window.open('tel:+919488834020')}
                    className="w-full sm:w-auto bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95"
                  >
                    Call Expert
                  </button>
                </div>
              </div>
           </div>
        </div>

        {/* Compact Footer Line */}
        <div className="mt-20 text-center opacity-30">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em]">FastPoint Curated Travel Specialists</p>
        </div>
      </div>
    </div>
  );
};
