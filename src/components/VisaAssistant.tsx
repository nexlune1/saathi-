import React, { useState } from 'react';
import {
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Clock,
  Coins,
  FileText,
  AlertTriangle,
  ArrowRight,
  Info,
  Sparkles,
  HelpCircle,
  Building,
  CheckSquare,
  Globe2
} from 'lucide-react';
import { VISA_REQUIREMENTS_DATABASE } from '../data/visaData';
import { VisaRequirement } from '../types/travel';

interface VisaAssistantProps {
  initialCountry?: string;
  onOpenVault: (countryKey: string) => void;
  onAskQuestion: (query: string) => void;
}

export const VisaAssistant: React.FC<VisaAssistantProps> = ({
  initialCountry = 'dubai',
  onOpenVault,
  onAskQuestion
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry);
  const [passportNationality, setPassportNationality] = useState<string>('India');
  const [purpose, setPurpose] = useState<'tourism' | 'business' | 'study' | 'family'>('tourism');
  const [stayDurationDays, setStayDurationDays] = useState<number>(7);

  // User-interactive stages progress (Stages 1-6)
  const currentVisa = VISA_REQUIREMENTS_DATABASE[selectedCountry] || VISA_REQUIREMENTS_DATABASE.dubai;
  const [completedStages, setCompletedStages] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false
  });

  const toggleStage = (stageId: number) => {
    setCompletedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const completedCount = Object.values(completedStages).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 6) * 100);

  const visaFaqs = [
    { q: 'Why might my Dubai visa be rejected?', query: 'Why might my Dubai visa be rejected?' },
    { q: 'What documents do I need for Singapore?', query: 'What documents do I need for Singapore?' },
    { q: 'Do I need a transit visa?', query: 'Do I need an international transit visa for airport layovers?' },
    { q: 'How do I apply for a Schengen visa?', query: 'Explain the step by step process to apply for a Schengen visa.' },
    { q: 'What should I do if my visa is delayed?', query: 'What should I do if my visa application is delayed?' }
  ];

  return (
    <div id="visa" className="py-16 lg:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#247BA0] mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#FF8066]" />
            <span>Official Embassy & Immigration Intelligence</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight">
            International Visa Assistant
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#243E56]">
            Understand verified visa procedures, avoid costly rejection traps, track your application milestones, and gather compliant documents.
          </p>
        </div>

        {/* Selection Bar Form */}
        <div className="bg-white rounded-2xl p-6 border border-[#E2DDD2] shadow-sm mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                Destination Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-[#102A43] focus:ring-2 focus:ring-[#247BA0] cursor-pointer"
              >
                <option value="dubai">🇦🇪 United Arab Emirates (Dubai)</option>
                <option value="singapore">🇸🇬 Singapore</option>
                <option value="thailand">🇹🇭 Thailand</option>
                <option value="japan">🇯🇵 Japan</option>
                <option value="france">🇫🇷 France (Schengen Area)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                Passport Nationality
              </label>
              <select
                value={passportNationality}
                onChange={(e) => setPassportNationality(e.target.value)}
                className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-[#102A43] focus:ring-2 focus:ring-[#247BA0] cursor-pointer"
              >
                <option value="India">🇮🇳 India</option>
                <option value="United States">🇺🇸 United States</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="UAE">🇦🇪 UAE Citizen</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                Travel Purpose
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as any)}
                className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#102A43] focus:ring-2 focus:ring-[#247BA0] cursor-pointer"
              >
                <option value="tourism">🏝️ Tourism & Vacation</option>
                <option value="business">💼 Business & Meetings</option>
                <option value="study">🎓 Education / Study</option>
                <option value="family">👨‍👩‍👦 Visiting Relatives</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1.5">
                Planned Stay Duration
              </label>
              <select
                value={stayDurationDays}
                onChange={(e) => setStayDurationDays(Number(e.target.value))}
                className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#102A43] focus:ring-2 focus:ring-[#247BA0] cursor-pointer"
              >
                <option value={7}>Under 7 Days</option>
                <option value={14}>8 – 14 Days</option>
                <option value={30}>15 – 30 Days</option>
                <option value={60}>31 – 60 Days</option>
                <option value={90}>Up to 90 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Personalized Visa Preparation Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Top Overview Banner */}
            <div className="bg-[#102A43] text-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#DCE8DF] flex items-center gap-2 mb-1">
                    <span className="text-xl">{currentVisa.flag}</span>
                    <span>{currentVisa.destinationCountry} Visa Guidance</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">
                    {currentVisa.visaType}
                  </h3>
                  <div className="text-xs text-white/80 mt-1">
                    Passport: {passportNationality} · Purpose: {purpose.toUpperCase()} · Duration: {stayDurationDays} Days
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <a
                    href={currentVisa.officialPortal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#FF8066] hover:bg-[#E7684F] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Visit Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Fast Facts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
                <div className="p-3.5 bg-white/10 rounded-xl border border-white/10">
                  <div className="text-gray-300 flex items-center gap-1.5 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#FF8066]" />
                    <span>Processing Timeline</span>
                  </div>
                  <div className="font-bold text-white text-sm mt-1">
                    {currentVisa.processingTimeline}
                  </div>
                </div>

                <div className="p-3.5 bg-white/10 rounded-xl border border-white/10">
                  <div className="text-gray-300 flex items-center gap-1.5 font-semibold">
                    <Coins className="w-3.5 h-3.5 text-[#FF8066]" />
                    <span>Indicative Official Fee</span>
                  </div>
                  <div className="font-bold text-white text-sm mt-1">
                    {currentVisa.indicativeFee}
                  </div>
                </div>

                <div className="p-3.5 bg-white/10 rounded-xl border border-white/10">
                  <div className="text-gray-300 flex items-center gap-1.5 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                    <span>Passport Validity Rule</span>
                  </div>
                  <div className="font-bold text-white text-xs mt-1 leading-snug">
                    {currentVisa.validityRequirement}
                  </div>
                </div>
              </div>
            </div>

            {/* A. Visa Process Guide Step-by-Step */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2DDD2] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h4 className="font-display text-xl font-bold text-[#102A43]">
                  Step-by-Step Visa Process Guide
                </h4>
                <span className="text-xs text-gray-500 font-semibold">
                  Official Reference: {currentVisa.officialPortal.name}
                </span>
              </div>

              <div className="space-y-6">
                {currentVisa.steps.map((st) => (
                  <div key={st.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-[#102A43] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {st.step}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h5 className="font-bold text-sm sm:text-base text-[#102A43]">
                        {st.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-[#486581] leading-relaxed">
                        {st.description}
                      </p>
                      {st.tips && (
                        <div className="p-3 bg-[#FAF8F3] rounded-lg border border-[#E2DDD2] text-xs text-[#243E56] flex items-start gap-2">
                          <Info className="w-4 h-4 text-[#247BA0] shrink-0 mt-0.5" />
                          <span><strong>Expert Tip:</strong> {st.tips}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents Checklist Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2DDD2] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h4 className="font-display text-xl font-bold text-[#102A43]">
                    Required Document Checklist
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Required for {currentVisa.destinationCountry} by consulate guidelines
                  </p>
                </div>
                <button
                  onClick={() => onOpenVault(selectedCountry)}
                  className="px-4 py-2 bg-[#247BA0] hover:bg-[#1A5E7B] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Prepare in Document Vault</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentVisa.requiredDocuments.map((doc, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E2DDD2] text-xs text-[#102A43] font-medium flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Status Tracker & FAQs (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* B. Visa Status Tracker (Interactive) */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2DDD2] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-display text-lg font-bold text-[#102A43]">
                    Visa Status Tracker
                  </h4>
                  <span className="text-[11px] text-gray-500">
                    Self-managed preparation tracker
                  </span>
                </div>
                <span className="text-xs font-bold px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                  {progressPercent}% Complete
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-[#247BA0] to-[#FF8066] transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                {currentVisa.stages.map((st) => {
                  const isChecked = completedStages[st.id] ?? false;

                  return (
                    <button
                      key={st.id}
                      onClick={() => toggleStage(st.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-[#FAF8F3] border-emerald-300 text-[#102A43]'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isChecked ? 'text-[#102A43]' : 'text-gray-600'}`}>
                          Stage {st.id}: {st.title}
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {st.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <strong>Notice:</strong> This tracker helps you organize application milestones. It does not interface directly with foreign government databases.
              </div>
            </div>

            {/* C. Common Visa Questions (Quick Action Chips) */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2DDD2] shadow-sm">
              <h4 className="font-display text-base font-bold text-[#102A43] mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#247BA0]" />
                <span>Ask SAATHI about Visas</span>
              </h4>
              <p className="text-xs text-gray-600 mb-4">
                Instant guidance on delays, refusals, transit rules, and appointment availability:
              </p>

              <div className="space-y-2">
                {visaFaqs.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAskQuestion(faq.query)}
                    className="w-full p-2.5 bg-[#FAF8F3] hover:bg-[#E2DDD2] rounded-xl border border-[#E2DDD2] text-xs text-[#102A43] font-medium text-left transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <span>{faq.q}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF8066] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
