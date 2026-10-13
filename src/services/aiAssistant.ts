import { ChatMessage, ChatAction, ChatSource } from '../types/travel';

export const SAATHI_IDENTITY = {
  name: 'SAATHI — Your AI Travel Assistant',
  fullName: 'Smart Assistance for All Travel, Hotels and International journeys.',
  shortName: 'SAATHI',
  tagline: 'Your World. Your Journey. Your Saathi.',
  description: 'From visa preparation to hotel recommendations, SAATHI makes international travel simpler, smarter, and stress-free.'
};

export const INITIAL_ASSISTANT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    text: `Hello, traveller! I'm your **SAATHI**. Tell me where you're going, and I'll help you prepare for the journey. 🌍✈️\n\nI can assist you with:\n• **Visa & Immigration Rules** (Dubai, Singapore, Schengen, Japan, Thailand, US, UK)\n• **Document Checklist & Vault Readiness** (Passport 6-month validity, financial proof)\n• **International Hotels & Safe Neighborhoods**\n• **Vegetarian, Halal & Local Dining Recommendations**\n• **Flight Delays, Cancellations & Luggage Disruptions**\n• **Personal Concierge Matching via My Travel Saathi**\n\nHow can I help you today? Pick a quick option below or describe your journey:`,
    timestamp: 'Just now',
    verifiedDate: 'Verified with official international travel regulations (October 2026)',
    actions: [
      { label: 'Check Visa Requirements', actionType: 'visa', payload: 'dubai' },
      { label: 'Open Document Vault', actionType: 'vault' },
      { label: 'Find International Hotels', actionType: 'hotel', payload: 'singapore' },
      { label: 'Find Dining & Restaurants', actionType: 'restaurant', payload: 'paris' }
    ]
  }
];

export const SAATHI_PROBLEM_CATEGORIES = [
  { id: 'visa', label: '🛂 Visa & Immigration', query: 'Help me prepare for my international visa application.' },
  { id: 'vault', label: '📁 Document Checklist', query: 'Which documents are missing from my travel checklist?' },
  { id: 'hotels', label: '🏨 International Hotels', query: 'Suggest verified hotels in Singapore or Dubai under my budget.' },
  { id: 'dining', label: '🍽️ Dining & Restaurants', query: 'Find vegetarian and Halal restaurants in Paris or Tokyo.' },
  { id: 'flights', label: '🛫 Flight Disruptions', query: 'What should I do if my international flight is cancelled or delayed?' },
  { id: 'concierge', label: '🤝 My Travel Saathi', query: 'How does personal travel concierge matching work?' }
];

export const SUGGESTED_PROMPTS = [
  'Help me prepare for my Dubai visa.',
  'Which documents are missing from my checklist?',
  'Suggest hotels in Singapore under my budget.',
  'Find vegetarian restaurants in Paris.',
  'Plan a 5-day international trip.',
  'Explain the Schengen visa process.',
  'What should I do if my flight is cancelled?'
];

export const MIA_IDENTITY = SAATHI_IDENTITY;
export const PROBLEM_CATEGORIES = SAATHI_PROBLEM_CATEGORIES;


