import React, { useState } from 'react';
import {
  Compass,
  Menu,
  X,
  FileCheck,
  Building,
  UtensilsCrossed,
  Globe2,
  Sparkles,
  ShieldCheck,
  UserCheck,
  MessageCircle,
  BookmarkCheck
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  savedItemsCount?: number;
  onOpenSaathi?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  savedItemsCount = 0,
  onOpenSaathi
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'explore', label: 'Explore', icon: Globe2 },
    { id: 'visa', label: 'Visa Assistant', icon: ShieldCheck },
    { id: 'vault', label: 'My Documents', icon: FileCheck },
    { id: 'hotels', label: 'Hotels', icon: Building },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { id: 'assistant', label: 'My Saathi', icon: UserCheck },
    { id: 'trips', label: `My Journey${savedItemsCount > 0 ? ` (${savedItemsCount})` : ''}`, icon: BookmarkCheck }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#102A43]/95 backdrop-blur-md border-b border-white/10 text-white transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF8066] to-[#247BA0] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
            <Globe2 className="w-6 h-6 text-white" />
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
            <span className="text-[10px] font-sans tracking-wider uppercase text-[#DCE8DF] block mt-1 truncate max-w-[220px]">
              Your International Travel Companion
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-xs font-semibold tracking-wide transition-colors relative cursor-pointer ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#FF8066] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-2.5">
          {onOpenSaathi && (
            <button
              onClick={onOpenSaathi}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-lg border border-white/20 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="Chat with SAATHI AI Assistant"
            >
              <MessageCircle className="w-4 h-4 text-[#FF8066]" />
              <span>Ask SAATHI</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('plan')}
            className="px-4 py-2 bg-[#FF8066] hover:bg-[#E7684F] text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Plan Journey</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#102A43] border-b border-white/10 px-4 pt-3 pb-6 space-y-1.5 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-1.5 pb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                    isActive
                      ? 'bg-white/15 text-white font-bold border border-white/20'
                      : 'text-white/80 hover:bg-white/10 text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#FF8066] shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 space-y-2 border-t border-white/10">
            {onOpenSaathi && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSaathi();
                }}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg border border-white/20 text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#FF8066]" />
                <span>Ask SAATHI — AI Assistant</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('plan')}
              className="w-full py-2.5 bg-[#FF8066] hover:bg-[#E7684F] text-white font-semibold text-xs rounded-lg shadow text-center cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan My International Trip</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
