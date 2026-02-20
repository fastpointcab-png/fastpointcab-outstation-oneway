import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { BookingDetails, VehicleType, TripType, FareBreakdown } from '../types';
import { 
  MapPin, User, Phone, Car, Calendar, Clock, 
  ArrowLeft, CheckCircle2, MessageCircle, 
  Map as MapIcon, Activity, Navigation, X, AlertCircle, Info, ArrowRight, Zap, RefreshCw
} from 'lucide-react';
import { sendBookingEmail } from '../services/emailService';

declare const google: any;

/* Guideline: API key must be obtained exclusively from process.env.API_KEY */
const GOOGLE_MAPS_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

const PRICING_OUTSTATION_COMPLEX: Record<VehicleType, { oneWay: number; roundTrip: number }> = {
  [VehicleType.ANY_SEDAN]: { oneWay: 15, roundTrip: 13 },
  [VehicleType.SEDAN]: { oneWay: 17, roundTrip: 14 },
  [VehicleType.ANY_SUV]: { oneWay: 20, roundTrip: 18 },
  [VehicleType.SUV]: { oneWay: 21, roundTrip: 19 },
  [VehicleType.INNOVA]: { oneWay: 25, roundTrip: 22 },
  [VehicleType.TEMPO_TRAVELLER]: { oneWay: 0, roundTrip: 0 },
  [VehicleType.URBANIA]: { oneWay: 0, roundTrip: 0 },
  [VehicleType.TOURIST_BUS]: { oneWay: 0, roundTrip: 0 },
  [VehicleType.CUSTOM]: { oneWay: 0, roundTrip: 0 },
};

const PRICING_LOCAL: Record<VehicleType, number> = {
  [VehicleType.ANY_SEDAN]: 25,
  [VehicleType.SEDAN]: 26,
  [VehicleType.ANY_SUV]: 35,
  [VehicleType.SUV]: 40,
  [VehicleType.INNOVA]: 50,
  [VehicleType.TEMPO_TRAVELLER]: 0,
  [VehicleType.URBANIA]: 0,
  [VehicleType.TOURIST_BUS]: 0,
  [VehicleType.CUSTOM]: 0,
};

const NO_FARE_VEHICLES = [
  VehicleType.TEMPO_TRAVELLER,
  VehicleType.URBANIA,
  VehicleType.TOURIST_BUS,
  VehicleType.CUSTOM
];

const MIN_KM_PER_DAY = 250;
const MIN_ONE_WAY_KM = 130;
const MIN_LOCAL_KM = 2;

