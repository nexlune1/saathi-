import React from 'react';
import { Compass, Sparkles, Map, ArrowRight, ShieldCheck } from 'lucide-react';

export const HowItWorksSection: React.FC<{ onStartPlanning: () => void }> = ({ onStartPlanning }) => {
  const steps = [
    {
      step: '01',
      title: 'Discover',
      tagline: 'Set your horizon',
      description: 'Tell us your destination, travel preferences, group size, and your planned budget in Indian Rupees.',
      icon: Compass,
      accent: '#247BA0'
    },
    {
      step: '02',
      title: 'Personalize',
      tagline: 'Smart intelligent curation',
      description: 'Get an authentic day-by-day itinerary with morning, afternoon, and evening slots, local transport advice, and cost breakdowns.',
      icon: Sparkles,
      accent: '#FF8066'
    },
    {
      step: '03',
      title: 'Explore',
      tagline: 'Worry-free departure',
      description: 'Save your plan to your device, adjust expenses in the budget calculator, check off your packing list, and set off with total peace of mind.',
      icon: Map,
      accent: '#243E56'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FAF8F3] border-b border-[#E2DDD2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#247BA0] mb-2">
            Seamless Three-Step Journey
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#102A43] tracking-tight">
            From daydream to departure.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#243E56]">
            Three intentional steps that transform travel wanderlust into a tailored, budget-conscious reality.
          </p>
        </div>

        {/* Timeline Desktop / Mobile Grid */}
        <div className="mt-16 relative">
          {/* Desktop Horizontal Line */}
          <div className="hidden md:block absolute top-1/2 left-20 right-20 h-0.5 bg-gradient-to-r from-[#247BA0]/30 via-[#FF8066]/40 to-[#243E56]/30 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="bg-white rounded-2xl p-8 border border-[#E2DDD2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Icon + Step number */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
                        style={{ backgroundColor: `${s.accent}15`, color: s.accent }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="font-display text-3xl font-bold text-gray-200">
                        {s.step}
                      </span>
                    </div>

                    <div className="text-xs font-semibold uppercase tracking-wider text-[#247BA0]">
                      {s.tagline}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#102A43] mt-1">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#486581] leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-[#102A43] group-hover:text-[#FF8066] transition-colors">
                    <span>Explore Step {idx + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onStartPlanning}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF8066] hover:bg-[#E7684F] text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Start Your Personalized Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
