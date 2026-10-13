import React, { useState } from 'react';
import {
  Globe2,
  Calendar,
  Users,
  ArrowRight,
  ShieldCheck,
  Building,
  Briefcase,
  GraduationCap,
  Heart,
  Plane,
  Sparkles,
  MapPin,
  Coins
} from 'lucide-react';
import { POPULAR_INTERNATIONAL_DESTINATIONS, DEPARTURE_COUNTRIES } from '../data/destinationsData';

interface HeroSectionProps {
  onPlanTrip: (params: {
    departureCountry: string;
    departureCity: string;
    destinationCountry: string;
    destinationCity: string;
    startDate: string;
    endDate: string;
    travellersCount: number;
    purpose: 'tourism' | 'business' | 'study' | 'family';
    totalBudgetUSD: number;
    preferredCurrency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'SGD' | 'JPY';
  }) => void;
  onExploreClick: () => void;
  onOpenVisaAssistant: (countryId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPlanTrip,
  onExploreClick,
  onOpenVisaAssistant
}) => {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setDate(today.getDate() + 25);
  const nextMonthReturn = new Date(nextMonth);
  nextMonthReturn.setDate(nextMonth.getDate() + 7);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [departureCountry, setDepartureCountry] = useState('India');
  const [departureCity, setDepartureCity] = useState('Mumbai');
  const [destinationCountry, setDestinationCountry] = useState('United Arab Emirates');
  const [destinationCity, setDestinationCity] = useState('Dubai');
  const [startDate, setStartDate] = useState(formatDate(nextMonth));
  const [endDate, setEndDate] = useState(formatDate(nextMonthReturn));
  const [travellersCount, setTravellersCount] = useState(2);
  const [purpose, setPurpose] = useState<'tourism' | 'business' | 'study' | 'family'>('tourism');
  const [budgetUSD, setBudgetUSD] = useState(2800);
  const [preferredCurrency, setPreferredCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'SGD' | 'JPY'>('USD');

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dest = POPULAR_INTERNATIONAL_DESTINATIONS.find(d => d.name === e.target.value);
    if (dest) {
      setDestinationCity(dest.name);
      setDestinationCountry(dest.country);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlanTrip({
      departureCountry,
      departureCity,
      destinationCountry,
      destinationCity,
      startDate,
      endDate,
      travellersCount,
      purpose,
      totalBudgetUSD: budgetUSD,
      preferredCurrency
    });
  };

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center bg-[#102A43] overflow-hidden">
      {/* Background Cinematic International Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=85"
          alt="International skyline travel destination"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#102A43]/90 via-[#102A43]/75 to-[#102A43]/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center flex flex-col items-center">
        {/* Brand Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DCE8DF] text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
          <Globe2 className="w-4 h-4 text-[#FF8066]" />
          <span>SAATHI — Smart Assistance for All Travel, Hotels & International Journeys</span>
        </div>

        {/* Hero Heading */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-5xl text-balance">
          Explore the World. <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#FF8066]">We'll Take Care of the Details.</span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-5 text-base sm:text-xl text-[#FAF8F3]/90 max-w-3xl font-normal leading-relaxed">
          From visa preparation to hotel recommendations, SAATHI makes international travel simpler, smarter, and stress-free.
        </p>

        {/* Floating International Trip Search Form */}
        <div className="mt-10 w-full max-w-5xl bg-[#FAF8F3] rounded-3xl shadow-2xl p-5 sm:p-7 lg:p-8 text-left border border-white/40">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Departure */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-[#247BA0]" />
                  <span>Departure (Origin)</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <select
                    value={departureCountry}
                    onChange={(e) => {
                      setDepartureCountry(e.target.value);
                      const c = DEPARTURE_COUNTRIES.find(dc => dc.name === e.target.value);
                      if (c && c.cities.length > 0) setDepartureCity(c.cities[0]);
                    }}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-2.5 py-2 text-xs text-[#102A43] font-semibold focus:outline-none focus:ring-2 focus:ring-[#247BA0] cursor-pointer"
                  >
                    {DEPARTURE_COUNTRIES.map(c => (
                      <option key={c.code} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-2.5 py-2 text-xs text-[#102A43] font-semibold focus:outline-none focus:ring-2 focus:ring-[#247BA0] cursor-pointer"
                  >
                    {(DEPARTURE_COUNTRIES.find(c => c.name === departureCountry)?.cities || ['Mumbai', 'Delhi']).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Destination */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF8066]" />
                  <span>Destination Country & City</span>
                </label>
                <select
                  value={destinationCity}
                  onChange={handleDestinationChange}
                  className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs text-[#102A43] font-bold focus:outline-none focus:ring-2 focus:ring-[#247BA0] cursor-pointer"
                >
                  {POPULAR_INTERNATIONAL_DESTINATIONS.map(d => (
                    <option key={d.id} value={d.name}>
                      {d.flag} {d.name}, {d.country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Dates */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#247BA0]" />
                  <span>Departure & Return Dates</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-2 py-2 text-xs text-[#102A43] font-medium focus:outline-none focus:ring-2 focus:ring-[#247BA0]"
                  />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-2 py-2 text-xs text-[#102A43] font-medium focus:outline-none focus:ring-2 focus:ring-[#247BA0]"
                  />
                </div>
              </div>

              {/* Travellers & Group */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#247BA0]" />
                  <span>Travellers</span>
                </label>
                <select
                  value={travellersCount}
                  onChange={(e) => setTravellersCount(Number(e.target.value))}
                  className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs text-[#102A43] font-semibold focus:outline-none focus:ring-2 focus:ring-[#247BA0] cursor-pointer"
                >
                  <option value={1}>1 Solo Traveller</option>
                  <option value={2}>2 Travellers (Couple / Duo)</option>
                  <option value={3}>3 Friends Group</option>
                  <option value={4}>4 Travellers (Family / Group)</option>
                  <option value={6}>6+ Group Expedition</option>
                </select>
              </div>

              {/* Travel Purpose */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#247BA0]" />
                  <span>Travel Purpose</span>
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as any)}
                  className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs text-[#102A43] font-semibold focus:outline-none focus:ring-2 focus:ring-[#247BA0] cursor-pointer"
                >
                  <option value="tourism">🏝️ Tourism & Leisure</option>
                  <option value="business">💼 Business & Meetings</option>
                  <option value="study">🎓 Education & Study</option>
                  <option value="family">👨‍👩‍👦 Visiting Family & Friends</option>
                </select>
              </div>

              {/* Budget & Preferred Currency */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-[#247BA0]" />
                  <span>Budget & Currency</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="number"
                    min={500}
                    step={100}
                    value={budgetUSD}
                    onChange={(e) => setBudgetUSD(Math.max(500, Number(e.target.value)))}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-2.5 py-2 text-xs text-[#102A43] font-bold focus:outline-none focus:ring-2 focus:ring-[#247BA0]"
                  />
                  <select
                    value={preferredCurrency}
                    onChange={(e) => setPreferredCurrency(e.target.value as any)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-2 py-2 text-xs text-[#102A43] font-bold focus:outline-none focus:ring-2 focus:ring-[#247BA0] cursor-pointer"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="AED">AED (AED)</option>
                    <option value="SGD">SGD (S$)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#243E56]">
                <span className="font-semibold text-[#102A43]">Popular International:</span>
                {POPULAR_INTERNATIONAL_DESTINATIONS.slice(0, 4).map(d => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setDestinationCity(d.name);
                      setDestinationCountry(d.country);
                    }}
                    className="hover:text-[#FF8066] font-medium transition-colors cursor-pointer"
                  >
                    {d.flag} {d.name} ·
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FF8066] hover:bg-[#E7684F] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Plan My International Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white/90 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#DCE8DF]" />
            <span>Official Visa & Immigration Guides</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-[#DCE8DF]" />
            <span>Curated International Stays</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-[#DCE8DF]" />
            <span>Simulated Travel Saathi Concierge</span>
          </div>
        </div>
      </div>
    </div>
  );
};
