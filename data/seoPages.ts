
export type PageCategory = 'route' | 'service' | 'airport' | 'vehicle' | 'local';

export interface SEOPage {
  id: string;
  title: string;
  category: PageCategory;
  description: string;
  keywords: string[];
  content?: string;
  priceStart?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export const SEO_PAGES: SEOPage[] = [
  // 1) Core Booking Intent Pages
  { id: 'coimbatore-taxi-service', title: 'Coimbatore Taxi Service', category: 'service', description: 'Reliable and professional taxi service in Coimbatore for all your travel needs.', keywords: ['Coimbatore Taxi', 'Call Taxi Coimbatore'] },
  { id: 'best-call-taxi-coimbatore', title: 'Best Call Taxi in Coimbatore', category: 'service', description: 'Experience the best call taxi service in Coimbatore with punctual pickups and clean cars.', keywords: ['Best Taxi Coimbatore', 'Top Rated Taxi'] },
  { id: 'book-taxi-online-coimbatore', title: 'Book Taxi Online Coimbatore', category: 'service', description: 'Easy and fast online taxi booking in Coimbatore. Get instant confirmation.', keywords: ['Online Taxi Booking', 'CBE Cab Booking'] },
  { id: 'coimbatore-outstation-taxi', title: 'Coimbatore Outstation Taxi', category: 'service', description: 'Premium outstation taxi service from Coimbatore to anywhere in South India.', keywords: ['Outstation Taxi', 'Long Distance Cab'] },
  { id: 'one-way-taxi-coimbatore', title: 'One Way Taxi Coimbatore', category: 'service', description: 'Affordable one-way taxi drops from Coimbatore to major cities and towns.', keywords: ['One Way Taxi', 'Drop Taxi'] },
  
  // 2) Airport Pages
  { id: 'coimbatore-airport-taxi', title: 'Coimbatore Airport Taxi', category: 'airport', description: '24/7 airport taxi service for Coimbatore International Airport (CJB).', keywords: ['Airport Taxi', 'CJB Taxi'] },
  { id: 'airport-pickup-coimbatore', title: 'Airport Pickup Coimbatore', category: 'airport', description: 'Reliable airport pickup service with professional drivers and name board assistance.', keywords: ['Airport Pickup', 'CBE Airport Arrival'] },
  { id: 'airport-drop-taxi-coimbatore', title: 'Airport Drop Taxi Coimbatore', category: 'airport', description: 'Punctual airport drop service to ensure you never miss a flight.', keywords: ['Airport Drop', 'Taxi to Airport'] },
  
  // 3) Tourist Hill Station Routes
  { id: 'coimbatore-to-ooty-taxi', title: 'Coimbatore to Ooty Taxi', category: 'route', description: 'Scenic drive from Coimbatore to Ooty. Best rates for hill station travel.', keywords: ['Coimbatore to Ooty', 'Ooty Cab'], priceStart: '' },
  { id: 'coimbatore-to-kodaikanal-taxi', title: 'Coimbatore to Kodaikanal Taxi', category: 'route', description: 'Travel to the Princess of Hill Stations, Kodaikanal, in comfort.', keywords: ['Coimbatore to Kodaikanal', 'Kodai Taxi'], priceStart: '' },
  { id: 'coimbatore-to-munnar-taxi', title: 'Coimbatore to Munnar Taxi', category: 'route', description: 'Explore the tea gardens of Munnar with our reliable outstation cabs.', keywords: ['Coimbatore to Munnar', 'Munnar Cab'], priceStart: '' },
  { id: 'coimbatore-to-valparai-taxi', title: 'Coimbatore to Valparai Taxi', category: 'route', description: 'Safe travel through 40 hair-pin bends to the beautiful Valparai.', keywords: ['Coimbatore to Valparai', 'Valparai Taxi'], priceStart: '' },
  { id: 'coimbatore-to-wayanad-taxi', title: 'Coimbatore to Wayanad Taxi', category: 'route', description: 'Discover the wilderness of Wayanad with our expert drivers.', keywords: ['Coimbatore to Wayanad', 'Wayanad Cab'], priceStart: '' },
  
  // 4) Major City Routes
  { id: 'coimbatore-to-chennai-taxi', title: 'Coimbatore to Chennai Taxi', category: 'route', description: 'Long distance taxi service from Coimbatore to Chennai at competitive rates.', keywords: ['Coimbatore to Chennai', 'Chennai Drop Taxi'], priceStart: '' },
  { id: 'coimbatore-to-bangalore-taxi', title: 'Coimbatore to Bangalore Taxi', category: 'route', description: 'Reliable cab service for your journey to the Silicon Valley of India.', keywords: ['Coimbatore to Bangalore', 'Bengaluru Taxi'], priceStart: '' },
  { id: 'coimbatore-to-madurai-taxi', title: 'Coimbatore to Madurai Taxi', category: 'route', description: 'Visit the Temple City of Madurai with our premium outstation cabs.', keywords: ['Coimbatore to Madurai', 'Madurai Taxi'], priceStart: '' },
  
  // 5) Kerala Routes
  { id: 'coimbatore-to-kochi-taxi', title: 'Coimbatore to Kochi Taxi', category: 'route', description: 'Seamless travel from Coimbatore to the coastal city of Kochi.', keywords: ['Coimbatore to Kochi', 'Kochi Cab'], priceStart: '' },
  { id: 'coimbatore-to-thrissur-taxi', title: 'Coimbatore to Thrissur Taxi', category: 'route', description: 'Travel to the Cultural Capital of Kerala, Thrissur, with ease.', keywords: ['Coimbatore to Thrissur', 'Thrissur Taxi'], priceStart: '' },
  { id: 'coimbatore-to-palakkad-taxi', title: 'Coimbatore to Palakkad Taxi', category: 'route', description: 'Short and comfortable ride across the border to Palakkad.', keywords: ['Coimbatore to Palakkad', 'Palakkad Cab'], priceStart: '' },
  
  // 6) Vehicle Based Pages
  { id: 'sedan-cab-coimbatore', title: 'Sedan Cab Coimbatore', category: 'vehicle', description: 'Comfortable sedan cabs like Swift Dzire and Toyota Etios for city and outstation.', keywords: ['Sedan Taxi', 'Dzire Cab'] },
  { id: 'suv-taxi-coimbatore', title: 'SUV Taxi Coimbatore', category: 'vehicle', description: 'Spacious SUV taxis for family trips and group travel.', keywords: ['SUV Cab', 'Ertiga Taxi'] },
  { id: 'innova-crysta-cab-coimbatore', title: 'Innova Crysta Cab Coimbatore', category: 'vehicle', description: 'Premium luxury travel with our well-maintained Innova Crysta fleet.', keywords: ['Innova Crysta', 'Luxury Cab'] },
  
  // 7) Local Area Pages
  { id: 'gandhipuram-taxi-service', title: 'Gandhipuram Taxi Service', category: 'local', description: 'Quick taxi pickups in the heart of Coimbatore - Gandhipuram.', keywords: ['Gandhipuram Taxi', 'Central CBE Cab'] },
  { id: 'rs-puram-cab-booking', title: 'RS Puram Cab Booking', category: 'local', description: 'Premium cab service for the upscale RS Puram neighborhood.', keywords: ['RS Puram Taxi', 'West CBE Cab'] },
  { id: 'peelamedu-taxi-service', title: 'Peelamedu Taxi Service', category: 'local', description: 'Reliable taxi service for the educational and industrial hub of Peelamedu.', keywords: ['Peelamedu Taxi', 'East CBE Cab'] },
  { id: 'singanallur-taxi', title: 'Singanallur Taxi', category: 'local', description: 'Fast taxi service near Singanallur bus stand and surrounding areas.', keywords: ['Singanallur Taxi', 'South CBE Cab'] },
  { id: 'saravanampatti-taxi-service', title: 'Saravanampatti Taxi Service', category: 'local', description: 'Taxi service for the IT hub of Coimbatore - Saravanampatti.', keywords: ['Saravanampatti Taxi', 'IT Corridor Cab'] },
];

// Helper to get more routes for the sitemap
export const ALL_SEO_PAGES = [
  ...SEO_PAGES,
  // Adding more to reach 100+ conceptually or actually
  { id: 'coimbatore-to-salem-taxi', title: 'Coimbatore to Salem Taxi', category: 'route', description: 'Travel to the Steel City, Salem, with our professional drivers.', priceStart: '', keywords: [] },
  { id: 'coimbatore-to-erode-taxi', title: 'Coimbatore to Erode Taxi', category: 'route', description: 'Quick and efficient taxi service from Coimbatore to Erode.', priceStart: '', keywords: [] },
  { id: 'coimbatore-to-tiruppur-taxi', title: 'Coimbatore to Tiruppur Taxi', category: 'route', description: 'Efficient business travel to the Textile Hub, Tiruppur.', priceStart: '', keywords: [] },
  { id: 'coimbatore-to-mysore-taxi', title: 'Coimbatore to Mysore Taxi', category: 'route', description: 'Travel to the City of Palaces, Mysuru, in comfort and style.', priceStart: '', keywords: [] },
  { id: 'coimbatore-to-pondicherry-taxi', title: 'Coimbatore to Pondicherry Taxi', category: 'route', description: 'A long drive to the French Riviera of the East, Pondicherry.', priceStart: '', keywords: [] },
  { id: 'coimbatore-to-rameshwaram-taxi', title: 'Coimbatore to Rameshwaram Taxi', category: 'route', description: 'A spiritual journey to the southern tip of India, Rameshwaram.', priceStart: '', keywords: [] },
  { id: 'coimbatore-to-tirupati-taxi', title: 'Coimbatore to Tirupati Taxi', category: 'route', description: 'Pilgrimage to Tirupati from Coimbatore made easy.', priceStart: '', keywords: [] },
  { id: 'coimbatore-to-palani-taxi', title: 'Coimbatore to Palani Taxi', category: 'route', description: 'Spiritual journey to Palani Murugan Temple.', priceStart: '₹2,199', keywords: [] },
  { id: 'coimbatore-to-guruvayur-taxi', title: 'Coimbatore to Guruvayur Taxi', category: 'route', description: 'Pilgrimage to Guruvayur Temple with our dedicated outstation cabs.', priceStart: '', keywords: [] },
  { id: 'coimbatore-to-alleppey-taxi', title: 'Coimbatore to Alleppey Taxi', category: 'route', description: 'Visit the backwaters of Alleppey from Coimbatore.', priceStart: '', keywords: [] },
  { id: 'coimbatore-to-trivandrum-taxi', title: 'Coimbatore to Trivandrum Taxi', category: 'route', description: 'Long distance travel to the capital of Kerala.', priceStart: '', keywords: [] },
  { id: 'tempo-traveller-coimbatore', title: 'Tempo Traveller Coimbatore', category: 'vehicle', description: 'Luxury tempo travellers for group travel and family functions.', keywords: [] },
  { id: '9-seater-cab-coimbatore', title: '9 Seater Cab Coimbatore', category: 'vehicle', description: 'Spacious 9 seater vehicles for medium-sized groups.', keywords: [] },
  { id: '12-seater-van-coimbatore', title: '12 Seater Van Coimbatore', category: 'vehicle', description: 'Large 12 seater vans for corporate outings and pilgrimages.', keywords: [] },
  { id: 'ukkadam-call-taxi', title: 'Ukkadam Call Taxi', category: 'local', description: 'Taxi service near Ukkadam bus stand and lake area.', keywords: [] },
  { id: 'town-hall-taxi-service', title: 'Town Hall Taxi Service', category: 'local', description: 'Reliable taxi service in the busy Town Hall commercial area.', keywords: [] },
  { id: 'saibaba-colony-taxi', title: 'Saibaba Colony Taxi', category: 'local', description: 'Premium taxi service for Saibaba Colony residents.', keywords: [] },
  { id: 'thudiyalur-call-taxi', title: 'Thudiyalur Call Taxi', category: 'local', description: 'Fast taxi pickups in the Thudiyalur residential area.', keywords: [] },
  { id: 'vadavalli-taxi-booking', title: 'Vadavalli Taxi Booking', category: 'local', description: 'Taxi service for Vadavalli and Marudamalai road areas.', keywords: [] },
  { id: 'singanallur-taxi-service', title: 'Singanallur Taxi Service', category: 'local', description: 'Reliable cabs in Singanallur area.', keywords: [] },
  { id: 'podanur-call-taxi', title: 'Podanur Call Taxi', category: 'local', description: 'Taxi service near Podanur railway station.', keywords: [] },
  { id: 'sundarapuram-taxi', title: 'Sundarapuram Taxi', category: 'local', description: 'Quick taxi service in Sundarapuram area.', keywords: [] },
  { id: 'kuniyamuthur-taxi', title: 'Kuniyamuthur Taxi', category: 'local', description: 'Taxi service for Kuniyamuthur and Palakkad road.', keywords: [] },
  { id: 'perur-taxi-service', title: 'Perur Taxi Service', category: 'local', description: 'Taxi service near the historic Perur temple.', keywords: [] },
  { id: 'kovaipudur-taxi', title: 'Kovaipudur Taxi', category: 'local', description: 'Taxi service for the Kovaipudur residential township.', keywords: [] },
  { id: 'marudamalai-taxi', title: 'Marudamalai Taxi', category: 'local', description: 'Spiritual trip taxi to Marudamalai temple.', keywords: [] },
  { id: 'coimbatore-taxi', title: 'Coimbatore Taxi', category: 'local', description: 'Local taxi service in Coimbatore.', keywords: [] },
{ id: 'chennai-taxi', title: 'Chennai Taxi', category: 'local', description: 'Local taxi service in Chennai.', keywords: [] },
{ id: 'trichy-taxi', title: 'Trichy Taxi', category: 'local', description: 'Local taxi service in Trichy.', keywords: [] },
{ id: 'madurai-taxi', title: 'Madurai Taxi', category: 'local', description: 'Local taxi service in Madurai.', keywords: [] },
{ id: 'erode-taxi', title: 'Erode Taxi', category: 'local', description: 'Local taxi service in Erode.', keywords: [] },
{ id: 'salem-taxi', title: 'Salem Taxi', category: 'local', description: 'Local taxi service in Salem.', keywords: [] },
{ id: 'tirupur-taxi', title: 'Tirupur Taxi', category: 'local', description: 'Local taxi service in Tirupur.', keywords: [] },
{ id: 'pollachi-taxi', title: 'Pollachi Taxi', category: 'local', description: 'Local taxi service in Pollachi.', keywords: [] },
{ id: 'villupuram-taxi', title: 'Villupuram Taxi', category: 'local', description: 'Local taxi service in Villupuram.', keywords: [] },
{ id: 'karur-taxi', title: 'Karur Taxi', category: 'local', description: 'Local taxi service in Karur.', keywords: [] },
{ id: 'tirunelveli-taxi', title: 'Tirunelveli Taxi', category: 'local', description: 'Local taxi service in Tirunelveli.', keywords: [] },
{ id: 'namakkal-taxi', title: 'Namakkal Taxi', category: 'local', description: 'Local taxi service in Namakkal.', keywords: [] },
{ id: 'vellore-taxi', title: 'Vellore Taxi', category: 'local', description: 'Local taxi service in Vellore.', keywords: [] },
{ id: 'hosur-taxi', title: 'Hosur Taxi', category: 'local', description: 'Local taxi service in Hosur.', keywords: [] },
{ id: 'mettupalayam-taxi', title: 'Mettupalayam Taxi', category: 'local', description: 'Local taxi service in Mettupalayam.', keywords: [] },
{ id: 'thanjavur-taxi', title: 'Thanjavur Taxi', category: 'local', description: 'Local taxi service in Thanjavur.', keywords: [] },
{ id: 'dindigul-taxi', title: 'Dindigul Taxi', category: 'local', description: 'Local taxi service in Dindigul.', keywords: [] },
];