const PricingEngine = {
  getRatePerKm: (vehicle: VehicleType, trip: TripType) => {
    if (trip === TripType.LOCAL) return PRICING_LOCAL[vehicle] || 0;
    const rates = PRICING_OUTSTATION_COMPLEX[vehicle];
    if (!rates) return 0;
    return trip === TripType.ONE_WAY ? rates.oneWay : rates.roundTrip;
  },

  getDriverBeta: (vehicle: VehicleType, trip: TripType, distanceKm: number) => {
    if (trip === TripType.LOCAL) {
      const isSedan = [VehicleType.ANY_SEDAN, VehicleType.SEDAN].includes(vehicle);

      if (distanceKm <= 35) {
        return isSedan ? 80 : 150;
      }

      if (distanceKm <= 70) {
        return isSedan ? 200 : 300;
      }

      return isSedan ? 300 : 400;
    }

    if (vehicle === VehicleType.INNOVA) return trip === TripType.ONE_WAY ? 800 : 600;
    const isSUV = [VehicleType.ANY_SUV, VehicleType.SUV].includes(vehicle);
    const isSedan = [VehicleType.ANY_SEDAN, VehicleType.SEDAN].includes(vehicle);
    if (isSedan) return trip === TripType.ONE_WAY ? 500 : 400;
    if (isSUV) return trip === TripType.ONE_WAY ? 600 : 500;
    return 0;
    },

    calculateDays: (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  },

  computeBreakdown: (params: {
    origin: string,
    destination: string,
    vehicle: VehicleType,
    trip: TripType,
    distanceKm: number,
    pickupDate: string,
    returnDate: string
  }): FareBreakdown | null => {
    if (NO_FARE_VEHICLES.includes(params.vehicle)) return null;
    const perKmRate = PricingEngine.getRatePerKm(params.vehicle, params.trip);
    if (!perKmRate) return null;

    let effectiveDistance = params.distanceKm;
    let days = 1;
    let extraDayAmount = 0;

    if (params.trip === TripType.ONE_WAY) {
      effectiveDistance = Math.max(params.distanceKm, MIN_ONE_WAY_KM);
    } else if (params.trip === TripType.ROUND_TRIP) {
      days = PricingEngine.calculateDays(params.pickupDate, params.returnDate);
      effectiveDistance = Math.max(params.distanceKm * 2, days * MIN_KM_PER_DAY);
      const isSedan = [VehicleType.ANY_SEDAN, VehicleType.SEDAN].includes(params.vehicle);
      const isSUV = [VehicleType.ANY_SUV, VehicleType.SUV].includes(params.vehicle);
      if (isSedan) extraDayAmount = (days - 1) *0;
      else if (isSUV) extraDayAmount = (days - 1) * 0;
      else if (params.vehicle === VehicleType.INNOVA) extraDayAmount = (days - 1) *0;
    } else if (params.trip === TripType.LOCAL) {
      effectiveDistance = Math.max(params.distanceKm, MIN_LOCAL_KM);
    }

    const distanceFare = Math.round(effectiveDistance * perKmRate);
    const totalBeta = PricingEngine.getDriverBeta(params.vehicle, params.trip, params.distanceKm) * days;

    return {
      total: Math.round(distanceFare + totalBeta + extraDayAmount),
      distanceFare,
      ratePerKm: perKmRate,
      distanceVal: effectiveDistance,
      multiplier: days,
      driverBeta: totalBeta,
      extraDayAmount
    };
  }
};

const InputWrapper = memo(({ children, icon: Icon, label, onClear, showClear }: { children: React.ReactNode; icon: any; label?: string; onClear?: () => void; showClear?: boolean }) => (
  <div className="relative group w-full">
    {label && <label className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 ml-1">{label}</label>}
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-red transition-colors duration-300 pointer-events-none z-10">
        <Icon size={14} />
      </div>
      {children}
      {showClear && onClear && (
        <button 
          type="button" 
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand-red transition-colors z-[30] p-1.5 flex items-center justify-center cursor-pointer rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X size={14} strokeWidth={3} />
        </button>
      )}
    </div>
  </div>
));

export const BookingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropInputRef = useRef<HTMLInputElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapInstance = useRef<any>(null);
  const directionsService = useRef<any>(null);
  const directionsRenderer = useRef<any>(null);
  const pickupAutocomplete = useRef<any>(null);
  const dropAutocomplete = useRef<any>(null);
  const programmaticUpdateRef = useRef(false);

  const [loadingFare, setLoadingFare] = useState(false);
  const [indiaToday, setIndiaToday] = useState('');
  
  const [formData, setFormData] = useState<BookingDetails>({
    name: '', phone: '', email: '', pickup: '', drop: '',
    date: '', time: '', returnDate: '', returnTime: '',
    vehicleType: VehicleType.SEDAN, tripType: TripType.ONE_WAY,
    distance: '', rawDistance: 0, estimatedFare: '',
  });

  const [breakdown, setBreakdown] = useState<FareBreakdown | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const availableVehicles = useMemo(() => {
    let baseList = Object.values(VehicleType);
    if (formData.tripType === TripType.ONE_WAY) {
      const allowed = [VehicleType.ANY_SEDAN, VehicleType.SEDAN, VehicleType.ANY_SUV, VehicleType.SUV, VehicleType.INNOVA];
      return baseList.filter(v => allowed.includes(v));
    }
    return baseList;
  }, [formData.tripType]);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [step]);

  useEffect(() => {
    const now = new Date();
    setIndiaToday(new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now));

    if ((window as any).google?.maps) {
      setGoogleLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleLoaded(true);
    document.head.appendChild(script);
  }, []);


  // 🔥 Google Autocomplete Light Theme Injection

  const style = document.createElement("style");
