import React, { useState, useMemo } from 'react';
import { MapPin, Calendar, IndianRupee, ArrowRight, Clock, Search, Sparkles, Eye } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/destinationsData';
import { Destination } from '../types/travel';

interface DestinationDiscoveryProps {
  onSelectDestination: (dest: Destination) => void;
  onPlanDestination: (destName: string) => void;
}

export const DestinationDiscovery: React.FC<DestinationDiscoveryProps> = ({
  onSelectDestination,
  onPlanDestination
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [budgetTier, setBudgetTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Getaways' },
    { id: 'metropolis', label: 'Metropolis & Skylines' },
    { id: 'beach', label: 'Tropical & Beach' },
    { id: 'heritage', label: 'Culture & Heritage' },
    { id: 'nature', label: 'Alpine & Nature' },
    { id: 'romantic', label: 'Romantic Escapes' }
  ];

  const filteredDestinations = useMemo(() => {
    return POPULAR_DESTINATIONS.filter((d) => {
      // Category filter
      if (activeCategory !== 'all' && d.category !== activeCategory) {
        return false;
      }

      // Budget tier filter (INR per day)
      if (budgetTier === 'budget' && d.dailyBudgetINR > 8000) return false;
      if (budgetTier === 'moderate' && (d.dailyBudgetINR <= 8000 || d.dailyBudgetINR > 14000)) return false;
      if (budgetTier === 'luxury' && d.dailyBudgetINR <= 14000) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = d.name.toLowerCase().includes(query);
        const matchesState = (d.state || d.country || '').toLowerCase().includes(query);
        const matchesCountry = (d.country || '').toLowerCase().includes(query);
        const matchesDesc = d.description.toLowerCase().includes(query);
        const matchesAttraction = d.attractions.some((a) => a.toLowerCase().includes(query));
        return matchesName || matchesState || matchesCountry || matchesDesc || matchesAttraction;
      }

      return true;
    });
  }, [activeCategory, budgetTier, searchQuery]);

  return (
    <section id="explore" className="py-20 lg:py-28 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E2DDD2]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#247BA0] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF8066]" />
              <span>Curated International Destinations</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#102A43] tracking-tight">
              The world is waiting.
            </h2>
            <p className="mt-2 text-lg text-[#243E56]">
              Find your kind of international getaway.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search beaches, temples, treks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#CBD5E1] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#102A43] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#247BA0]"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#102A43] text-white shadow-sm'
                    : 'bg-white text-[#243E56] border border-[#E2DDD2] hover:bg-[#FAF8F3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Budget Filter */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <span className="text-[#486581] font-medium hidden sm:inline">Budget Filter:</span>
            <select
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="bg-white border border-[#CBD5E1] rounded-lg px-3 py-1.5 text-xs text-[#102A43] font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Daily Budgets</option>
              <option value="budget">Under ₹2,500 / day</option>
              <option value="moderate">₹2,500 – ₹3,300 / day</option>
              <option value="luxury">Above ₹3,300 / day</option>
            </select>
          </div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest, idx) => {
            // Asymmetrical span: make 1st card larger on 3-col desktop layout if desired
            const isFeatured = idx === 0 || idx === 4;

            return (
              <div
                key={dest.id}
                className={`group bg-white rounded-2xl overflow-hidden border border-[#E2DDD2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 ${
                  isFeatured ? 'lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Image container with hover zoom */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Location Badge & Daily Budget */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/40 backdrop-blur-md text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#FF8066]" />
                        <span>{dest.state}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#102A43]/80 backdrop-blur-md text-xs font-semibold text-[#DCE8DF]">
                        <span>~₹{dest.dailyBudgetINR.toLocaleString('en-IN')}/day</span>
                      </div>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-white/90 font-medium line-clamp-1 mt-0.5">
                        {dest.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-[#486581] leading-relaxed line-clamp-2">
                      {dest.description}
                    </p>

                    {/* Unboxed Metadata with Typographic Separator */}
                    <div className="flex items-center gap-2 text-xs text-[#247BA0] font-medium pt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{dest.bestTimeToVisit}</span>
                      </div>
                      <span className="text-gray-300" aria-hidden="true">·</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{dest.recommendedDuration}</span>
                      </div>
                    </div>

                    {/* Top Attractions Preview */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Must-Visit Highlights:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.attractions.slice(0, 3).map((attr, aIdx) => (
                          <span
                            key={aIdx}
                            className="text-xs bg-[#FAF8F3] text-[#102A43] px-2.5 py-1 rounded-md border border-[#E2DDD2]"
                          >
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions Bottom */}
                <div className="p-5 pt-0 sm:p-6 sm:pt-0 flex items-center justify-between gap-3 border-t border-gray-100 mt-4">
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="flex-1 py-2.5 px-3 bg-[#FAF8F3] hover:bg-[#E2DDD2] text-[#102A43] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Guide</span>
                  </button>

                  <button
                    onClick={() => onPlanDestination(dest.name)}
                    className="flex-1 py-2.5 px-3 bg-[#FF8066] hover:bg-[#E7684F] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Plan Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredDestinations.length === 0 && (
          <div className="mt-12 text-center py-16 bg-white rounded-2xl border border-[#E2DDD2]">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h4 className="font-display text-xl font-bold text-[#102A43]">
              No destinations match your filter
            </h4>
            <p className="text-sm text-[#486581] mt-1 max-w-sm mx-auto">
              Try adjusting your category filter, changing budget expectations, or searching another term.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setBudgetTier('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#247BA0] text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
