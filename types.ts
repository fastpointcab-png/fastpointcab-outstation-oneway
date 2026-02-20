
export enum VehicleType {
  ANY_SEDAN = 'Any Sedan',
  SEDAN = 'Sedan',
  ANY_SUV = 'Any SUV',
  SUV = 'SUV',
  INNOVA = 'Innova',
  TEMPO_TRAVELLER = 'Tempo Traveller',
  URBANIA = 'Urbania',
  TOURIST_BUS = 'Tourist Bus',
  CUSTOM = 'Custom'
}

export enum TripType {
  ONE_WAY = 'One Way',
  ROUND_TRIP = 'Round Trip',
  LOCAL = 'Local'
}

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  capacity: number;
  luggage: number;
  pricePerHour: number;
  image: string;
  features: string[];
  available: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BookingDetails {
  name?: string;
  email?: string;
  phone: string;
  pickup: string;
  drop: string;
  date: string;
  returnDate?: string;
  returnTime?: string;
  time: string;
  vehicleType: VehicleType;
  tripType: TripType;
  distance?: string;
  rawDistance?: number;
  estimatedFare?: string;
  schedule?: string;
}

export interface FareBreakdown {
  total: number;
  distanceFare: number;
  ratePerKm: number;
  distanceVal: number;
  multiplier: number;
  driverBeta: number;
  extraDayAmount?: number;

}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
}