style.innerHTML = `
.pac-container {
  background-color: #ffffff !important;
  border-radius: 16px !important;
  border: 1px solid #e5e7eb !important;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
  padding: 6px 0 !important;
  z-index: 99999 !important;
  position: absolute !important;       /* key fix */
  max-height: 60vh !important;
  overflow-y: auto !important;
  font-family: 'Inter', sans-serif !important;
}

.pac-item {
  padding: 10px 16px !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  color: #111827 !important;
  display: flex !important;
  flex-direction: column !important;
  white-space: normal !important; /* allow full address wrap */
}

.pac-item .pac-item-query {
  font-weight: 900 !important;
  color: #ef4444 !important; /* red highlight */
}

.pac-item .pac-item-subtitle {
  font-weight: 400 !important;
  font-size: 12px !important;
  color: #6b7280 !important;
  display: block !important;
  white-space: normal !important;
  overflow-wrap: break-word !important; /* ensures long addresses wrap */
}

.pac-item:hover {
  background-color: #f3f4f6 !important;
}

.pac-logo:after {
  opacity: 0.6 !important; /* subtle "Powered by Google" */
}
  
`;

  document.head.appendChild(style);


  const calculateFareInternal = useCallback((origin: string, destination: string, vehicle: VehicleType, trip: TripType, distVal: number, distText: string, pickupDate: string, returnDate: string) => {
    const isShortOutstation = (trip === TripType.ONE_WAY || trip === TripType.ROUND_TRIP) && distVal < 60;

    if (isShortOutstation) {
  calculateFareInternal(
    origin,
    destination,
    vehicle,
    TripType.LOCAL,
    distVal,
    distText,
    pickupDate,
    returnDate
  );
  return;
}

    const result = PricingEngine.computeBreakdown({ origin, destination, vehicle, trip, distanceKm: distVal, pickupDate, returnDate });
    if (!result) {
      setFormData(prev => ({ ...prev, distance: distText, rawDistance: distVal, estimatedFare: 'Manual Quote' }));
      setBreakdown(null);
      return;
    }
    setFormData(prev => ({ ...prev, distance: distText, rawDistance: distVal, estimatedFare: `₹${result.total}` }));
    setBreakdown(result);
  }, []);

  const reverseGeocode = useCallback(async (latLng: any): Promise<string> => {
    if (!(window as any).google?.maps) return 'Location';
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode({ location: latLng }, (results: any, status: string) => {
        if (status === 'OK' && results?.[0]) resolve(results[0].formatted_address);
        else resolve('Location adjusted');
      });
    });
  }, []);

  const handleDirectionsChanged = useCallback(async () => {
    // CRITICAL: If this update came from our own code (autocomplete or step change), DO NOT overwrite text
    // This fixes the "Saravanampatti" -> "Hyper-specific street address" shift issue.
    if (programmaticUpdateRef.current || !directionsRenderer.current) return;
    
    try {
      const result = directionsRenderer.current.getDirections();
      if (!result?.routes?.[0]?.legs?.[0]) return;
      const leg = result.routes[0].legs[0];
      const distVal = leg.distance.value / 1000;
      const distText = leg.distance.text;
      
      // If we are here, it means the user MANUALLY dragged a pin.
      // In this case, we DO want the new specific address.
      const startAddr = await reverseGeocode(leg.start_location);
      const endAddr = await reverseGeocode(leg.end_location);
      
      setFormData(prev => {
        const updated = { ...prev, pickup: startAddr, drop: endAddr, distance: distText, rawDistance: distVal };
        calculateFareInternal(startAddr, endAddr, updated.vehicleType, updated.tripType, distVal, distText, updated.date, updated.returnDate || '');
        return updated;
      });

      if (pickupInputRef.current) pickupInputRef.current.value = startAddr;
      if (dropInputRef.current) dropInputRef.current.value = endAddr;
    } catch (err) {
      console.error("Map interaction update error:", err);
    }
  }, [calculateFareInternal, reverseGeocode]);

  useEffect(() => {
    if (!googleLoaded || step !== 1) return;

    const initAutocomplete = () => {
      if (!google?.maps?.places) return;
      const options = { 
        componentRestrictions: { country: 'IN' },
        fields: ['formatted_address', 'geometry', 'name'],
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(10.8, 76.9),
          new google.maps.LatLng(11.2, 77.0)
        ),
        strictBounds: false
      };

      if (pickupInputRef.current && !pickupAutocomplete.current) {
        pickupAutocomplete.current = new google.maps.places.Autocomplete(pickupInputRef.current, options);
        pickupAutocomplete.current.addListener('place_changed', () => {
          const place = pickupAutocomplete.current.getPlace();
          if (place?.formatted_address) {
            setFormData(prev => ({ ...prev, pickup: place.formatted_address }));
          }
        });
      }

      if (dropInputRef.current && !dropAutocomplete.current) {
        dropAutocomplete.current = new google.maps.places.Autocomplete(dropInputRef.current, options);
        dropAutocomplete.current.addListener('place_changed', () => {
          const place = dropAutocomplete.current.getPlace();
          if (place?.formatted_address) {
            setFormData(prev => ({ ...prev, drop: place.formatted_address }));
          }
        });
      }
    };

    const timer = setTimeout(initAutocomplete, 150);
    return () => {
      clearTimeout(timer);
      if (pickupAutocomplete.current) google.maps.event.clearInstanceListeners(pickupAutocomplete.current);
      if (dropAutocomplete.current) google.maps.event.clearInstanceListeners(dropAutocomplete.current);
      pickupAutocomplete.current = null;
      dropAutocomplete.current = null;
    };
  }, [googleLoaded, step]);

  useEffect(() => {
    // Only initialize map when entering Step 2
    if (!googleLoaded || step !== 2 || !mapContainerRef.current) return;

    const map = new google.maps.Map(mapContainerRef.current, {
      center: { lat: 11.0168, lng: 76.9558 },
      zoom: 12,
      disableDefaultUI: true,
      styles: [{ featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#333333" }] }]
    });
    mapInstance.current = map;

    const renderer = new google.maps.DirectionsRenderer({
      map: map,
      draggable: true,
      preserveViewport: false,
      polylineOptions: { strokeColor: "#FF6467", strokeWeight: 5, strokeOpacity: 1 }
    });
    directionsRenderer.current = renderer;
    directionsService.current = new google.maps.DirectionsService();

    renderer.addListener('directions_changed', handleDirectionsChanged);

    // Initial Route Fetch for Step 2
    if (formData.pickup && formData.drop) {
      programmaticUpdateRef.current = true;
      directionsService.current.route({ 
        origin: formData.pickup, 
        destination: formData.drop, 
        travelMode: google.maps.TravelMode.DRIVING 
      }, (result: any, status: string) => {
        if (status === 'OK') {
          renderer.setDirections(result);
          // Small delay ensures handleDirectionsChanged skips this initial update
          setTimeout(() => {
            programmaticUpdateRef.current = false;
            // Prevent map from resetting viewport on car changes later
            renderer.setOptions({ preserveViewport: true });
          }, 500);
        } else {
          programmaticUpdateRef.current = false;
        }
      });
    }
    

    return () => {
      if (directionsRenderer.current) google.maps.event.clearInstanceListeners(directionsRenderer.current);
      mapInstance.current = null;
      directionsRenderer.current = null;
    };
  }, [googleLoaded, step, handleDirectionsChanged]); 

  const calculateDistanceFare = useCallback((origin: string, destination: string, vehicle: VehicleType, trip: TripType, pickupDate: string, returnDate: string) => {
    if (!googleLoaded || !origin || !destination) return;
    setLoadingFare(true);
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({ 
      origins: [origin], 
      destinations: [destination], 
      travelMode: google.maps.TravelMode.DRIVING 
    }, (response: any, status: string) => {
      setLoadingFare(false);
      if (status === 'OK' && response?.rows[0]?.elements[0]?.status === 'OK') {
        const el = response.rows[0].elements[0];
        const distVal = el.distance.value / 1000;
        calculateFareInternal(origin, destination, vehicle, trip, distVal, el.distance.text, pickupDate, returnDate);
      }
    });
  }, [googleLoaded, calculateFareInternal]);

  const handleNextStep = () => {
    const p = pickupInputRef.current?.value || formData.pickup;
    const d = dropInputRef.current?.value || formData.drop;
    
    if (p && d && (formData.tripType === TripType.LOCAL || (formData.date && formData.time))) {
      if (formData.tripType === TripType.ROUND_TRIP && !formData.returnDate) {
        alert("Please select a return date.");
        return;
      }
      setFormData(prev => ({ ...prev, pickup: p, drop: d }));
      calculateDistanceFare(p, d, formData.vehicleType, formData.tripType, formData.date, formData.returnDate || '');
      setStep(2);
    } else {
      alert("Please fill in all the required details.");
    }
  };

  const clearInput = (type: 'pickup' | 'drop') => {
    if (type === 'pickup') {
      if (pickupInputRef.current) pickupInputRef.current.value = '';
      setFormData(prev => ({ ...prev, pickup: '' }));
    } else {
      if (dropInputRef.current) dropInputRef.current.value = '';
      setFormData(prev => ({ ...prev, drop: '' }));
    }
  };

  const switchToLocal = () => {
    if (formData.rawDistance === undefined) return;
    setFormData(prev => ({ ...prev, tripType: TripType.LOCAL }));
    calculateFareInternal(formData.pickup, formData.drop, formData.vehicleType, TripType.LOCAL, formData.rawDistance, formData.distance || '0 KM', formData.date, formData.returnDate || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length === 10) {
      setLoading(true);
      sendBookingEmail(formData).then(() => {
        setSubmitted(true);
        setLoading(false);
      });
    } else {
      alert("Enter a valid 10-digit mobile number.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 text-center max-w-sm mx-auto animate-fade-in">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6"><CheckCircle2 size={40} /></div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight text-center">Booked! Driver calling soon!</h2>
        <button onClick={() => window.open(`https://wa.me/919488834020?text=Booking: ${formData.tripType} from ${formData.pickup} to ${formData.drop}`, '_blank')} className="w-full bg-[#25D366] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 mb-4 shadow-lg active:scale-95 transition-transform"><MessageCircle size={20} /> Chat on WhatsApp</button>
        <button onClick={() => { setSubmitted(false); setStep(1); }} className="w-full text-[10px] font-black text-brand-red uppercase underline tracking-widest">New Booking</button>
      </div>
    );
  }

  const showLocalSuggestion = formData.rawDistance !== undefined && formData.rawDistance < 50 && (formData.tripType === TripType.ONE_WAY || formData.tripType === TripType.ROUND_TRIP);

  return (
    <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-[95%] sm:max-w-sm mx-auto transition-all duration-500">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
           <Activity size={14} className="text-brand-red animate-pulse" />
           <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Quick Booking</h3>
        </div>
        <div className="flex gap-1.5">
          <div className={`h-1 w-4 rounded-full transition-all ${step === 1 ? 'bg-brand-red' : 'bg-slate-200 dark:bg-slate-800'}`} />
          <div className={`h-1 w-4 rounded-full transition-all ${step === 2 ? 'bg-brand-red' : 'bg-slate-200 dark:bg-slate-800'}`} />
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-4 animate-fade-in">
          <div className="relative flex p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl">
            <div className="absolute h-[calc(100%-12px)] top-1.5 bottom-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-md transition-all duration-300 ease-out" style={{ 
              width: '33.33%', left: formData.tripType === TripType.ONE_WAY ? '0%' : formData.tripType === TripType.ROUND_TRIP ? '33.33%' : '66.66%' 
            }} />
            {[TripType.ONE_WAY, TripType.ROUND_TRIP, TripType.LOCAL].map((type) => (
              <button key={type} type="button" onClick={() => setFormData(prev => ({ ...prev, tripType: type }))} className={`relative z-10 flex-1 py-2.5 text-[8px] font-black uppercase tracking-tight rounded transition-colors duration-300 ${formData.tripType === type ? 'text-brand-red' : 'text-slate-400'}`}>
                {type === TripType.ROUND_TRIP ? 'Round' : type === TripType.ONE_WAY ? 'One-Way' : 'Local'}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <InputWrapper icon={MapPin} label="Pickup Location" onClear={() => clearInput('pickup')} showClear={formData.pickup.length > 0}>
              <input ref={pickupInputRef} type="text" placeholder="Start Location" defaultValue={formData.pickup} className="w-full pl-9 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-transparent dark:border-slate-800 focus:border-brand-red rounded-xl text-xs font-bold outline-none dark:text-white" />
            </InputWrapper>
            <InputWrapper icon={MapPin} label="Drop Location" onClear={() => clearInput('drop')} showClear={formData.drop.length > 0}>
              <input ref={dropInputRef} type="text" placeholder="Destination" defaultValue={formData.drop} className="w-full pl-9 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-transparent dark:border-slate-800 focus:border-brand-red rounded-xl text-xs font-bold outline-none dark:text-white" />
            </InputWrapper>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InputWrapper icon={Calendar} label="Date"><input type="date" min={indiaToday} value={formData.date} onChange={(e) => setFormData(p => ({...p, date: e.target.value}))} className="w-full pl-9 pr-1 py-2.5 bg-slate-50 dark:bg-slate-950 border border-transparent dark:border-slate-800 rounded-xl text-[10px] font-black outline-none dark:text-white uppercase" /></InputWrapper>
            <InputWrapper icon={Clock} label="Time"><input type="time" value={formData.time} onChange={(e) => setFormData(p => ({...p, time: e.target.value}))} className="w-full pl-9 pr-1 py-2.5 bg-slate-50 dark:bg-slate-950 border border-transparent dark:border-slate-800 rounded-xl text-[10px] font-black outline-none dark:text-white" /></InputWrapper>
          </div>
          {formData.tripType === TripType.ROUND_TRIP && (
            <InputWrapper icon={Calendar} label="Return Date"><input type="date" min={formData.date || indiaToday} value={formData.returnDate} onChange={(e) => setFormData(p => ({...p, returnDate: e.target.value}))} className="w-full pl-9 pr-1 py-2.5 bg-slate-50 dark:bg-slate-950 border border-transparent dark:border-slate-800 rounded-xl text-[10px] font-black outline-none dark:text-white uppercase" /></InputWrapper>
          )}
          <button type="button" onClick={handleNextStep} className="w-full bg-brand-red text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl text-[11px] uppercase tracking-widest active:scale-[0.98] transition-transform">Continue Booking <Navigation size={18} /></button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          <div className="relative h-52 rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
            <div ref={mapContainerRef} className="w-full h-full" />
           
          </div>

          {showLocalSuggestion && (
             <div className="bg-brand-red/10 border-2 border-brand-red/20 p-4 rounded-2xl flex items-start gap-3 animate-fade-in ring-2 ring-brand-red/5 ring-offset-2 ring-offset-white dark:ring-offset-slate-900">
               <Zap size={18} className="text-brand-red flex-shrink-0 mt-1" />
               <div className="flex-1">
                 <p className="text-[10px] font-black text-brand-red uppercase mb-1">Short Trip Detected</p>
                 <p className="text-[9px] text-slate-600 dark:text-slate-400 font-bold uppercase mb-3">Distance is only <strong>{formData.rawDistance?.toFixed(0)} KM</strong>. Outstation rates won't apply. Switch to Local.</p>
                 <button type="button" onClick={switchToLocal} className="w-full bg-brand-red text-white py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-accent transition-all shadow-lg">
                   Switch to Local Package <ArrowRight size={12} />
                 </button>
               </div>
             </div>
          )}
          
          <div className="bg-slate-50 dark:bg-slate-950 border-2 border-brand-red/20 rounded-2xl overflow-hidden shadow-md">
            <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => setShowBreakdown(!showBreakdown)}>
              <div>
                <span className="text-[10px] font-black text-brand-red uppercase tracking-widest block mb-1">{formData.tripType === TripType.LOCAL ? 'Local All-Inclusive' : 'Outstation Estimate'}</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{loadingFare ? <RefreshCw size={24} className="animate-spin" /> : (formData.estimatedFare === 'Unavailable' ? 'N/A' : (formData.estimatedFare || '₹0'))}</span>
              </div>
              <div className="px-3 py-1.5 bg-brand-red rounded-xl text-[10px] font-black text-white font-mono">{formData.distance || '0 KM'}</div>
            </div>
            {showBreakdown && breakdown && (
              <div className="px-5 pb-5 space-y-3 border-t border-slate-100 dark:border-slate-800/50 pt-5 animate-fade-in text-[10px] font-mono">
                  {formData.tripType === TripType.LOCAL ? (
                    <div className="bg-brand-red/5 p-4 rounded-xl border border-brand-red/20">
                      <div className="flex justify-between items-center mb-1"><span className="text-[11px] font-black text-brand-red uppercase">Total Payable</span><span className="text-xl font-black text-brand-red">₹ {breakdown.total}</span></div>
                      <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">No hidden charges</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between"><span>KM Charge ({breakdown.distanceVal.toFixed(0)}km)</span><span>₹ {breakdown.distanceFare}</span></div>
                      <div className="flex justify-between"><span>Driver Beta ({breakdown.multiplier} days)</span><span>₹ {breakdown.driverBeta}</span></div>
                      {breakdown.extraDayAmount ? <div className="flex justify-between"><span>Extra Day Charges</span><span>₹ {breakdown.extraDayAmount}</span></div> : null}
                      <div className="flex justify-between font-black text-brand-red uppercase text-[11px] pt-2 border-t"><span>Grand Total</span><span>₹ {breakdown.total}</span></div>
                    </>
                  )}
                  <div className="mt-4 p-3 bg-brand-red/5 border border-brand-red/10 rounded-xl flex gap-2 items-start"><AlertCircle size={14} className="text-brand-red flex-shrink-0 mt-0.5" /><p className="text-[9px] font-black text-brand-red uppercase tracking-tight leading-relaxed">Parking, tolls, interstate permits, and any extra kilometers driven will be charged based on actual usage.</p></div>
              </div>
            )}
          </div>

          {!showLocalSuggestion ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <InputWrapper icon={Car} label="Select Vehicle">
                  <select 
                    value={formData.vehicleType} 
                    onChange={(e) => { 
                      const v = e.target.value as VehicleType; 
                      setFormData(prev => ({ ...prev, vehicleType: v })); 
                      if (formData.pickup && formData.drop) {
                        calculateFareInternal(formData.pickup, formData.drop, v, formData.tripType, formData.rawDistance || 0, formData.distance || '0 KM', formData.date, formData.returnDate || '');
                      }
                    }} 
                    className="w-full pl-9 pr-2 py-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl text-[10px] font-black dark:text-white uppercase appearance-none"
                  >
                    {availableVehicles.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </InputWrapper>
                <InputWrapper icon={User} label="Your Name (Optional)"><input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-bold dark:text-white" /></InputWrapper>
              </div>
              <InputWrapper label="Enter valid contact number" icon={Phone}><input type="tel" required maxLength={10} placeholder="10 digit number" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value.replace(/\D/g, '') }))} className={`w-full pl-9 pr-10 py-3 border-2 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm font-black dark:text-white ${formData.phone.length === 10 ? 'border-green-500' : 'border-brand-red'}`} /></InputWrapper>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setStep(1)} className="p-3.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl border border-slate-100 transition-colors"><ArrowLeft size={20} /></button>
                <button type="submit" disabled={loading} className="flex-1 bg-brand-red text-white font-black py-4 rounded-2xl shadow-xl uppercase tracking-widest text-[11px] active:scale-[0.98] transition-transform disabled:opacity-50">{loading ? 'Processing...' : 'Confirm Request'}</button>
              </div>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setStep(1)} className="w-full p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-2xl border flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"><ArrowLeft size={16} /> Edit Locations</button>
            </div>
          )}
        </form>
      )}
      
    </div>
  );
};