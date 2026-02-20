import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, ChevronRight, ArrowLeft, FileText, Quote, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "Coimbatore to Ooty: The Ultimate Road Trip Guide",
    excerpt: "Discover the best routes, hidden stopovers, and travel tips for your taxi journey from Coimbatore to the Queen of Hill Stations.",
    content: "Ooty, the Queen of Hill Stations, is just a 3-hour drive from Coimbatore. But the journey is as beautiful as the destination. Traveling by outstation cab allows you to stop at Mettupalayam for a quick snack or take the scenic route through the Nilgiri ghats with 36 hair-pin bends. Our drivers are experts in mountain navigation, ensuring a safe and smooth ride while you enjoy the shifting landscapes from coconut groves to pine forests.",
    category: "Travel Guide",
    date: "May 15, 2024",
    readTime: "5 min read",
    slug: "coimbatore-to-ooty-road-trip"
  },
  {
    id: '2',
    title: "Why One-Way Cabs are Changing Travel in Tamil Nadu",
    excerpt: "Save up to 40% on your long-distance travel by choosing one-way taxi services. Perfect for airport drops and inter-city relocations.",
    content: "Historically, outstation travelers had to pay for a round trip even if they only needed a drop-off. FastPoint Cab's one-way service model eliminates this 'dead-mileage' cost. Whether you're heading from Coimbatore to Chennai or Madurai, you only pay for the distance traveled. This transparency is why thousands of travelers now prefer our one-way cabs for business trips and family visits.",
    category: "Travel Tips",
    date: "May 10, 2024",
    readTime: "4 min read",
    slug: "one-way-cabs-benefits"
  },
  {
    id: '3',
    title: "FastPointCab & TrustyYellowCabs: A Reliable Partnership",
    excerpt: "Learn how the collaboration between Coimbatore's two leading taxi brands ensures 100% availability for your outstation needs.",
    content: "When you book a ride with us, you're tapping into a combined network of FastPointCab and TrustyYellowCabs. This partnership means more cars, faster dispatch times, and a unified standard of safety for all Coimbatore taxi booking requests. Whether it's a 4 AM airport drop or a week-long temple tour, our joint fleet is ready to serve you with the reliability TrustyYellowCabs is known for and the speed of FastPoint.",
    category: "News",
    date: "June 05, 2024",
    readTime: "3 min read",
    slug: "fastpoint-trustyyellowcabs-partnership"
  },
  {
    id: '4',
    title: "Premium Tempo Traveller Hire in Coimbatore: Group Travel Guide",
    excerpt: "Planning a family pilgrimage or a corporate team outing? Discover why our 12-17 seater Tempo Travellers are the top choice for groups.",
    content: "Traveling as a group shouldn't mean compromising on comfort. Our Tempo Traveller services in Coimbatore provide a unified travel experience for large families and corporate teams. Equipped with pushback seats, individual AC vents, and high-quality audio-video systems, our Force Traveller fleet ensures everyone stays together and enjoys the journey. Whether it's a wedding party trip to a nearby city or a spiritual tour to the 12 Jyotirlingas, our drivers are trained for multi-day group handling.",
    category: "Group Travel",
    date: "July 10, 2024",
    readTime: "6 min read",
    slug: "tempo-traveller-hire-coimbatore"
  },
  {
    id: '5',
    title: "Force Urbania: The New Standard of Luxury Group Rental in CBE",
    excerpt: "Experience European-standard luxury in Coimbatore. Why the Urbania is perfect for premium corporate delegations and high-end tours.",
    content: "The Force Urbania has revolutionized group transport in India. At FastPointCab and TrustyYellowCabs, we offer the latest 10, 13, and 17-seater Urbania models. With its sleek design, superior NVH levels, and airplane-style cabin lighting, it's the ultimate vehicle for premium corporate transport or high-end leisure travel from Coimbatore. The Urbania offers better safety features and a smoother ride compared to traditional vans, making it the preferred choice for long-distance luxury group travel.",
    category: "Luxury",
    date: "July 12, 2024",
    readTime: "5 min read",
    slug: "force-urbania-luxury-rental-coimbatore"
  },
  {
    id: '6',
    title: "Tourist Bus Rentals in Coimbatore for Weddings and Events",
    excerpt: "Need transport for 30 to 50 people? From luxury AC coaches to economy buses, find the right fit for your large-scale events.",
    content: "Coimbatore is a major hub for grand weddings and industrial events. Managing transport for 50+ guests requires precision. Our Tourist Bus rental service provides a range of options from 32-seater mini-buses to 50-seater luxury coaches. We specialize in marriage function pick-ups, school/college excursions, and industrial tours. Every bus is maintained to high safety standards and operated by professional crew members who understand the logistics of large-scale group movement.",
    category: "Events",
    date: "July 15, 2024",
    readTime: "7 min read",
    slug: "tourist-bus-rentals-coimbatore"
  },
  {
    id: '7',
    title: "Coimbatore to Mysore: A Royal Road Trip Guide",
    excerpt: "Journey through the Dhimbam Ghats and Bandipur forests to reach the City of Palaces with our reliable outstation taxi service.",
    content: "Traveling from Coimbatore to Mysore by road is an experience that combines thrill and tranquility. The route via Sathyamangalam and the 27 hairpin bends of Dhimbam offers breathtaking views of the plains below. As you cross into Karnataka, the drive through the Bandipur National Park provides a chance to witness wildlife in their natural habitat. Our drivers are well-versed with these forest routes and interstate permits, making your journey stress-free. Whether you're visiting the magnificent Mysore Palace or exploring the Chamundi Hills, our fleet of sedans and SUVs ensures a comfortable arrival in the royal city.",
    category: "Travel Guide",
    date: "June 02, 2024",
    readTime: "6 min read",
    slug: "coimbatore-to-mysore-road-trip"
  },
  {
    id: '8',
    title: "Munnar Calling: Why it's the Perfect Weekend Getaway",
    excerpt: "From tea museum tours to Eravikulam National Park, Munnar is a refreshing 4.5-hour drive from Coimbatore.",
    content: "Munnar is synonymous with rolling hills and sprawling tea plantations. The route from Coimbatore via Udumalpet and Chinnar Wildlife Sanctuary is a visual treat. You might even spot elephants along the way! Our round-trip packages to Munnar include driver beta and fuel, so you can focus on the waterfalls and spice gardens without worrying about the meter.",
    category: "Tours",
    date: "June 08, 2024",
    readTime: "6 min read",
    slug: "munnar-weekend-getaway-coimbatore"
  },
  {
    id: '9',
    title: "Safe Solo Travel: Our Commitment to Passenger Security",
    excerpt: "How FastPoint Cab ensures safety for solo travelers and senior citizens through real-time tracking and verified drivers.",
    content: "Safety isn't just a feature; it's our foundation. Every FastPoint and TrustyYellowCabs driver undergoes a rigorous background check. For solo travelers, we provide real-time trip tracking shared with our dispatch office. Our vehicles are equipped with emergency buttons, and our drivers are trained to prioritize passenger comfort and safety over speed.",
    category: "Safety",
    date: "June 12, 2024",
    readTime: "4 min read",
    slug: "safe-solo-travel-commitment"
  },
  {
    id: '10',
    title: "Plan Your Kovai to Chennai Trip with TrustyYellowCabs",
    excerpt: "Thinking of a long drive to the capital? Here's why our sedan and SUV fleet is the best choice for the 500km journey.",
    content: "The drive from Coimbatore to Chennai is a significant undertaking. While trains and flights exist, nothing beats the comfort of a private car that moves on your schedule. TrustyYellowCabs offers specialized one-way drop rates for this route. With multiple stops at Salem and Villupuram for refreshments, our journey ensures you arrive in Chennai refreshed and ready for your business or family meeting.",
    category: "Outstation",
    date: "July 05, 2024",
    readTime: "6 min read",
    slug: "coimbatore-to-chennai-taxi-guide"
  },
  {
    id: '11',
    title: "Coimbatore to Kodaikanal: The Princess of Hill Stations",
    excerpt: "Escape the heat of the plains with a reliable outstation cab to Kodaikanal. Explore the lake, Bryant Park, and Coaker's Walk.",
    content: "Kodaikanal is the perfect retreat for those seeking peace and mist-covered mountains. The journey from Coimbatore takes you through scenic valleys and winding roads. Our outstation specialists ensure you navigate the hair-pin bends safely. Whether it's a romantic honeymoon or a family outing, our Kodaikanal taxi packages are designed for maximum comfort.",
    category: "Travel Guide",
    date: "August 01, 2024",
    readTime: "5 min read",
    slug: "coimbatore-to-kodaikanal-taxi"
  },
  {
    id: '12',
    title: "Affordable One Way Taxi Service from Coimbatore",
    excerpt: "Why pay double? Learn how our one-way outstation taxi model helps you save money on drops to any city in Tamil Nadu.",
    content: "One-way taxis are the smartest way to travel between cities. FastPoint Cab offers fixed pricing for drops to Erode, Salem, Madurai, and Trichy. Our transparent billing means no hidden charges. It's the ideal solution for travelers who don't need a return ride, providing the luxury of a private car at nearly the cost of a bus ticket.",
    category: "Budget Travel",
    date: "August 05, 2024",
    readTime: "4 min read",
    slug: "affordable-one-way-taxi-coimbatore"
  },
  {
    id: '13',
    title: "Spiritual Circuit: Palani to Madurai in Comfort",
    excerpt: "Plan a divine journey with our reliable SUV fleet. Dedicated drivers who know the best temple routes and timings.",
    content: "Tamil Nadu's spiritual heart beats in its temples. Our specialized pilgrimage packages from Coimbatore cover Palani, Madurai, and Thanjavur. We provide spacious SUVs like the Innova Crysta, ensuring your family travels in absolute comfort. Our drivers are familiar with temple opening times and local rituals, acting as your guide throughout the spiritual circuit.",
    category: "Spiritual",
    date: "August 10, 2024",
    readTime: "6 min read",
    slug: "coimbatore-spiritual-temple-tour"
  },
  {
    id: '14',
    title: "Industrial Visit Cabs: Serving Coimbatore's Business Hub",
    excerpt: "Reliable transport for corporate delegations and industrial visits. Professional drivers and premium sedans for business meetings.",
    content: "As the Manchester of South India, Coimbatore hosts thousands of business travelers monthly. FastPoint Cab provides premium corporate mobility solutions. From factory visits in Pollachi to IT park meetings in Saravanampatti, our punctual service and well-maintained sedans ensure you make a great impression on your clients.",
    category: "Corporate",
    date: "August 15, 2024",
    readTime: "5 min read",
    slug: "business-travel-taxi-coimbatore"
  },
  {
    id: '15',
    title: "Why FastPoint is the Best Outstation Cab in Coimbatore",
    excerpt: "Discover the 5 reasons why thousands of customers trust us for their long-distance travel needs every month.",
    content: "What makes a taxi service 'the best'? Is it the price, the cars, or the people? At FastPoint, we believe it's the combination of all three. With 24/7 reliability, verified professional drivers, transparent pricing, and a diverse fleet from Sedans to Force Urbanias, we have redefined outstation travel in Coimbatore. Our partnership with TrustyYellowCabs further strengthens our commitment to 100% vehicle availability.",
    category: "Company News",
    date: "August 20, 2024",
    readTime: "4 min read",
    slug: "best-outstation-cab-coimbatore"
  },
  {
    id: '16',
    title: "Travel in Coimbatore: Top 5 Local Sightseeing Spots",
    excerpt: "Experience the heart of Kovai. From the spiritual Adiyogi to the lush Marudhamalai, here's your guide to travel in Coimbatore city.",
    content: "Traveling in Coimbatore offers a unique mix of divinity and nature. Start your day with a trip to the Adiyogi Shiva Statue, a world-renowned landmark for peace. Follow it up with a serene drive to Marudhamalai Temple. For nature lovers, a trip to Siruvani Waterfalls (reputed for the tastiest water in the world) is a must. Our local taxi service provides flexible hourly packages, allowing you to explore the city at your own pace without the hassle of public transport. From shopping at Gandhipuram to food hopping in RS Puram, Coimbatore is best explored with a knowledgeable FastPoint driver.",
    category: "Coimbatore Guide",
    date: "September 05, 2024",
    readTime: "5 min read",
    slug: "travel-in-coimbatore-sightseeing-guide"
  }
];

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (selectedPost) {
      document.title = `${selectedPost.title} | FastPoint & TrustyYellowCabs`;
    } else {
      document.title = "Blog - Coimbatore Taxi Booking | FastPointCab & TrustyYellowCabs";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPost]);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 pb-20 animate-fade-in pt-12 md:pt-20">
        <article className="container mx-auto px-4 max-w-3xl">
          <button 
            onClick={() => setSelectedPost(null)}
            className="mb-12 bg-slate-50 dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white hover:bg-brand-red hover:text-white transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to All Posts
          </button>

          <div className="bg-white dark:bg-slate-900 p-8 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
              <Quote size={200} />
            </div>

            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 bg-brand-red/10 text-brand-red rounded-xl text-[10px] font-black uppercase tracking-widest">
                {selectedPost.category}
              </span>
              <div className="h-1 w-1 rounded-full bg-slate-200 dark:bg-slate-700" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar size={12} /> {selectedPost.date}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-10 leading-[1.15] uppercase tracking-tight">
              {selectedPost.title}
            </h1>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-10 border-l-4 border-brand-red pl-8 py-2">
                {selectedPost.excerpt}
              </p>
              
              <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-loose text-base">
                {selectedPost.content.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-16 p-8 bg-slate-50 dark:bg-slate-950 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-center">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-tight">
                  Book your safe ride with FastPoint & TrustyYellowCabs
                </p>
                <Link 
                  to="/" 
                  state={{ scrollToBook: true }} 
                  className="inline-flex items-center gap-3 bg-brand-red text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-red/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Confirm Booking <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 text-brand-red rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <ShieldCheck size={12} /> Coimbatore Taxi Hub
          </div>
          <h1 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight leading-none">
            <span className="text-brand-red">FastPoint</span> & <br className="md:hidden" /> TrustyYellowCabs
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-bold uppercase tracking-tight text-xs md:text-sm">
            Providing the most reliable Coimbatore taxi booking services. Expert travel guides, local insights, and fleet updates.
          </p>
        </div>

        {/* Blog Grid - Text Focused Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-lg group cursor-pointer hover:border-brand-red/50 hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-red/5 text-brand-red rounded-2xl flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors">
                    <FileText size={20} />
                  </div>
                  <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100 dark:border-slate-700">
                    {post.category}
                  </span>
                </div>
                <span className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">
                  #{post.id.padStart(2, '0')}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter leading-tight group-hover:text-brand-red transition-colors">
                {post.title}
              </h3>
              
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-10 leading-relaxed uppercase tracking-tight flex-grow">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-red uppercase tracking-[0.2em] transform group-hover:translate-x-1 transition-transform">
                  Read More <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Keywords Cloud */}
        <div className="mt-24 pt-12 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em] mb-8">Popular Searches in Kovai</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
             "Taxi Booking in Coimbatore",
  "Coimbatore Outstation Taxi",
  "Outstation Cabs from Coimbatore",
  "Coimbatore to Ooty Taxi",
  "Coimbatore to Chennai Cab",
  "Coimbatore Airport Taxi Service",
  "CJB Airport Drop & Pickup",
  "One Way Taxi Coimbatore",
  "Round Trip Cab Coimbatore",
  "24 Hours Taxi Service Coimbatore",
  "Affordable Cab Hire Coimbatore",
  "Best Outstation Taxi Coimbatore"
            ].map(tag => (
              <span
  key={tag}
  className="
    px-3 py-2
    min-w-[110px]
    text-center

    bg-white dark:bg-slate-900
    rounded-lg

    text-[11px]
    font-semibold
    text-slate-700 dark:text-slate-300

    shadow-sm
    border border-slate-200/70 dark:border-slate-800

    hover:shadow-md
    hover:border-brand-red/40
    hover:text-brand-red

    transition-all duration-200
  "
>
  {tag}
</span>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};