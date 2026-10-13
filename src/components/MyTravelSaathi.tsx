import React, { useState } from 'react';
import {
  UserCheck,
  Send,
  MessageCircle,
  ShieldCheck,
  Globe2,
  Calendar,
  Sparkles,
  PhoneCall,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileCheck,
  Bot,
  Mail,
  Plane,
  Building,
  UtensilsCrossed,
  Train,
  AlertTriangle,
  BadgeCheck,
  ExternalLink
} from 'lucide-react';
import { TRAVEL_ASSISTANTS, AI_TRAVEL_ASSISTANT, matchTravelSaathi } from '../data/assistantsData';
import { TravelAssistant } from '../types/travel';

interface MyTravelSaathiProps {
  destinationCountry?: string;
  onOpenVisaAssistant: () => void;
  onOpenVault: () => void;
  onNavigateToFlights?: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const MyTravelSaathi: React.FC<MyTravelSaathiProps> = ({
  destinationCountry = 'United Arab Emirates',
  onOpenVisaAssistant,
  onOpenVault,
  onNavigateToFlights,
  onShowToast
}) => {
  const [selectedDestination, setSelectedDestination] = useState(destinationCountry);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [assistantMode, setAssistantMode] = useState<'auto' | 'ai_only'>('auto');

  const [assignedAssistant, setAssignedAssistant] = useState<TravelAssistant>(() =>
    matchTravelSaathi(destinationCountry, 'English', false)
  );

  // Chat message thread
  const [chatMessages, setChatMessages] = useState<Array<{
    sender: 'user' | 'assistant';
    text: string;
    time: string;
    topic?: string;
  }>>([
    {
      sender: 'assistant',
      text: `Hello! I'm ${assignedAssistant.name}, your assigned ${
        assignedAssistant.isAiAssistant ? 'AI Travel Assistant' : 'Personal Travel Assistant'
      } for ${assignedAssistant.destinationSpecialty}. Assistant ID [${assignedAssistant.id}]. How can I assist you with your visa, flight, hotel, dining, local transit, or emergency preparations today?`,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleMatch = (dest: string, lang: string, mode: 'auto' | 'ai_only') => {
    setSelectedDestination(dest);
    setSelectedLanguage(lang);
    setAssistantMode(mode);

    const matched = matchTravelSaathi(dest, lang, mode === 'ai_only');
    setAssignedAssistant(matched);

    const introText = matched.isAiAssistant
      ? `Hello! I am the SAATHI Autonomous AI Travel Assistant (ID: ${matched.id}). I am an artificial intelligence system providing 24/7 instant travel compliance, flight routing, and visa guidance worldwide. How may I assist your trip to ${dest}?`
      : `Namaste / Hello! I'm ${matched.name}, your dedicated Regional Travel Concierge (ID: ${matched.id}) for ${matched.destinationSpecialty}. I speak ${matched.languages.join(', ')}. What would you like to review first?`;

    setChatMessages([
      {
        sender: 'assistant',
        text: introText,
        time: 'Just now'
      }
    ]);

    onShowToast(
      matched.isAiAssistant
        ? `Switched to SAATHI Autonomous AI Travel Assistant`
        : `Assigned: ${matched.name} (${matched.title})`,
      'success'
    );
  };

  const handleSendQuery = (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    const userMsg = {
      sender: 'user' as const,
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = '';
      let topic = 'general';

      if (q.includes('visa') || q.includes('passport') || q.includes('embassy')) {
        topic = 'visa';
        reply = `Regarding your visa questions: For ${assignedAssistant.destinationSpecialty}, please verify your passport has at least 6 months validity from departure date. Check that you have booked accommodation vouchers and return flight tickets ready in your Document Vault. Would you like me to open the Visa Assistant checklist?`;
      } else if (q.includes('flight') || q.includes('ticket') || q.includes('baggage') || q.includes('airline')) {
        topic = 'flights';
        reply = `For flight bookings to ${assignedAssistant.destinationSpecialty}: Flights are our default mode of international transit. Ensure power banks remain in your cabin luggage (under 100Wh) and carry-on liquids are packed in containers of 100ml or less. You can generate official confirmed e-tickets in our Flights tab!`;
      } else if (q.includes('hotel') || q.includes('stay') || q.includes('hostel') || q.includes('resort')) {
        topic = 'hotels';
        reply = `For accommodation: I recommend properties close to central transit lines in ${assignedAssistant.destinationSpecialty} to save on daily taxi fares. Our Hotels tab provides verified pricing, traveler ratings, and verified booking links. Never assume a room is confirmed until you receive a supplier confirmation code.`;
      } else if (q.includes('restaurant') || q.includes('food') || q.includes('halal') || q.includes('vegetarian')) {
        topic = 'restaurants';
        reply = `Dining recommendations: We curate dietary-certified restaurants (Halal, Pure Vegetarian, Jain-friendly, and Vegan) with localized food safety guidelines for ${assignedAssistant.destinationSpecialty}. Check our Restaurants tab to explore curated menus and opening hours!`;
      } else if (q.includes('transport') || q.includes('metro') || q.includes('taxi') || q.includes('train')) {
        topic = 'transit';
        reply = `Local transportation: The most economical way to travel around ${assignedAssistant.destinationSpecialty} is via local transit passes (such as the Metro / Suica / Nol Card). For airport arrivals, pre-booked authorized taxi counters inside the terminal are significantly safer than hailing unmetered street rides.`;
      } else if (q.includes('emergency') || q.includes('police') || q.includes('hospital') || q.includes('doctor')) {
        topic = 'emergency';
        reply = `Emergency protocol for ${assignedAssistant.destinationSpecialty}: Immediate numbers are active 24/7. In Europe dial 112, in Dubai dial 999 (Police) / 998 (Ambulance), in Japan dial 110 (Police) / 119 (Medical). Always carry your comprehensive travel medical insurance certificate showing at least $50,000 emergency coverage.`;
      } else {
        reply = `Thank you for your inquiry about "${query}". I have logged this to your journey record [${assignedAssistant.tripRef}]. As your ${
          assignedAssistant.isAiAssistant ? 'AI travel assistant' : 'travel concierge'
        }, I can coordinate your itineraries, audit baggage compliance, and advise on airport terminals. What would you like to explore next?`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          topic
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const quickPrompts = [
    { label: 'Visa Requirements & Processing', icon: ShieldCheck, text: 'What are the visa requirements and processing steps for my destination?' },
    { label: 'Flights & Baggage Allowance', icon: Plane, text: 'What baggage allowance and flight rules should I know for international travel?' },
    { label: 'Hotels & Neighborhood Stays', icon: Building, text: 'What hotel zones do you recommend for safety and transit?' },
    { label: 'Dietary & Dining Advice', icon: UtensilsCrossed, text: 'Are there verified vegetarian and halal dining options available?' },
    { label: 'Local Metro & Transport', icon: Train, text: 'How do I take local trains and transit cards from the airport?' },
    { label: 'Emergency Helplines', icon: AlertTriangle, text: 'What are the official emergency and tourist police contacts?' }
  ];

  return (
    <div id="travel-assistant" className="py-12 lg:py-20 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E2DDD2]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#247BA0] mb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#FF8066]" />
              <span>Dedicated Human Concierge & AI Advisory</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight">
              Your Travel Assistant
            </h1>
            <p className="mt-2 text-base sm:text-lg text-[#243E56] max-w-2xl">
              Get personalized travel coordination from certified regional destination specialists or switch to our 24/7 autonomous AI travel assistant.
            </p>
          </div>

          {/* Quick Switcher Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white px-3 py-2 rounded-xl border border-[#E2DDD2] shadow-sm flex items-center gap-2 text-xs">
              <span className="text-[#627D98] font-medium">Destination:</span>
              <select
                value={selectedDestination}
                onChange={(e) => handleMatch(e.target.value, selectedLanguage, assistantMode)}
                className="bg-transparent font-semibold text-[#102A43] focus:outline-none cursor-pointer"
              >
                <option value="United Arab Emirates">Dubai / UAE (Aarav Sharma)</option>
                <option value="France">France & Schengen (Elena Vance)</option>
                <option value="Japan">Japan (Kenji Sato)</option>
                <option value="Singapore">Singapore & SE Asia (Priya Nair)</option>
                <option value="United States">United States (AI Assistant)</option>
                <option value="United Kingdom">United Kingdom (AI Assistant)</option>
                <option value="Australia">Australia (AI Assistant)</option>
                <option value="Other Country">Other World Destination (AI)</option>
              </select>
            </div>

            <button
              onClick={() => handleMatch(selectedDestination, selectedLanguage, assistantMode === 'ai_only' ? 'auto' : 'ai_only')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                assistantMode === 'ai_only'
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-white border border-[#BCCCDC] text-[#102A43] hover:border-[#102A43]'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-[#FF8066]" />
              <span>{assistantMode === 'ai_only' ? 'Using AI Travel Assistant' : 'Switch to AI Travel Assistant'}</span>
            </button>
          </div>
        </div>

        {/* Profile Card & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Assigned Assistant Profile Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DDD2] shadow-md relative overflow-hidden">
              {/* AI vs Human Header Tag */}
              <div className="flex items-center justify-between mb-6">
                {assignedAssistant.isAiAssistant ? (
                  <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Bot className="w-3.5 h-3.5 text-purple-600" />
                    <span>AI Travel Assistant (Autonomous)</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Certified Human Travel Specialist</span>
                  </div>
                )}

                <span className="text-xs font-mono font-bold bg-[#FAF8F3] px-2.5 py-1 rounded-lg text-[#627D98] border border-[#E2DDD2]">
                  {assignedAssistant.id}
                </span>
              </div>

              {/* Avatar & Key Profile */}
              <div className="flex items-start gap-4 sm:gap-5 mb-6">
                <div className="relative shrink-0">
                  <img
                    src={assignedAssistant.avatar}
                    alt={assignedAssistant.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white shadow-md"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                      assignedAssistant.isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    title={assignedAssistant.availabilityStatus || 'Active'}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#102A43]">
                    {assignedAssistant.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-[#247BA0] mt-0.5">
                    {assignedAssistant.title}
                  </p>
                  <p className="text-xs text-[#627D98] mt-1 flex items-center gap-1">
                    <Globe2 className="w-3.5 h-3.5 text-[#FF8066]" />
                    <span className="font-medium text-[#102A43]">{assignedAssistant.destinationSpecialty}</span>
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-[#627D98]">
                    <span>⭐ <strong>{assignedAssistant.rating || 4.9}</strong> / 5.0</span>
                    <span>•</span>
                    <span>{assignedAssistant.tripsHandled?.toLocaleString()} trips assisted</span>
                  </div>
                </div>
              </div>

              {/* Bio & Transparency Notice */}
              <p className="text-xs sm:text-sm text-[#486581] leading-relaxed mb-6 bg-[#FAF8F3] p-4 rounded-2xl border border-[#E2DDD2]/60">
                {assignedAssistant.bio}
              </p>

              {/* Contact Details & Availability */}
              <div className="space-y-3 mb-6 text-xs sm:text-sm text-[#102A43] border-t border-b border-[#E2DDD2] py-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#627D98] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#247BA0]" />
                    Support Hours:
                  </span>
                  <span className="font-semibold text-right max-w-[240px]">
                    {assignedAssistant.supportHours || '08:00 – 22:00 Local Time'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#627D98] flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-[#247BA0]" />
                    Official Email:
                  </span>
                  <a
                    href={`mailto:${assignedAssistant.email}`}
                    className="font-mono text-xs font-semibold text-[#247BA0] hover:underline"
                  >
                    {assignedAssistant.email || 'support@saathi.travel'}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#627D98] flex items-center gap-1.5">
                    <PhoneCall className="w-4 h-4 text-[#247BA0]" />
                    Helpline / Desk:
                  </span>
                  <span className="font-mono text-xs font-semibold">
                    {assignedAssistant.phone || '+1 800-SAATHI'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#627D98] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Status:
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    {assignedAssistant.availabilityStatus || 'Available Now'}
                  </span>
                </div>
              </div>

              {/* Languages Spoken */}
              <div className="mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#627D98] block mb-2">
                  Languages Spoken
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {assignedAssistant.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-2.5 py-1 bg-[#FAF8F3] border border-[#E2DDD2] rounded-lg text-xs font-medium text-[#102A43]"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Support Coverage Categories */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#627D98] block mb-2">
                  Regional Expertise & Responsibilities
                </label>
                <div className="space-y-2">
                  {assignedAssistant.supportCategories.map((cat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#243E56]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey File Ref */}
              <div className="mt-6 pt-4 border-t border-[#E2DDD2] flex items-center justify-between text-xs text-[#627D98]">
                <span>Active Journey Docket:</span>
                <span className="font-mono font-bold text-[#102A43]">{assignedAssistant.tripRef}</span>
              </div>
            </div>

            {/* Assistance Services Cards */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2DDD2] shadow-sm space-y-4">
              <h3 className="font-display text-base font-bold text-[#102A43] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF8066]" />
                How Your Assistant Coordinates Your Journey
              </h3>

              <div className="p-3.5 rounded-2xl bg-[#F0F4F8] border border-[#D9E2EC] text-xs space-y-1">
                <div className="font-bold text-[#102A43] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#247BA0]" />
                  <span>Travel Itinerary & Booking Assistance</span>
                </div>
                <p className="text-[#334E68] leading-relaxed">
                  {assignedAssistant.serviceSpecialties?.itineraryAssistance ||
                    'Curates custom day-wise schedules, verifies attraction timings, and cross-checks transfers.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#E6F4FA] border border-[#BEE3F8] text-xs space-y-1">
                <div className="font-bold text-[#0B69A3] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0B69A3]" />
                  <span>Visa Documentation & Travel Compliance</span>
                </div>
                <p className="text-[#2B6CB0] leading-relaxed">
                  {assignedAssistant.serviceSpecialties?.visaSupport ||
                    'Audits passport validity, photo dimensions, financial proofs, and authentic government visa portals.'}
                </p>
                <div className="pt-1.5 flex gap-2">
                  <button
                    onClick={onOpenVisaAssistant}
                    className="text-[11px] font-bold text-[#0B69A3] hover:underline flex items-center gap-1"
                  >
                    Open Visa Assistant <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={onOpenVault}
                    className="text-[11px] font-bold text-[#0B69A3] hover:underline flex items-center gap-1"
                  >
                    Open Document Vault <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  <span>24/7 Emergency & Medical Coordination</span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  {assignedAssistant.serviceSpecialties?.emergencyProtocol ||
                    'Instant routing to local diplomatic consulates, English-speaking clinics, and official tourist police.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Chat Interface with Assistant */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-3xl border border-[#E2DDD2] shadow-md flex flex-col h-[740px] overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#102A43] to-[#243E56] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={assignedAssistant.avatar}
                    alt={assignedAssistant.name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base">{assignedAssistant.name}</h3>
                      {assignedAssistant.isAiAssistant ? (
                        <span className="text-[10px] font-bold bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded-full border border-purple-400/30">
                          AI Assistant
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/30">
                          Verified Specialist
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#DCE8DF] truncate max-w-[280px]">
                      {assignedAssistant.destinationSpecialty}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setChatMessages([
                      {
                        sender: 'assistant',
                        text: `Chat session refreshed. How can I assist you with your upcoming journey to ${assignedAssistant.destinationSpecialty}?`,
                        time: 'Just now'
                      }
                    ]);
                  }}
                  title="Clear chat"
                  className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Topic Chips */}
              <div className="p-3 bg-[#FAF8F3] border-b border-[#E2DDD2] overflow-x-auto flex items-center gap-2 scrollbar-none">
                <span className="text-[11px] font-bold text-[#627D98] whitespace-nowrap pl-1">
                  Ask About:
                </span>
                {quickPrompts.map((qp, idx) => {
                  const Icon = qp.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendQuery(qp.text)}
                      className="px-2.5 py-1 bg-white hover:bg-[#F0F4F8] border border-[#D9E2EC] rounded-full text-xs text-[#102A43] whitespace-nowrap font-medium flex items-center gap-1.5 shadow-2xs transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <Icon className="w-3 h-3 text-[#247BA0]" />
                      <span>{qp.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Message Thread */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF8F3]/50">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'assistant' && (
                      <img
                        src={assignedAssistant.avatar}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 border border-[#E2DDD2]"
                      />
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#102A43] text-white rounded-br-none shadow-sm'
                          : 'bg-white text-[#102A43] border border-[#E2DDD2] rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span
                        className={`block text-[10px] mt-2 font-mono ${
                          msg.sender === 'user' ? 'text-white/60 text-right' : 'text-[#829AB1]'
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 items-center">
                    <img
                      src={assignedAssistant.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#E2DDD2]"
                    />
                    <div className="bg-white border border-[#E2DDD2] rounded-2xl px-4 py-3 shadow-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#247BA0] animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-[#247BA0] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-[#247BA0] animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuery();
                }}
                className="p-3 sm:p-4 bg-white border-t border-[#E2DDD2] flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Ask ${assignedAssistant.name} about visas, flights, hotels, trains, or emergencies...`}
                  className="flex-1 bg-[#FAF8F3] border border-[#D9E2EC] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#102A43] focus:outline-none focus:border-[#247BA0] focus:ring-1 focus:ring-[#247BA0]"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-[#247BA0] hover:bg-[#1A535C] disabled:opacity-50 text-white px-4 sm:px-5 py-3 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
