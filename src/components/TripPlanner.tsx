import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Compass,
  CheckCircle2,
  Bookmark,
  Calculator,
  Sun,
  Coffee,
  Moon,
  ChevronDown,
  ChevronUp,
  Share2,
  RefreshCw,
  Info,
  Send
} from 'lucide-react';
import { POPULAR_DESTINATIONS, DEPARTURE_CITIES } from '../data/destinationsData';
import { generateSmartItinerary } from '../services/itineraryGenerator';
import { TripPlan, DayPlan, Activity } from '../types/travel';

interface TripPlannerProps {
  initialParams?: {
    destination?: string;
    departureCity?: string;
    startDate?: string;
    endDate?: string;
    travellersCount?: number;
    totalBudgetINR?: number;
  };
  onSaveTrip: (trip: TripPlan) => void;
  onBookTrip?: (trip: TripPlan) => void;
  onOpenBudget: (trip: TripPlan) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({
  initialParams,
  onSaveTrip,
  onBookTrip,
  onOpenBudget,
  onShowToast
}) => {
  // Dates calculation helper
  const today = new Date();
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7 || 7));
  const nextMonday = new Date(nextFriday);
  nextMonday.setDate(nextFriday.getDate() + 3);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  // Form states
  const [destination, setDestination] = useState(initialParams?.destination || 'Goa');
  const [departureCity, setDepartureCity] = useState(initialParams?.departureCity || 'Pune');
  const [startDate, setStartDate] = useState(initialParams?.startDate || formatDate(nextFriday));
  const [endDate, setEndDate] = useState(initialParams?.endDate || formatDate(nextMonday));
  const [travellersCount, setTravellersCount] = useState(initialParams?.travellersCount || 2);
  const [totalBudgetINR, setTotalBudgetINR] = useState(initialParams?.totalBudgetINR || 22000);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([
    'relaxation',
    'food',
    'culture'
  ]);
  const [transportMode] = useState<'flight' | 'train' | 'bus' | 'car'>('flight');
  const [pace, setPace] = useState<'relaxed' | 'balanced' | 'fast-paced'>('balanced');

  // Generation & Active View
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState<TripPlan | null>(null);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true, 2: true });

  // Update if initialParams change
  useEffect(() => {
    if (initialParams?.destination) setDestination(initialParams.destination);
    if (initialParams?.departureCity) setDepartureCity(initialParams.departureCity);
    if (initialParams?.startDate) setStartDate(initialParams.startDate);
    if (initialParams?.endDate) setEndDate(initialParams.endDate);
    if (initialParams?.travellersCount) setTravellersCount(initialParams.travellersCount);
    if (initialParams?.totalBudgetINR) setTotalBudgetINR(initialParams.totalBudgetINR);
  }, [initialParams]);

  const preferencesList = [
    { id: 'adventure', label: 'Adventure & Treks' },
    { id: 'relaxation', label: 'Relaxation & Beaches' },
    { id: 'culture', label: 'Culture & Heritage' },
    { id: 'food', label: 'Culinary & Street Food' },
    { id: 'nature', label: 'Nature & Wildlife' },
    { id: 'shopping', label: 'Shopping & Bazaars' }
  ];

  const handlePreferenceToggle = (id: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const currentDestObj = POPULAR_DESTINATIONS.find(
    (d) => d.name.toLowerCase() === destination.toLowerCase()
  ) || POPULAR_DESTINATIONS[0];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      onShowToast('Please select a destination', 'error');
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      onShowToast('Return date must be after departure date', 'error');
      return;
    }

    setIsGenerating(true);
    setGenerationStep(1);

    setTimeout(() => setGenerationStep(2), 400);
    setTimeout(() => setGenerationStep(3), 800);
    setTimeout(() => {
      const plan = generateSmartItinerary({
        destination,
        departureCity,
        startDate,
        endDate,
        travellersCount,
        totalBudgetINR,
        preferences: selectedPreferences,
        transportMode,
        pace
      });
      setGeneratedPlan(plan);
      setIsGenerating(false);
      onShowToast(`Itinerary generated for ${destination}!`, 'success');

      // Expand all days by default
      const exp: Record<number, boolean> = {};
      plan.days.forEach((d) => (exp[d.dayNumber] = true));
      setExpandedDays(exp);

      // Scroll smoothly to results
      const resEl = document.getElementById('itinerary-results');
      if (resEl) {
        resEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  };

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const handleSave = () => {
    if (generatedPlan) {
      onSaveTrip(generatedPlan);
      onShowToast(`Trip to ${generatedPlan.destination} saved to My Trips!`, 'success');
    }
  };

  const handleExport = () => {
    if (!generatedPlan) return;
    const summary = `${generatedPlan.title}\nDates: ${generatedPlan.startDate} to ${generatedPlan.endDate} (${generatedPlan.travellersCount} travellers)\nTotal Budget: ₹${generatedPlan.totalBudgetINR.toLocaleString('en-IN')}\nEstimated Cost: ₹${generatedPlan.estimatedTotalINR.toLocaleString('en-IN')}\n\n` +
      generatedPlan.days.map(d => `Day ${d.dayNumber} (${d.dateStr}) - ${d.theme}\n` + d.activities.map(a => `  • ${a.time} [${a.period.toUpperCase()}]: ${a.title} - ₹${a.estimatedCostINR}`).join('\n') + `\n  Tip: ${d.insiderTip}`).join('\n\n');

    navigator.clipboard.writeText(summary);
    onShowToast('Trip summary copied to clipboard!', 'success');
  };

  return (
    <div id="plan" className="py-16 lg:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#247BA0] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#FF8066]" />
            <span>Smart Dynamic Itinerary Engine</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight">
            Plan your next journey.
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#243E56]">
            Enter your dates, travellers, and budget to generate a realistic, paced Indian travel itinerary with authentic food and transport suggestions.
          </p>
        </div>

        {/* Split Layout: Form on Left, Destination Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E2DDD2] shadow-sm">
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Row 1: Destination & Departure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5">
                    Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#102A43] focus:ring-2 focus:ring-[#247BA0] focus:outline-none cursor-pointer"
                  >
                    {POPULAR_DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.state})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5">
                    Departure City
                  </label>
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#102A43] focus:ring-2 focus:ring-[#247BA0] focus:outline-none cursor-pointer"
                  >
                    {DEPARTURE_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-[#102A43] focus:ring-2 focus:ring-[#247BA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-[#102A43] focus:ring-2 focus:ring-[#247BA0] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Travellers & Total Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5">
                    Number of Travellers
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                    <select
                      value={travellersCount}
                      onChange={(e) => setTravellersCount(Number(e.target.value))}
                      className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-[#102A43] focus:ring-2 focus:ring-[#247BA0] focus:outline-none cursor-pointer"
                    >
                      <option value={1}>1 Solo Traveller</option>
                      <option value={2}>2 Travellers (Duo / Couple)</option>
                      <option value={3}>3 Travellers</option>
                      <option value={4}>4 Travellers (Group/Family)</option>
                      <option value={5}>5+ Travellers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5">
                    Planned Budget (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm font-bold text-gray-500">₹</span>
                    <input
                      type="number"
                      min={3000}
                      step={1000}
                      value={totalBudgetINR}
                      onChange={(e) => setTotalBudgetINR(Math.max(1000, Number(e.target.value)))}
                      className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-semibold text-[#102A43] focus:ring-2 focus:ring-[#247BA0] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Travel Preferences */}
              <div>
                <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-2">
                  Trip Preferences (Select multiple)
                </label>
                <div className="flex flex-wrap gap-2">
                  {preferencesList.map((pref) => {
                    const isSelected = selectedPreferences.includes(pref.id);
                    return (
                      <button
                        key={pref.id}
                        type="button"
                        onClick={() => handlePreferenceToggle(pref.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#247BA0] text-white shadow-sm'
                            : 'bg-[#FAF8F3] text-[#243E56] border border-[#E2DDD2] hover:bg-gray-100'
                        }`}
                      >
                        {pref.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Itinerary Pacing */}
              <div>
                <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-2">
                  Itinerary Pacing
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'relaxed', label: 'Relaxed', desc: 'Leisurely pace' },
                    { id: 'balanced', label: 'Balanced', desc: 'Classic sightseeing' },
                    { id: 'fast-paced', label: 'Active', desc: 'Action-packed' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPace(p.id as any)}
                      className={`py-2.5 px-3 text-center rounded-xl border transition-all cursor-pointer ${
                        pace === p.id
                          ? 'bg-[#102A43] text-white border-[#102A43] shadow-xs'
                          : 'bg-[#FAF8F3] text-gray-700 border-[#E2DDD2] hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-xs font-bold">{p.label}</div>
                      <div className={`text-[10px] mt-0.5 ${pace === p.id ? 'text-gray-200' : 'text-gray-400'}`}>
                        {p.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-4 bg-[#FF8066] hover:bg-[#E7684F] text-white font-semibold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>
                        {generationStep === 1
                          ? 'Analyzing Route & Destinations...'
                          : generationStep === 2
                          ? 'Curating Morning, Afternoon & Evening Spots...'
                          : 'Optimizing Budget Breakdown...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate My Itinerary</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Destination Preview Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl overflow-hidden border border-[#E2DDD2] shadow-sm sticky top-24">
            <div className="relative h-56 w-full">
              <img
                src={currentDestObj.imageUrl}
                alt={currentDestObj.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-semibold text-[#DCE8DF] uppercase tracking-wider">
                  Destination Focus
                </div>
                <h3 className="font-display text-2xl font-bold">
                  {currentDestObj.name}, {currentDestObj.state}
                </h3>
                <p className="text-xs text-white/90 line-clamp-1 mt-0.5">
                  {currentDestObj.tagline}
                </p>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E2DDD2]">
                  <span className="text-gray-500 block">Best Season</span>
                  <span className="font-semibold text-[#102A43] mt-0.5 block">
                    {currentDestObj.bestTimeToVisit}
                  </span>
                </div>
                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E2DDD2]">
                  <span className="text-gray-500 block">Typical Daily Cost</span>
                  <span className="font-semibold text-[#247BA0] mt-0.5 block">
                    ~₹{currentDestObj.dailyBudgetINR.toLocaleString('en-IN')} / person
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase text-gray-500 tracking-wider mb-2">
                  Top Experiences:
                </div>
                <ul className="text-xs text-[#243E56] space-y-1.5">
                  {currentDestObj.attractions.slice(0, 4).map((att, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF8066]" />
                      <span>{att}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-[#486581]">
                <span>Nearest transit hub:</span>
                <span className="font-medium text-[#102A43] text-right truncate max-w-[200px]">
                  {currentDestObj.nearestHub}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Itinerary Section Display */}
        {generatedPlan && (
          <div id="itinerary-results" className="mt-16 pt-8 border-t border-[#E2DDD2] animate-in fade-in duration-500">
            {/* Overview Banner */}
            <div className="bg-[#102A43] text-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#DCE8DF] text-xs font-semibold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tailored Itinerary Ready</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">
                    {generatedPlan.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/80">
                    <span>{generatedPlan.departureCity} → {generatedPlan.destination}</span>
                    <span>·</span>
                    <span>{generatedPlan.days.length} Days</span>
                    <span>·</span>
                    <span>{generatedPlan.travellersCount} {generatedPlan.travellersCount === 1 ? 'Traveller' : 'Travellers'}</span>
                    <span>·</span>
                    <span className="capitalize">{generatedPlan.pace} pace</span>
                  </div>
                </div>

                {/* Financial Summary Box */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/20 min-w-[260px]">
                  <div className="text-xs text-[#DCE8DF] uppercase tracking-wider font-medium">
                    Estimated Total Cost
                  </div>
                  <div className="font-display text-3xl font-bold text-white mt-1">
                    ₹{generatedPlan.estimatedTotalINR.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-white/80 mt-1 flex items-center justify-between">
                    <span>Budget: ₹{generatedPlan.totalBudgetINR.toLocaleString('en-IN')}</span>
                    <span className={`font-semibold ${generatedPlan.estimatedTotalINR <= generatedPlan.totalBudgetINR ? 'text-emerald-300' : 'text-amber-300'}`}>
                      {generatedPlan.estimatedTotalINR <= generatedPlan.totalBudgetINR ? 'Within Budget' : 'Slight Overage'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {onBookTrip && (
                    <button
                      onClick={() => onBookTrip(generatedPlan)}
                      className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Confirm & Book (Send Mail)</span>
                    </button>
                  )}

                  <button
                    onClick={handleSave}
                    className="px-4 py-2.5 bg-[#FF8066] hover:bg-[#E7684F] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Save to My Trips</span>
                  </button>

                  <button
                    onClick={() => onOpenBudget(generatedPlan)}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-lg border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-[#DCE8DF]" />
                    <span>View in Budget Planner</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExport}
                    className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Copy Summary</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Day by Day Itinerary Cards */}
            <div className="mt-10 space-y-6">
              {generatedPlan.days.map((day) => {
                const isExpanded = expandedDays[day.dayNumber] ?? true;

                return (
                  <div
                    key={day.dayNumber}
                    className="bg-white rounded-2xl border border-[#E2DDD2] shadow-sm overflow-hidden"
                  >
                    {/* Day Header Accordion */}
                    <button
                      onClick={() => toggleDay(day.dayNumber)}
                      className="w-full px-6 py-5 bg-[#FAF8F3] hover:bg-[#F4EFE6] transition-colors flex items-center justify-between text-left border-b border-[#E2DDD2] cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#102A43] text-white flex flex-col items-center justify-center font-bold text-xs shrink-0">
                          <span className="text-[10px] text-gray-300">DAY</span>
                          <span>{day.dayNumber}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-xs text-[#247BA0] font-semibold">
                            <span>{day.dateStr}</span>
                          </div>
                          <h4 className="font-display text-lg sm:text-xl font-bold text-[#102A43] mt-0.5">
                            {day.theme}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <div className="text-xs text-gray-500">Day Est.</div>
                          <div className="text-sm font-bold text-[#102A43]">
                            ₹{day.dailyTotalINR.toLocaleString('en-IN')}
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>

                    {/* Day Content */}
                    {isExpanded && (
                      <div className="p-6 space-y-6">
                        {/* 3 Activities: Morning, Afternoon, Evening */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {day.activities.map((act) => {
                            const isMorning = act.period === 'morning';
                            const isAfternoon = act.period === 'afternoon';
                            const PeriodIcon = isMorning ? Sun : isAfternoon ? Coffee : Moon;
                            const periodColor = isMorning
                              ? 'text-amber-500 bg-amber-50 border-amber-200'
                              : isAfternoon
                              ? 'text-orange-500 bg-orange-50 border-orange-200'
                              : 'text-indigo-500 bg-indigo-50 border-indigo-200';

                            return (
                              <div
                                key={act.id}
                                className="bg-[#FAF8F3] rounded-xl p-5 border border-[#E2DDD2] flex flex-col justify-between"
                              >
                                <div>
                                  {/* Period header */}
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <div className={`p-1.5 rounded-lg border ${periodColor}`}>
                                        <PeriodIcon className="w-4 h-4" />
                                      </div>
                                      <span className="text-xs font-bold uppercase tracking-wider text-[#102A43]">
                                        {act.period} · {act.time}
                                      </span>
                                    </div>
                                    <span className="text-xs font-bold text-[#247BA0]">
                                      ₹{act.estimatedCostINR.toLocaleString('en-IN')}
                                    </span>
                                  </div>

                                  <h5 className="font-display text-base font-bold text-[#102A43] leading-snug">
                                    {act.title}
                                  </h5>

                                  <p className="mt-2 text-xs text-[#486581] leading-relaxed">
                                    {act.description}
                                  </p>

                                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#243E56]">
                                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                    <span className="truncate">{act.location}</span>
                                  </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] text-[#486581] flex items-center gap-1.5">
                                  <Compass className="w-3.5 h-3.5 text-[#247BA0] shrink-0" />
                                  <span className="truncate">{act.transportAdvice}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Insider Tip Box */}
                        <div className="bg-[#DCE8DF]/40 rounded-xl p-4 border border-[#DCE8DF] flex items-start gap-3">
                          <Info className="w-4 h-4 text-[#247BA0] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
                              Local Insider Wisdom:
                            </span>
                            <p className="text-xs text-[#243E56] mt-0.5 leading-relaxed">
                              {day.insiderTip}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