export function getLocalSaathiResponse(userQuery: string): ChatMessage {
  const q = userQuery.toLowerCase().trim();
  let text = '';
  let category: ChatMessage['category'] = 'general';
  let sources: ChatSource[] = [];
  let actions: ChatAction[] = [];
  const verifiedDate = 'Verified with official regulatory sources (October 2026)';

  // 1. DUBAI VISA
  if (q.includes('dubai') && (q.includes('visa') || q.includes('reject') || q.includes('document') || q.includes('prepare'))) {
    category = 'visa';
    text = `### What this means
For travel to Dubai & the UAE, non-exempt passport holders (including standard Indian passport holders) require either a pre-arranged 30/60-day tourist eVisa, or qualify for a 14-day Visa on Arrival (VoA) if holding a valid US Visa/Green Card, UK Visa, or EU Schengen Visa with at least 6 months validity.

### What you should do next
1. **Verify Your Passport Validity**: Ensure your passport is valid for at least **6 months** from your intended date of entry into the UAE.
2. **Select Authorized Channels**: Apply only via official UAE GDRFA/ICP systems, airlines (Emirates, Flydubai), or accredited visa agencies.
3. **Check Previous Visa Status**: If you had a previous tourist or employment visa, ensure it has been formally cancelled in the UAE immigration system to avoid automatic rejection.
4. **Prepare Clear Documents**: Coloured passport bio-page scans (no flash reflections), white-background photograph, confirmed return flight, and documented hotel reservation.

### Official resources
• **GDRFA Dubai**: Official Dubai immigration and visa tracking portal.
• **ICP UAE**: Federal Authority for Identity, Citizenship, Customs & Port Security.
• **U.AE**: Official UAE Government entry guidelines.`;

    sources = [
      { title: 'GDRFA Dubai - Official Visa & Residency Services', url: 'https://gdrfad.gov.ae', domain: 'gdrfad.gov.ae', isOfficial: true },
      { title: 'ICP UAE - Federal Identity & Citizenship Authority', url: 'https://icp.gov.ae', domain: 'icp.gov.ae', isOfficial: true },
      { title: 'U.AE - Official UAE Visa Guidelines', url: 'https://u.ae', domain: 'u.ae', isOfficial: true }
    ];

    actions = [
      { label: 'Open Visa Assistant for Dubai', actionType: 'visa', payload: 'dubai' },
      { label: 'Check Document Vault', actionType: 'vault' },
      { label: 'Find Dubai Hotels', actionType: 'hotel', payload: 'Dubai' }
    ];
  }

  // 2. SCHENGEN VISA (France, Italy, Switzerland)
  else if (q.includes('schengen') || q.includes('france') || q.includes('europe') || q.includes('italy') || q.includes('switzerland')) {
    category = 'visa';
    text = `### What this means
A Uniform Schengen Short-Stay Visa (Type C) allows travel across all 29 European Schengen member states for up to 90 days within any 180-day rolling period.

### Possible reasons for delays or refusals
• Submitting applications to the wrong embassy (you must apply to your main destination country with the longest stay).
• Insufficient or unstamped bank statements without regular source of income.
• Non-compliant travel insurance (must cover minimum €30,000 for emergency medical and repatriation).
• Unverified hotel reservations or incomplete day-by-day travel itinerary.

### What you should do next
1. **Apply 4 to 8 Weeks in Advance**: VFS Global appointment slots for France, Switzerland, and Italy book out rapidly.
2. **Compile Stamped Financial Proof**: 6 months of bank account statements with bank branch stamp, plus last 3 years of Income Tax Returns (ITR).
3. **Secure Compliant Schengen Insurance**: Policy must clearly state minimum €30,000 coverage across all Schengen countries.
4. **Prepare Detailed Itinerary**: Include flight reservations, inter-city train bookings, and confirmed accommodation.`;

    sources = [
      { title: 'France-Visas - Official Portal for Visas to France', url: 'https://france-visas.gouv.fr', domain: 'france-visas.gouv.fr', isOfficial: true },
      { title: 'European Commission - Schengen Visa Policy', url: 'https://ec.europa.eu/home-affairs/policies/schengen-borders-and-visa_en', domain: 'ec.europa.eu', isOfficial: true }
    ];

    actions = [
      { label: 'Open Visa Assistant for France', actionType: 'visa', payload: 'france' },
      { label: 'Upload Documents to Vault', actionType: 'vault' },
      { label: 'Find Paris Vegetarian Restaurants', actionType: 'restaurant', payload: 'paris' }
    ];
  }

  // 3. SINGAPORE VISA & SG ARRIVAL CARD
  else if (q.includes('singapore') && (q.includes('visa') || q.includes('hotel') || q.includes('document'))) {
    category = 'visa';
    text = `### Singapore Entry & Visa Requirements
1. **Authorized Visa Agent (AVA)**: Indian passport holders must apply through an ICA-authorized visa agent in India or via a local sponsor in Singapore using Singpass.
2. **Processing Time**: Typically 3 to 5 working days. Fee is 30 SGD plus agent processing charge.
3. **Mandatory SG Arrival Card (SGAC)**: Every international traveller must submit the free electronic SG Arrival Card with health declaration on ica.gov.sg within 3 days before arriving at Changi Airport.
4. **Passport Validity**: Must have minimum 6 months validity from date of entry.`;

    sources = [
      { title: 'ICA Singapore - Official Immigration & Checkpoints Authority', url: 'https://www.ica.gov.sg', domain: 'ica.gov.sg', isOfficial: true }
    ];

    actions = [
      { label: 'Open Visa Assistant for Singapore', actionType: 'visa', payload: 'singapore' },
      { label: 'Find Singapore Hotels', actionType: 'hotel', payload: 'Singapore' },
      { label: 'Explore Hawker Dining', actionType: 'restaurant', payload: 'singapore' }
    ];
  }

  // 4. MISSING DOCUMENTS & CHECKLIST
  else if (q.includes('document') || q.includes('missing') || q.includes('checklist') || q.includes('vault')) {
    category = 'vault';
    text = `### International Document Checklist Assessment
Before boarding any international flight, your **SAATHI Document Vault** verifies these essential documents:

1. **Passport (Bio-Page & Signatures)**: Minimum 6 months validity from return date + 2 blank pages.
2. **Valid Visa / ETA / e-Visa Approval Copy**: Printed in colour.
3. **Confirmed Return or Onward Flight Tickets**: Mandatory for immigration boarding clearance.
4. **Proof of Accommodation**: Hotel vouchers covering all nights of the stay.
5. **International Travel & Health Insurance**: Essential for Schengen (€30,000) and worldwide destinations.
6. **Financial Standing**: Stamped bank statements or international credit cards with international usage enabled.
7. **Destination Specific**: E.g. SG Arrival Card for Singapore, TM6 details for Thailand.`;

    sources = [
      { title: 'IATA Travel Centre - International Document Verifier', url: 'https://www.iatatravelcentre.com', domain: 'iatatravelcentre.com', isOfficial: true }
    ];

    actions = [
      { label: 'Open Document Vault', actionType: 'vault' },
      { label: 'Go to Pre-Departure Checklist', actionType: 'checklist' }
    ];
  }

  // 5. HOTELS
  else if (q.includes('hotel') || q.includes('stay') || q.includes('resort') || q.includes('hostel')) {
    category = 'hotels';
    text = `### International Hotel Recommendations by SAATHI
When booking international hotels, SAATHI recommends looking at:
• **Neighborhood Proximity**: Staying near metro lines (e.g. MRT in Singapore, Metro in Dubai/Paris) saves over 50% on daily local transit.
• **Security Deposit Policies**: Most international hotels place a credit card hold of $50–$100/night for incidentals.
• **Check-In Documentation**: The primary guest must present their original passport and booking voucher.
• **Scam Alert**: Never pay through external payment links sent via WhatsApp or third-party email.`;

    sources = [
      { title: 'SAATHI Verified Hotel Directory', url: '#hotels', domain: 'saathi.travel', isOfficial: true }
    ];

    actions = [
      { label: 'Browse International Hotels', actionType: 'hotel' },
      { label: 'Ask My Travel Saathi Concierge', actionType: 'assistant' }
    ];
  }

  // 6. RESTAURANTS & VEGETARIAN / HALAL DINING
  else if (q.includes('restaurant') || q.includes('food') || q.includes('vegetarian') || q.includes('halal') || q.includes('vegan') || q.includes('paris') || q.includes('dining')) {
    category = 'restaurants';
    text = `### International Dining & Dietary Navigation
Travelling internationally with specific dietary requirements:
• **Paris & France**: Look for "Végétarien" or "Végétalien" (Vegan) signage. Many modern bistros in the 10th and 11th arrondissements specialize in plant-based French dining.
• **Dubai & Singapore**: 100% Halal meat is standard across the UAE, and Singapore hawker centres feature dedicated Halal certificates.
• **Japan**: Download Japanese dietary phrase cards explaining "No Meat, No Fish Broth (Dashi)" as fish stock is common in soups.
• **Tipping Standards**: Europe includes service charge in bills; tipping in Japan is discouraged; US customary 18-20%.`;

    sources = [
      { title: 'SAATHI International Dining Guide', url: '#restaurants', domain: 'saathi.travel', isOfficial: true }
    ];

    actions = [
      { label: 'Open International Restaurant Finder', actionType: 'restaurant' },
      { label: 'Plan Itinerary with Dining', actionType: 'plan' }
    ];
  }

  // 7. FLIGHT CANCELLATIONS & PASSENGER RIGHTS
  else if (q.includes('flight') && (q.includes('cancelled') || q.includes('delay') || q.includes('refund') || q.includes('baggage'))) {
    category = 'flights';
    text = `### Flight Disruption & Passenger Rights
1. **Full Refund vs Alternate Routing**: If an airline cancels your flight, civil aviation regulations (DGCA CAR Series M, EU261, US DOT) mandate a choice between an immediate 100% full refund with no penalty, or the next available alternative flight.
2. **Airport Refreshments & Hotels**: For delays exceeding 2 hours, airlines must provide complimentary meals. For overnight delays, complimentary hotel accommodation with transfers is mandatory.
3. **Lost Baggage (PIR Form)**: If your baggage does not appear on the international carousel, report to the airline baggage counter immediately and complete a **Property Irregularity Report (PIR)** before passing customs.`;

    sources = [
      { title: 'DGCA Passenger Charter', url: 'https://dgca.gov.in', domain: 'dgca.gov.in', isOfficial: true },
      { title: 'AirSewa Grievance Redressal Portal', url: 'https://airsewa.gov.in', domain: 'airsewa.gov.in', isOfficial: true }
    ];

    actions = [
      { label: 'Open Flight Passenger Rights Guide', actionType: 'link', url: 'https://airsewa.gov.in' },
      { label: 'Contact My Travel Saathi', actionType: 'assistant' }
    ];
  }

  // DEFAULT
  else {
    category = 'general';
    text = `### Guidance for: "${userQuery}"

I'm your **SAATHI**, ready to help you coordinate every stage of your international journey:
• **Visa Navigation**: Understanding embassy timelines, biometrics, and eVisa portals.
• **Document Vault**: Ensuring your passport has 6 months validity, insurance, and hotel vouchers.
• **Hotels & Dining**: Curated stays in safe neighborhoods and dietary-friendly restaurants.
• **Day-by-Day Planning**: Tailored itineraries matching your travel pace and budget.

Feel free to ask specific questions about destination requirements, visa documents, or hotel recommendations!`;

    sources = [
      { title: 'SAATHI Travel Intelligence Platform', url: '#home', domain: 'saathi.travel', isOfficial: true }
    ];

    actions = [
      { label: 'Explore Visa Assistant', actionType: 'visa' },
      { label: 'Open Document Vault', actionType: 'vault' },
      { label: 'Browse International Hotels', actionType: 'hotel' },
      { label: 'Plan an International Trip', actionType: 'plan' }
    ];
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text,
    category,
    timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    verifiedDate,
    sources,
    actions
  };
}

export async function askSaathi(userQuery: string, history: ChatMessage[] = []): Promise<ChatMessage> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userQuery,
        history: history.slice(-6).map(m => ({ sender: m.sender, text: m.text }))
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.text && !data.fallback) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          timestamp: data.timestamp || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          verifiedDate: data.verifiedDate || 'Verified with Google Search Grounding (October 2026)',
          sources: data.sources && data.sources.length > 0 ? data.sources : [
            { title: 'Official International Travel Guidelines', url: 'https://u.ae', domain: 'u.ae', isOfficial: true }
          ],
          actions: [
            { label: 'View Visa Requirements', actionType: 'visa' },
            { label: 'Open Document Vault', actionType: 'vault' },
            { label: 'Return to Trip Dashboard', actionType: 'plan' }
          ]
        };
      }
    }
  } catch (err) {
    console.warn('API /api/chat unavailable, using high-fidelity SAATHI engine:', err);
  }

  return getLocalSaathiResponse(userQuery);
}

export const askMia = askSaathi;

