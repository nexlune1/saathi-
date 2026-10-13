import React, { useState, useMemo } from 'react';
import {
  Building,
  Star,
  MapPin,
  ExternalLink,
  Bookmark,
  Check,
  Search,
  SlidersHorizontal,
  Info,
  CheckCircle2,
  Sparkles,
  Wifi,
  Coffee,
  Waves,
  Eye,
  X
} from 'lucide-react';
import { INTERNATIONAL_HOTELS } from '../data/hotelsData';
import { Hotel } from '../types/travel';

interface HotelFinderProps {
  onSaveHotel: (hotel: Hotel) => void;
  savedHotelIds?: string[];
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const HotelFinder: React.FC<HotelFinderProps> = ({
  onSaveHotel,
  savedHotelIds = [],
  onShowToast
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [maxPriceUSD, setMaxPriceUSD] = useState<number>(600);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedHotelForModal, setSelectedHotelForModal] = useState<Hotel | null>(null);
  const [comparisonList, setComparisonList] = useState<Hotel[]>([]);

  const filteredHotels = useMemo(() => {
    return INTERNATIONAL_HOTELS.filter(hotel => {
      if (selectedCity !== 'All' && hotel.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      if (selectedType !== 'all' && hotel.type !== selectedType) {
        return false;
      }
      if (hotel.pricePerNightUSD > maxPriceUSD) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(q);
        const matchesNeighbor = hotel.neighborhood.toLowerCase().includes(q);
        const matchesAmenity = hotel.amenities.some(a => a.toLowerCase().includes(q));
        return matchesName || matchesNeighbor || matchesAmenity;
      }
      return true;
    });
  }, [selectedCity, selectedType, maxPriceUSD, searchQuery]);

  const handleToggleCompare = (hotel: Hotel) => {
    if (comparisonList.some(h => h.id === hotel.id)) {
      setComparisonList(comparisonList.filter(h => h.id !== hotel.id));
      onShowToast(`Removed ${hotel.name} from comparison.`, 'info');
    } else {
      if (comparisonList.length >= 3) {
        onShowToast('You can compare up to 3 hotels at once.', 'error');
        return;
      }
      setComparisonList([...comparisonList, hotel]);
      onShowToast(`Added ${hotel.name} to compare list.`, 'success');
    }
  };

  return (
    <div id="hotels" className="py-16 lg:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#247BA0] mb-2 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-[#FF8066]" />
            <span>Curated International Stays</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight">
            International Hotel Finder
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#243E56]">
            Compare vetted boutique hotels, luxury waterfront resorts, family suites, and modern designer hostels across premier global destinations.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-6 border border-[#E2DDD2] shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* City */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                City / Destination
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#102A43] cursor-pointer focus:outline-none"
              >
                <option value="All">All International Cities</option>
                <option value="Dubai">Dubai, UAE</option>
                <option value="Singapore">Singapore</option>
                <option value="Bangkok">Bangkok, Thailand</option>
                <option value="Phuket">Phuket, Thailand</option>
                <option value="Tokyo">Tokyo, Japan</option>
                <option value="Kyoto">Kyoto, Japan</option>
                <option value="Paris">Paris, France</option>
                <option value="Rome">Rome, Italy</option>
                <option value="Interlaken">Interlaken, Switzerland</option>
              </select>
            </div>

            {/* Accommodation Type */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                Accommodation Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-semibold text-[#102A43] cursor-pointer focus:outline-none"
              >
                <option value="all">All Stay Types</option>
                <option value="boutique">Boutique Hotels</option>
                <option value="luxury">Luxury Resorts & 5-Star</option>
                <option value="family">Family-Friendly Suites</option>
                <option value="hostel">Designer Hostels & Pods</option>
                <option value="budget">Budget City Stays</option>
              </select>
            </div>

            {/* Price Slider */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                Max Price: ${maxPriceUSD} USD / Night
              </label>
              <input
                type="range"
                min={30}
                max={600}
                step={20}
                value={maxPriceUSD}
                onChange={(e) => setMaxPriceUSD(Number(e.target.value))}
                className="w-full accent-[#247BA0] cursor-pointer mt-2"
              />
            </div>

            {/* Search query */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                Keyword / Amenity Search
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pool, Metro, Downtown..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl pl-9 pr-3 py-2 text-xs text-[#102A43] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Floating Drawer if items selected */}
        {comparisonList.length > 0 && (
          <div className="mb-10 bg-gradient-to-r from-[#102A43] to-[#247BA0] text-white p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-[#FF8066] px-2.5 py-1 rounded-md">
                Comparing {comparisonList.length} of 3
              </span>
              <span className="text-sm font-semibold truncate max-w-md">
                {comparisonList.map(h => h.name).join(' vs ')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setComparisonList([])}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-medium rounded-lg"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => {
            const isSaved = savedHotelIds.includes(hotel.id);
            const isCompared = comparisonList.some(h => h.id === hotel.id);

            return (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E2DDD2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[11px] font-semibold text-white capitalize">
                        {hotel.type}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 text-[#102A43] text-xs font-bold shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{hotel.rating}</span>
                      <span className="text-gray-400 font-normal">({hotel.reviewsCount})</span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-[11px] text-[#DCE8DF] font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF8066]" />
                        <span>{hotel.neighborhood}, {hotel.city}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold mt-0.5 truncate">
                        {hotel.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-[#486581] line-clamp-2 leading-relaxed">
                      {hotel.description}
                    </p>

                    <div className="text-[11px] text-[#247BA0] font-semibold">
                      📍 {hotel.distanceToAttraction}
                    </div>

                    {/* Amenities Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hotel.amenities.slice(0, 3).map((am, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#FAF8F3] text-gray-700 px-2 py-0.5 rounded border border-[#E2DDD2]"
                        >
                          {am}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="text-[10px] text-gray-400 self-center">
                          +{hotel.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & Actions */}
                <div className="p-5 pt-0 border-t border-gray-100 mt-2 space-y-3">
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <span className="text-[11px] text-gray-400 block">Indicative Price</span>
                      <div className="text-lg font-bold text-[#102A43]">
                        ${hotel.pricePerNightUSD}{' '}
                        <span className="text-xs font-normal text-gray-500">
                          / night (~{hotel.pricePerNightLocal} {hotel.currency})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSaveHotel(hotel)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                          : 'bg-[#FAF8F3] border-[#CBD5E1] text-[#102A43] hover:bg-gray-100'
                      }`}
                      title={isSaved ? 'Saved in My Journey' : 'Save to My Journey'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedHotelForModal(hotel)}
                      className="py-2 px-3 bg-[#FAF8F3] hover:bg-[#E2DDD2] text-[#102A43] text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    <a
                      href={hotel.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 bg-[#247BA0] hover:bg-[#1A5E7B] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Booking Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <button
                    onClick={() => handleToggleCompare(hotel)}
                    className="w-full text-center text-[11px] text-gray-500 hover:text-[#102A43] cursor-pointer pt-1"
                  >
                    {isCompared ? '✓ Added to Comparison' : '+ Compare this hotel'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Illustrative Disclaimer */}
        <div className="mt-12 text-center text-xs text-gray-500">
          * Note: Hotel rates and availability are illustrative estimates for planning. Visit verified booking websites for real-time room reservation.
        </div>

        {/* Hotel Details Modal */}
        {selectedHotelForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E2DDD2] relative flex flex-col">
              <button
                onClick={() => setSelectedHotelForModal(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-64 w-full">
                <img
                  src={selectedHotelForModal.imageUrl}
                  alt={selectedHotelForModal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="text-xs text-[#DCE8DF] font-semibold">
                    {selectedHotelForModal.neighborhood}, {selectedHotelForModal.city}
                  </div>
                  <h3 className="font-display text-2xl font-bold mt-0.5">
                    {selectedHotelForModal.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400">Indicative Rate:</span>
                    <div className="text-xl font-bold text-[#102A43]">
                      ${selectedHotelForModal.pricePerNightUSD} USD / Night
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 text-xs font-bold">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{selectedHotelForModal.rating} ({selectedHotelForModal.reviewsCount} reviews)</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedHotelForModal.description}
                </p>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2">
                    Included Amenities:
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                    {selectedHotelForModal.amenities.map((am, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-[#FAF8F3] rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      onSaveHotel(selectedHotelForModal);
                      setSelectedHotelForModal(null);
                    }}
                    className="flex-1 py-2.5 bg-[#FF8066] hover:bg-[#E7684F] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Save to My Journey
                  </button>
                  <a
                    href={selectedHotelForModal.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-[#102A43] hover:bg-[#1A3B5C] text-white text-xs font-bold rounded-xl text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Visit Verified Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
