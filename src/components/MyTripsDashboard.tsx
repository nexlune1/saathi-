import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Trash2,
  Edit3,
  Eye,
  Calculator,
  Compass,
  ArrowRight,
  Plus,
  Share2,
  Clock,
  Sparkles,
  CheckCircle2,
  Mail,
  Send
} from 'lucide-react';
import { TripPlan } from '../types/travel';
import { POPULAR_DESTINATIONS } from '../data/destinationsData';

interface MyTripsDashboardProps {
  trips: TripPlan[];
  onViewItinerary: (trip: TripPlan) => void;
  onBookTrip?: (trip: TripPlan) => void;
  onOpenBudget: (trip: TripPlan) => void;
  onDeleteTrip: (tripId: string) => void;
  onUpdateNotes: (tripId: string, notes: string) => void;
  onStartNewTrip: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const MyTripsDashboard: React.FC<MyTripsDashboardProps> = ({
  trips,
  onViewItinerary,
  onBookTrip,
  onOpenBudget,
  onDeleteTrip,
  onUpdateNotes,
  onStartNewTrip,
  onShowToast
}) => {
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const handleStartEdit = (trip: TripPlan) => {
    setEditingTripId(trip.id);
    setNoteText(trip.notes || '');
  };

  const handleSaveNote = (tripId: string) => {
    onUpdateNotes(tripId, noteText);
    setEditingTripId(null);
    onShowToast('Trip notes updated successfully!', 'success');
  };

  const getDestinationImage = (destName?: string) => {
    if (!destName) return 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80';
    const found = POPULAR_DESTINATIONS.find(
      (d) => d.name.toLowerCase() === destName.toLowerCase() ||
             d.country.toLowerCase() === destName.toLowerCase()
    );
    return found?.imageUrl || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <div id="trips" className="py-16 lg:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-[#E2DDD2]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#247BA0] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF8066]" />
              <span>Personal Travel Vault</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight">
              My Saved Trips
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[#243E56]">
              {trips.length > 0
                ? `You have ${trips.length} curated journey${trips.length > 1 ? 's' : ''} saved to your device.`
                : 'No itineraries saved yet. Create your first journey below!'}
            </p>
          </div>

          <button
            onClick={onStartNewTrip}
            className="self-start md:self-auto px-5 py-2.5 bg-[#FF8066] hover:bg-[#E7684F] text-white text-sm font-semibold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Plan New Journey</span>
          </button>
        </div>

        {/* Empty State */}
        {trips.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E2DDD2] p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-[#DCE8DF]/50 flex items-center justify-center mx-auto mb-4 text-[#247BA0]">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#102A43]">
              Your travel passport is waiting
            </h3>
            <p className="mt-2 text-sm text-[#486581] leading-relaxed">
              Use our smart itinerary generator to curate a day-by-day plan with authentic attractions and budget breakdowns, then save it here for instant offline access.
            </p>
            <button
              onClick={onStartNewTrip}
              className="mt-6 px-6 py-3 bg-[#102A43] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore & Plan Your First Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Trips Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => {
              const destDisplay = trip.destination || trip.destinationCity || 'International Destination';
              const imgUrl = getDestinationImage(destDisplay);
              const isEditing = editingTripId === trip.id;

              return (
                <div
                  key={trip.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E2DDD2] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Destination Photo Header */}
                    <div className="relative h-48 w-full">
                      <img
                        src={imgUrl}
                        alt={destDisplay}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {trip.bookingStatus === 'confirmed' && (
                        <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          <span>Confirmed & Booked</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete trip to ${destDisplay}?`)) {
                              onDeleteTrip(trip.id);
                              onShowToast('Trip deleted from vault', 'info');
                            }
                          }}
                          className="p-2 bg-black/40 hover:bg-rose-600/80 backdrop-blur-md rounded-lg text-white transition-colors cursor-pointer"
                          title="Delete Trip"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <div className="flex items-center gap-1.5 text-xs text-[#DCE8DF] font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#FF8066]" />
                          <span>{trip.departureCity} → {destDisplay}</span>
                        </div>
                        <h3 className="font-display text-xl font-bold mt-0.5 truncate">
                          {trip.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content Details */}
                    <div className="p-5 space-y-4">
                      {/* Dates & Duration */}
                      <div className="flex items-center justify-between text-xs text-[#486581] border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#247BA0]" />
                          <span>{trip.startDate} to {trip.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          <span>{trip.travellersCount} {trip.travellersCount === 1 ? 'person' : 'people'}</span>
                        </div>
                      </div>

                      {/* Financials in Rupees */}
                      <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF8F3] p-3 rounded-xl border border-[#E2DDD2]">
                        <div>
                          <span className="text-gray-500 block">Total Budget</span>
                          <span className="font-bold text-[#102A43] text-sm mt-0.5 block">
                            ₹{trip.totalBudgetINR.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Estimated Cost</span>
                          <span className="font-bold text-[#247BA0] text-sm mt-0.5 block">
                            ₹{trip.estimatedTotalINR.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Travel Preferences */}
                      <div className="flex flex-wrap gap-1">
                        {trip.preferences.map((p, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded capitalize"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* Notes Box */}
                      <div className="pt-2">
                        {isEditing ? (
                          <div className="space-y-2">
                            <textarea
                              rows={2}
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder="Add personal notes, hotel confirmation, taxi phone numbers..."
                              className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-lg p-2 text-xs text-[#102A43] focus:outline-none focus:ring-1 focus:ring-[#247BA0]"
                            />
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => setEditingTripId(null)}
                                className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveNote(trip.id)}
                                className="px-3 py-1 bg-[#247BA0] text-white text-xs font-semibold rounded"
                              >
                                Save Note
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-2 group">
                            <p className="text-xs text-gray-500 italic line-clamp-2">
                              {trip.notes ? `"${trip.notes}"` : 'No personal notes added yet.'}
                            </p>
                            <button
                              onClick={() => handleStartEdit(trip)}
                              className="text-gray-400 hover:text-[#247BA0] shrink-0"
                              title="Edit notes"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Confirmed Booking Badge & Email Receipt trigger */}
                      {trip.bookingStatus === 'confirmed' && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-950">
                          <div>
                            <span className="font-bold block text-[11px] text-emerald-900">
                              Ref: {trip.booking?.bookingReference || trip.bookingReference || 'SATHI-BK-94821'}
                            </span>
                            <span className="text-[10px] text-emerald-700">
                              Confirmation mail sent {trip.booking?.guestEmail ? `to ${trip.booking.guestEmail}` : ''}
                            </span>
                          </div>
                          {onBookTrip && (
                            <button
                              onClick={() => onBookTrip(trip)}
                              className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] rounded-lg border border-emerald-300 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                            >
                              <Mail className="w-3 h-3 text-emerald-600" />
                              <span>View Mail</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-5 pt-0 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 mt-2">
                    <button
                      onClick={() => onViewItinerary(trip)}
                      className="flex-1 min-w-[110px] py-2.5 bg-[#102A43] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Itinerary</span>
                    </button>

                    {onBookTrip && (
                      <button
                        onClick={() => onBookTrip(trip)}
                        className={`py-2.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          trip.bookingStatus === 'confirmed'
                            ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                        title={trip.bookingStatus === 'confirmed' ? 'View Confirmation Voucher & Email' : 'Confirm & Book Trip'}
                      >
                        {trip.bookingStatus === 'confirmed' ? (
                          <>
                            <Mail className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Voucher & Mail</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Confirm & Book</span>
                          </>
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => onOpenBudget(trip)}
                      className="p-2.5 bg-[#FAF8F3] hover:bg-[#E2DDD2] text-[#247BA0] rounded-lg transition-colors border border-[#E2DDD2] cursor-pointer"
                      title="Load in Budget Planner"
                    >
                      <Calculator className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
