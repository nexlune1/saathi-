import React, { useState, useMemo } from 'react';
import {
  UtensilsCrossed,
  MapPin,
  Clock,
  ExternalLink,
  Bookmark,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  Compass,
  Heart
} from 'lucide-react';
import { INTERNATIONAL_RESTAURANTS } from '../data/restaurantsData';
import { Restaurant } from '../types/travel';

interface RestaurantFinderProps {
  onSaveRestaurant: (restaurant: Restaurant) => void;
  savedRestaurantIds?: string[];
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const RestaurantFinder: React.FC<RestaurantFinderProps> = ({
  onSaveRestaurant,
  savedRestaurantIds = [],
  onShowToast
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRestaurants = useMemo(() => {
    return INTERNATIONAL_RESTAURANTS.filter(r => {
      if (selectedCity !== 'All' && r.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      if (selectedCategory !== 'all' && r.category !== selectedCategory) {
        return false;
      }
      if (dietaryFilter !== 'all' && !r.dietary.includes(dietaryFilter as any)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesCuisine = r.cuisine.toLowerCase().includes(q);
        const matchesNeighbor = r.neighborhood.toLowerCase().includes(q);
        return matchesName || matchesCuisine || matchesNeighbor;
      }
      return true;
    });
  }, [selectedCity, selectedCategory, dietaryFilter, searchQuery]);

  return (
    <div id="restaurants" className="py-16 lg:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#247BA0] mb-2 flex items-center gap-1.5">
            <UtensilsCrossed className="w-4 h-4 text-[#FF8066]" />
            <span>Global Gastronomy & Dietary Dining</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight">
            International Restaurant Finder
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#243E56]">
            Discover culinary gems worldwide tailored to dietary needs—including Halal, pure vegetarian, vegan, and iconic heritage street food.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-6 border border-[#E2DDD2] shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* City */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                City / Country
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#102A43] cursor-pointer focus:outline-none"
              >
                <option value="All">All Cities</option>
                <option value="Dubai">Dubai, UAE</option>
                <option value="Singapore">Singapore</option>
                <option value="Bangkok">Bangkok, Thailand</option>
                <option value="Tokyo">Tokyo, Japan</option>
                <option value="Kyoto">Kyoto, Japan</option>
                <option value="Paris">Paris, France</option>
                <option value="Interlaken">Interlaken, Switzerland</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                Dining Style
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-semibold text-[#102A43] cursor-pointer focus:outline-none"
              >
                <option value="all">All Dining Styles</option>
                <option value="local">Local Authentic Heritage</option>
                <option value="streetfood">Street Food & Night Markets</option>
                <option value="finedining">Fine Dining & Michelin</option>
                <option value="vegetarian">100% Plant-Based / Vegetarian</option>
                <option value="cafe">Cafés & Pâtisseries</option>
              </select>
            </div>

            {/* Dietary Filter */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                Dietary Requirement
              </label>
              <select
                value={dietaryFilter}
                onChange={(e) => setDietaryFilter(e.target.value)}
                className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-semibold text-[#102A43] cursor-pointer focus:outline-none"
              >
                <option value="all">Any Dietary Requirement</option>
                <option value="Vegetarian">🌱 Vegetarian Options</option>
                <option value="Vegan">🥑 Vegan (100% Plant-Based)</option>
                <option value="Halal">حلال Halal Certified / Meat</option>
                <option value="Jain Friendly">🌿 Jain Friendly (No Root Veg)</option>
                <option value="Gluten-Free">🌾 Gluten-Free Options</option>
              </select>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                Search Cuisine or Dish
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ramen, Fondue, Dosa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl pl-9 pr-3 py-2 text-xs text-[#102A43] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((rest) => {
            const isSaved = savedRestaurantIds.includes(rest.id);

            return (
              <div
                key={rest.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E2DDD2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <img
                      src={rest.imageUrl}
                      alt={rest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                        {rest.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 text-[#102A43] text-xs font-bold shadow-sm">
                      {rest.priceRange}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-[11px] text-[#DCE8DF] font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF8066]" />
                        <span>{rest.neighborhood}, {rest.city}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold mt-0.5 truncate">
                        {rest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 space-y-3.5">
                    <div className="text-xs font-bold text-[#247BA0]">
                      {rest.cuisine}
                    </div>

                    <p className="text-xs text-[#486581] line-clamp-2 leading-relaxed">
                      {rest.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{rest.openingHours}</span>
                    </div>

                    {/* Dietary Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {rest.dietary.map((d, dIdx) => (
                        <span
                          key={dIdx}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                            d === 'Halal'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : d === 'Vegetarian' || d === 'Vegan'
                              ? 'bg-green-50 text-green-800 border-green-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {d}
                        </span>
                      ))}
                      {rest.isFamilyFriendly && (
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 font-medium">
                          Family Friendly
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 pt-0 border-t border-gray-100 mt-2 space-y-3">
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Typical Cost</span>
                      <span className="text-xs font-bold text-[#102A43]">
                        {rest.indicativePricePerPerson}
                      </span>
                    </div>

                    <button
                      onClick={() => onSaveRestaurant(rest)}
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
                    <a
                      href={rest.menuUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 bg-[#FAF8F3] hover:bg-[#E2DDD2] text-[#102A43] text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Menu / Site</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                    </a>

                    <a
                      href={rest.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 bg-[#102A43] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Map & Route</span>
                      <Compass className="w-3.5 h-3.5 text-[#FF8066]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
