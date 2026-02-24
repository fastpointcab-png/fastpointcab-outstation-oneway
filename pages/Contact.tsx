import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const Contact: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);

  const handleWhatsAppClick = () => {
    const text = `Hello, I would like to inquire about your taxi services.`;
    const phoneNumber = '919488834020';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20">
      <div className="container mx-auto px-4">
<div className="text-center mb-16">
  {/* Logo with Modern Card Style */}
  <div className="flex justify-center mb-6">
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-red to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800">
        <img
          src="/images/taxi-icon-512.png"
          alt="FastPoint Cab - Coimbatore Taxi Service Logo"
          className="h-20 md:h-24 w-auto object-contain"
        />
      </div>
    </div>
  </div>

  {/* Brand Name */}
  <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-brand-red to-orange-500 bg-clip-text text-transparent tracking-tight">
    FastPoint Cab
  </h1>

  {/* Subtitle */}
  <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
    24/7 Outstation • Airport Transfers • One-Way Cabs in Coimbatore
  </p>

  {/* Trust Badge Row */}
  <div className="mt-6 flex flex-wrap justify-center gap-3">
    <span className="px-4 py-2 text-sm font-semibold rounded-full bg-green-100 text-green-700">
      ✔ Verified Taxi Service
    </span>
    <span className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-100 text-blue-700">
      ✔ 24/7 Customer Support
    </span>
    <span className="px-4 py-2 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-700">
      ✔ Transparent Pricing
    </span>
  </div>
</div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Column */}
          <div className="space-y-8 flex flex-col h-full">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex-1 flex flex-col">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                  Customer Support
                </h3>

                <div className="space-y-8">
                  <a href="tel:+919488834020" className="flex items-start gap-6 group">
                    <div className="bg-brand-red/10 p-4 rounded-2xl text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-slate-900 dark:text-white">
                        Phone
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        +91 94888 34020
                      </p>
                    </div>
                  </a>

                  <a href="mailto:fastpointcab@gmail.com" className="flex items-start gap-6 group">
                    <div className="bg-brand-red/10 p-4 rounded-2xl text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-slate-900 dark:text-white">
                        Email
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        fastpointcab@gmail.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-6">
                    <div className="bg-brand-red/10 p-4 rounded-2xl text-brand-red">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-slate-900 dark:text-white">
                        Address
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        FastPoint Cab – Taxi Services <br />
                        Coimbatore, Tamil Nadu 641014
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsive Google Map Embed */}
              <div className="w-full h-64 mt-12 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-500">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.44163071375!2d76.88483286780826!3d11.014203302096378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c817186f121b!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709555000000!5m2!1sen!2sin"
                  className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  title="Coimbatore Map"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Booking & Terms Column */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border-2 border-dashed border-brand-red/40 text-center flex flex-col justify-between h-full">
            <div>
              <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-red animate-pulse">
                <MessageCircle size={40} />
              </div>

              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Booking Support
              </h3>

              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                For new bookings, trip changes, or any support, our team is available 24/7 to help you with your journey.
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 text-xl transition-all shadow-lg hover:shadow-[#25D366]/20"
                >
                  <MessageCircle size={24} />
                  WhatsApp Now
                </button>

                <a
                  href="tel:+919488834020"
                  className="w-full bg-white dark:bg-slate-800 text-brand-red border-2 border-brand-red py-5 rounded-2xl flex items-center justify-center gap-3 text-xl font-bold hover:bg-brand-red hover:text-white transition-all shadow-sm shadow-brand-red/10"
                >
                  <Phone size={24} />
                  Call Directly
                </a>
              </div>
            </div>

            {/* Terms & Conditions Section */}
            <div className="mt-12 text-left">
              <button
                onClick={() => setShowTerms(!showTerms)}
                className={`flex items-center justify-between w-full font-bold text-lg p-5 rounded-2xl transition-all border-2 ${showTerms ? 'bg-brand-red text-white border-brand-red' : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-100 dark:border-slate-700 hover:border-brand-red'}`}
              >
                <span>Terms and Conditions</span>
                {showTerms ? <ChevronUp /> : <ChevronDown className="text-brand-red" />}
              </button>

              {showTerms && (
                <div className="mt-4 p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl text-sm text-slate-600 dark:text-slate-400 space-y-3 animate-fade-in max-h-96 overflow-y-auto thin-scrollbar border border-brand-red/10">
                  <p>1. All taxi bookings are subject to availability.</p>
                  <p>2. Customers must provide accurate pickup and drop location details.</p>
                  <p>3. Payments can be made in cash or via approved digital payment methods.</p>
                  <p>4. Our service is not responsible for delays due to traffic, weather, or unforeseen circumstances.</p>
                  <p>5. Cancellation policies apply; cancellation fees are applicable. Please refer to our cancellation terms when booking.</p>
                  <p>6. By using our services, you agree to follow all applicable local regulations.</p>
                  <p>7. One day is equal to one calendar day (from midnight to midnight).</p>
                  <p>8. Parking, toll, and interstate permit charges are extra.</p>
                  <p>9. Driver allowance will be extra if the driver drives between 10:00 PM to 6:00 AM.</p>
                  <p>10. Total km and time calculation is from office to office.</p>
                  <p>11. AC will not work in hill areas (upwards) and stopped/parked vehicles.</p>
                  <p>12. If km usage exceeds standard limits, tariff shifts automatically to Day/KM Basis.</p>
                  <p>13. Bookings made via online ads may appear when searching for other brands. Our service is only responsible for bookings actually made with us. Customers cannot claim services from other brands using our ad links.</p>
                  <p className="font-bold text-brand-red border-t border-brand-red/10 pt-3">14. Our website and booking page may appear in search results when customers search for other taxi brand names. By clicking our advertisement, website link, WhatsApp, or call button, the customer acknowledges that they are contacting our company directly, not any other brand.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};