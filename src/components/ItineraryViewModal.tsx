import React, { useState } from 'react';
import {
  X,
  Calendar,
  Users,
  MapPin,
  IndianRupee,
  Clock,
  Sun,
  Coffee,
  Moon,
  Compass,
  Share2,
  Printer,
  ChevronDown,
  ChevronUp,
  Info,
  Send
} from 'lucide-react';
import { TripPlan } from '../types/travel';

interface ItineraryViewModalProps {
  trip: TripPlan | null;
  onClose: () => void;
  onBookTrip?: (trip: TripPlan) => void;
  onOpenBudget: (trip: TripPlan) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ItineraryViewModal: React.FC<ItineraryViewModalProps> = ({
  trip,
  onClose,
  onBookTrip,
  onOpenBudget,
  onShowToast
}) => {
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  });

  if (!trip) return null;

  const toggleDay = (num: number) => {
    setExpandedDays((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const handleCopySummary = () => {
    const summary = `${trip.title}\nDates: ${trip.startDate} to ${trip.endDate} (${trip.travellersCount} travellers)\nTotal Budget: ₹${trip.totalBudgetINR.toLocaleString('en-IN')}\nEstimated Cost: ₹${trip.estimatedTotalINR.toLocaleString('en-IN')}\n\n` +
      trip.days.map(d => `Day ${d.dayNumber} (${d.dateStr}) - ${d.theme}\n` + d.activities.map(a => `  • ${a.time} [${a.period.toUpperCase()}]: ${a.title} - ₹${a.estimatedCostINR}`).join('\n') + `\n  Tip: ${d.insiderTip}`).join('\n\n');

    navigator.clipboard.writeText(summary);
    onShowToast('Itinerary copied to clipboard!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E2DDD2] flex flex-col">
        {/* Header Banner */}
        <div className="bg-[#102A43] text-white p-6 sm:p-8 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#DCE8DF] mb-1">
              Curated Journey Itinerary
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              {trip.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/80">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF8066]" />
                {trip.departureCity} → {trip.destination}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {trip.startDate} to {trip.endDate}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {trip.travellersCount} {trip.travellersCount === 1 ? 'traveller' : 'travellers'}
              </span>
            </div>
          </div>

          {/* Budget pill in header */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-gray-300 block">Total Budget</span>
                <span className="font-bold text-base text-white">₹{trip.totalBudgetINR.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-l border-white/20 pl-4">
                <span className="text-gray-300 block">Estimated Cost</span>
                <span className="font-bold text-base text-emerald-300">₹{trip.estimatedTotalINR.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {onBookTrip && (
                <button
                  onClick={() => {
                    onBookTrip(trip);
                    onClose();
                  }}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{trip.bookingStatus === 'confirmed' ? 'View Voucher & Email' : 'Confirm & Book Trip'}</span>
                </button>
              )}
              <button
                onClick={handleCopySummary}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </button>
              <button
                onClick={() => {
                  onOpenBudget(trip);
                  onClose();
                }}
                className="px-4 py-2 bg-[#FF8066] hover:bg-[#E7684F] rounded-lg text-white font-semibold transition-colors cursor-pointer"
              >
                Open in Budget Planner
              </button>
            </div>
          </div>
        </div>

        {/* Days Accordions */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 bg-[#FAF8F3]">
          {trip.notes && (
            <div className="p-4 bg-white rounded-xl border border-[#E2DDD2] text-xs text-[#243E56]">
              <span className="font-bold text-[#102A43] block mb-1 uppercase tracking-wider">Your Personal Trip Notes:</span>
              <p className="italic">{trip.notes}</p>
            </div>
          )}

          {trip.days.map((day) => {
            const isExpanded = expandedDays[day.dayNumber] ?? true;

            return (
              <div
                key={day.dayNumber}
                className="bg-white rounded-2xl border border-[#E2DDD2] shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleDay(day.dayNumber)}
                  className="w-full px-6 py-4 bg-white hover:bg-gray-50 flex items-center justify-between text-left border-b border-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#102A43] text-white flex flex-col items-center justify-center font-bold text-xs shrink-0">
                      <span className="text-[9px] text-gray-300">DAY</span>
                      <span>{day.dayNumber}</span>
                    </div>
                    <div>
                      <div className="text-xs text-[#247BA0] font-semibold">{day.dateStr}</div>
                      <h4 className="font-display text-base sm:text-lg font-bold text-[#102A43]">
                        {day.theme}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#102A43] hidden sm:inline">
                      Est. ₹{day.dailyTotalINR.toLocaleString('en-IN')}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {day.activities.map((act) => {
                        const isMorning = act.period === 'morning';
                        const isAfternoon = act.period === 'afternoon';
                        const PeriodIcon = isMorning ? Sun : isAfternoon ? Coffee : Moon;

                        return (
                          <div
                            key={act.id}
                            className="bg-[#FAF8F3] rounded-xl p-4 border border-[#E2DDD2] flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#102A43] flex items-center gap-1.5">
                                  <PeriodIcon className="w-3.5 h-3.5 text-[#FF8066]" />
                                  <span>{act.period} · {act.time}</span>
                                </span>
                                <span className="text-xs font-bold text-[#247BA0]">
                                  ₹{act.estimatedCostINR.toLocaleString('en-IN')}
                                </span>
                              </div>
                              <h5 className="font-bold text-sm text-[#102A43]">{act.title}</h5>
                              <p className="text-xs text-gray-600 mt-1">{act.description}</p>
                              <div className="text-[11px] text-gray-500 mt-2 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                                <span className="truncate">{act.location}</span>
                              </div>
                            </div>
                            <div className="mt-3 pt-2 border-t border-gray-200 text-[10px] text-gray-500 flex items-center gap-1">
                              <Compass className="w-3 h-3 text-[#247BA0] shrink-0" />
                              <span className="truncate">{act.transportAdvice}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 bg-[#DCE8DF]/40 rounded-xl border border-[#DCE8DF] flex items-start gap-2.5 text-xs text-[#243E56]">
                      <Info className="w-4 h-4 text-[#247BA0] shrink-0 mt-0.5" />
                      <span><strong>Local Insider Tip:</strong> {day.insiderTip}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
