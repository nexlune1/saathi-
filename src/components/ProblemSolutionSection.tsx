import React from 'react';
import { Layers, Lightbulb, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, SlidersHorizontal, ShieldAlert, IndianRupee } from 'lucide-react';

export const ProblemSolutionSection: React.FC = () => {
  const problems = [
    {
      id: 1,
      title: 'App Fragmentation & Tab Overload',
      description: 'The average traveller juggles 5 to 7 different platforms—flight apps, booking portals, Google Docs, blogs, and WhatsApp chats—leading to cognitive fatigue.',
      solution: 'Single Unified Workspace',
      solutionDesc: 'SAATHI combines visa verification, document readiness, hotel and dining discovery, daily schedules, and multi-currency budgeting in one coordinated interface.'
    },
    {
      id: 2,
      title: 'Opaque & Stressful Budgeting',
      description: 'Traditional travel apps hide incidental costs. Travellers often overshoot their budget on local cabs, meals, and entry tickets without real-time visibility.',
      solution: 'Live INR Expense Cockpit',
      solutionDesc: 'Real-time category splits for transport, stay, dining, and emergencies with automatic deficit warnings.'
    },
    {
      id: 3,
      title: 'Rigid, Cookie-Cutter Itineraries',
      description: 'Standard travel packages force travellers into exhausting commercial routes that do not reflect their true pace, interests, or group size.',
      solution: 'Tailored Pacing & Themes',
      solutionDesc: 'Custom day-by-day itineraries broken into morning, afternoon, and evening slots with local insider tips.'
    },
    {
      id: 4,
      title: 'Scattered Travel Information',
      description: 'Tickets, hotel contacts, packing lists, and local emergency helplines are stored in different places, causing panic during transit.',
      solution: 'Zero-Friction Offline Readiness',
      solutionDesc: 'Saved itineraries, interactive checklists, and essential contacts saved securely in browser storage.'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FAF8F3] border-b border-[#E2DDD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#247BA0] mb-2">
            <Lightbulb className="w-4 h-4 text-[#FF8066]" />
            <span>Design Thinking Project Foundation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight">
            The Problems We Solve.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#243E56] font-normal leading-relaxed">
            Travel planning shouldn't feel like a second job. Through empathy research with university students and young professionals, we identified key bottlenecks and engineered a seamless, human-first solution.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 border border-[#E2DDD2] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Pain Point */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 font-bold text-sm">
                    0{item.id}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#102A43]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#486581] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-dashed border-[#E2DDD2]" />

                {/* TravelMate Solution */}
                <div className="flex items-start gap-3 bg-[#FAF8F3] p-4 rounded-xl border border-[#DCE8DF]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#247BA0]">
                      TravelMate Innovation
                    </div>
                    <div className="text-sm font-semibold text-[#102A43] mt-0.5">
                      {item.solution}
                    </div>
                    <p className="text-xs text-[#243E56] mt-1 leading-relaxed">
                      {item.solutionDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Thinking Empathy Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#102A43] to-[#247BA0] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#FF8066]">
              Human-Centered Design Thinking Process
            </div>
            <h4 className="font-display text-2xl font-bold mt-1 text-white">
              Empathize → Define → Ideate → Prototype → Test
            </h4>
            <p className="text-sm text-white/80 mt-2 leading-relaxed">
              TravelMate addresses real traveller stress points with clean information hierarchy, transparent budget tracking in Indian Rupees, and <strong>Mia – Your AI Travel Assistant</strong> for real-world visa guidance, flight refund rights, and emergency support.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs bg-white/10 px-4 py-2 rounded-lg border border-white/20 text-[#FAF8F3]">
              100% Free Prototype
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
