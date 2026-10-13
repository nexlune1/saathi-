import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  IndianRupee,
  Utensils,
  Camera,
  Compass,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Destination } from '../types/travel';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanDestination: (destName: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onPlanDestination
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E2DDD2] relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Banner */}
        <div className="relative h-64 sm:h-72 w-full shrink-0">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#DCE8DF] uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF8066]" />
              <span>{destination.state} · {destination.vibe}</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold">
              {destination.name}
            </h3>
            <p className="text-sm text-white/90 mt-1 max-w-xl">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E2DDD2]">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">Best Time</span>
              <span className="text-xs font-bold text-[#102A43] mt-0.5 block">{destination.bestTimeToVisit}</span>
            </div>
            <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E2DDD2]">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">Duration</span>
              <span className="text-xs font-bold text-[#102A43] mt-0.5 block">{destination.recommendedDuration}</span>
            </div>
            <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E2DDD2]">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">Avg Daily Cost</span>
              <span className="text-xs font-bold text-[#247BA0] mt-0.5 block">~₹{destination.dailyBudgetINR.toLocaleString('en-IN')} / person</span>
            </div>
            <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E2DDD2]">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">Transit Hub</span>
              <span className="text-xs font-bold text-[#102A43] mt-0.5 block truncate" title={destination.nearestHub}>{destination.nearestHub}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-display text-lg font-bold text-[#102A43] mb-2">
              About {destination.name}
            </h4>
            <p className="text-sm text-[#486581] leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Must-Visit Attractions */}
          <div>
            <h4 className="font-display text-lg font-bold text-[#102A43] mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#247BA0]" />
              <span>Must-Visit Attractions</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.attractions.map((attr, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-[#FAF8F3] rounded-lg border border-[#E2DDD2] text-xs text-[#102A43] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8066] shrink-0" />
                  <span>{attr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Foods to Taste */}
          <div>
            <h4 className="font-display text-lg font-bold text-[#102A43] mb-3 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#FF8066]" />
              <span>Iconic Local Flavours</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.localFood.map((food, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-[#FFF0ED] rounded-lg border border-[#FF8066]/30 text-xs text-[#102A43] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8066] shrink-0" />
                  <span>{food}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insider Tips */}
          <div className="p-4 bg-[#DCE8DF]/40 rounded-xl border border-[#DCE8DF] flex items-start gap-3">
            <Info className="w-5 h-5 text-[#247BA0] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
                Traveller's Local Wisdom
              </div>
              {destination.travelTips.map((tip, idx) => (
                <p key={idx} className="text-xs text-[#243E56] leading-relaxed">
                  • {tip}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-6 bg-[#FAF8F3] border-t border-[#E2DDD2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#486581]">
            Ready to experience {destination.name}?
          </div>
          <button
            onClick={() => {
              onPlanDestination(destination.name);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#FF8066] hover:bg-[#E7684F] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Plan Itinerary for {destination.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
