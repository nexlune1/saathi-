import React from 'react';
import { Globe2, Sparkles, Heart, Shield, Award, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenSaathi?: () => void;
  onOpenMia?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSaathi, onOpenMia }) => {
  const triggerAssistant = onOpenSaathi || onOpenMia;

  return (
    <footer className="bg-[#102A43] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF8066] to-[#247BA0] flex items-center justify-center text-white shadow-md">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-bold tracking-tight text-white block leading-none">
                    SAATHI
                  </span>
                  <span className="text-[10px] font-semibold bg-[#FF8066]/20 text-[#FF8066] border border-[#FF8066]/30 px-1.5 py-0.5 rounded tracking-wide uppercase">
                    Global
                  </span>
                </div>
                <span className="text-[11px] font-sans tracking-wider uppercase text-[#DCE8DF] block mt-1">
                  Your World. Your Journey. Your Saathi.
                </span>
              </div>
            </div>

            <p className="text-sm text-white/80 max-w-sm leading-relaxed">
              <strong>Smart Assistance for All Travel, Hotels and International journeys.</strong> SAATHI empowers international travellers with end-to-end guidance — from visa checks and document readiness to curated hotels, dietary-friendly dining, and personalized travel companions.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#DCE8DF]">
              <Award className="w-3.5 h-3.5 text-[#FF8066]" />
              <span>College Design Thinking Capstone Project</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#DCE8DF]">
              International Modules
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Explore Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('visa'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-[#FF8066] font-medium"
                >
                  Visa Assistant & Rules
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('vault'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Document Readiness Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('hotels'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  International Hotels
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('restaurants'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dining & Local Cuisine
                </button>
              </li>
            </ul>
          </div>

          {/* Planning & Support */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#DCE8DF]">
              Companion Services
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button
                  onClick={() => { onNavigate('assistant'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-emerald-300 font-medium"
                >
                  My Travel Saathi (Concierge)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('trips'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Saved International Journeys
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('plan'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Smart Itinerary Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('budget'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Multi-Currency Budget Cockpit
                </button>
              </li>
              {triggerAssistant && (
                <li>
                  <button
                    onClick={triggerAssistant}
                    className="hover:text-[#FF8066] text-[#FF8066] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Ask SAATHI AI Assistant</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Design Thinking Rationale */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#DCE8DF]">
              Design Thinking
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Created for the College Design Thinking presentation using the Stanford 5-stage framework: Empathize with anxious overseas travellers, Define visa and logistics frictions, Ideate integrated support modules, Prototype high-fidelity interactions, and Test with real-world travel queries.
            </p>
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Offline Persistence & Privacy-First</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} SAATHI — Smart Assistance for All Travel, Hotels and International journeys. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-white/70">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF8066] fill-[#FF8066]" />
            <span>for Academic Excellence & Global Travel Impact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
