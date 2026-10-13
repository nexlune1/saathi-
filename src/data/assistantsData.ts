import { TravelAssistant } from '../types/travel';

export const AI_TRAVEL_ASSISTANT: TravelAssistant = {
  id: 'AST-AI-GLOBAL-01',
  name: 'SAATHI AI Travel Assistant',
  title: 'Autonomous Global Travel & Compliance Engine',
  avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  destinationSpecialty: 'Global Coverage (All 195 Countries & Territories)',
  languages: ['English', 'Hindi', 'Arabic', 'French', 'Spanish', 'German', 'Japanese', 'Mandarin'],
  experienceYears: 4,
  supportCategories: [
    'Real-time Visa & IATA Document Verification',
    'Flight Schedules & Luggage Restriction Scanner',
    'Budget & Travel Style Optimization Matrix',
    'Emergency Medical & Embassy Coordination'
  ],
  bio: 'Official SAATHI Artificial Intelligence travel engine. Clearly designated as an autonomous AI assistant providing 24/7 immediate assistance, cross-checking immigration laws, luggage regulations, and airport rules across all worldwide destinations.',
  tripRef: 'SATH-AI-9900',
  isAvailable: true,
  isHumanServiceSimulated: false,
  isAiAssistant: true,
  email: 'ai.assistant@saathi.travel',
  phone: '+1 (800) 722-8442 (Toll-Free 24/7)',
  supportHours: '24 Hours / 7 Days a Week (Instant automated response)',
  availabilityStatus: '24/7 Automated Online',
  rating: 4.9,
  tripsHandled: 16840,
  serviceSpecialties: {
    itineraryAssistance: 'Algorithmic day-by-day scheduling with optimal transit routing and live operating hours.',
    bookingGuidance: 'Neutral fare comparisons with direct airline links and zero marked-up third-party commissions.',
    visaSupport: 'Up-to-date entry rules for 190+ passports with links to authentic government immigration portals.',
    emergencyProtocol: 'Immediate dispatch of local emergency numbers (Police, Ambulance, Fire) and nearest diplomatic consulate.'
  }
};

export const TRAVEL_ASSISTANTS: TravelAssistant[] = [
  {
    id: 'AST-DXB-9482',
    name: 'Aarav Sharma',
    title: 'Middle East & UAE Destination Concierge',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    destinationSpecialty: 'United Arab Emirates, Dubai, Abu Dhabi & Gulf Region',
    languages: ['English', 'Hindi', 'Arabic', 'Gujarati'],
    experienceYears: 8,
    supportCategories: [
      'Dubai eVisa & 14-Day VoA Guidance',
      'Desert Safari & VIP Yacht Charter Logistics',
      'Halal & Jain Dining Recommendations',
      'Metro Nol Card & Airport Fast-Track Bookings'
    ],
    bio: 'Based between Dubai Marina and Mumbai for over 8 years, Aarav specializes in seamless DXB airport arrivals, resolving GDRFA visa documentation, and curating authentic cultural and modern Gulf experiences.',
    tripRef: 'SATH-DXB-9482',
    isAvailable: true,
    isHumanServiceSimulated: true,
    isAiAssistant: false,
    email: 'aarav.sharma@saathi.travel',
    phone: '+971 4 800 72284 (Direct Desk)',
    supportHours: '08:00 – 22:00 Gulf Standard Time (GST)',
    availabilityStatus: 'Available Now',
    rating: 4.95,
    tripsHandled: 1240,
    serviceSpecialties: {
      itineraryAssistance: 'Custom pacing for Dubai & Abu Dhabi, balancing morning cultural sights with sunset dunes.',
      bookingGuidance: 'Insider access to Burj Khalifa lounge tickets and private dhow charters.',
      visaSupport: 'Direct guidance on ICP / GDRFA tourist visas and 6-month passport validity rules.',
      emergencyProtocol: '24/7 coordination with Dubai Tourism Police (901) and Indian Consulate in Dubai.'
    }
  },
  {
    id: 'AST-EUR-8831',
    name: 'Elena Vance',
    title: 'European Schengen & Cultural Advisor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    destinationSpecialty: 'France, Italy, Switzerland & Western Europe',
    languages: ['English', 'French', 'Italian', 'German'],
    experienceYears: 9,
    supportCategories: [
      'Schengen Visa Dossier & €30,000 Insurance Review',
      'Museum Skip-the-Line Bookings',
      'Cross-Border High-Speed Rail Pass Guidance',
      'Vegetarian & Fine Dining Reservations'
    ],
    bio: 'A Paris-educated art historian with a decade of expertise helping international travellers navigate Schengen immigration, multi-country Eurail train passes, and private museum appointments.',
    tripRef: 'SATH-EUR-8831',
    isAvailable: true,
    isHumanServiceSimulated: true,
    isAiAssistant: false,
    email: 'elena.vance@saathi.travel',
    phone: '+33 1 70 82 44 19 (Paris Desk)',
    supportHours: '09:00 – 20:00 Central European Time (CET)',
    availabilityStatus: 'Available Now',
    rating: 4.98,
    tripsHandled: 1890,
    serviceSpecialties: {
      itineraryAssistance: 'Scenic trans-European rail journeys and optimized museum schedules without burnout.',
      bookingGuidance: 'Official SNCF, Trenitalia, and Swiss Travel Pass validation procedures.',
      visaSupport: 'VFS Global / TLScontact document checklists, proof of accommodation, and flight reservations.',
      emergencyProtocol: 'Immediate guidance on European Emergency Number (112) and English-speaking SOS doctors.'
    }
  },
  {
    id: 'AST-TYO-3210',
    name: 'Kenji Sato',
    title: 'East Asia & Japan Concierge',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    destinationSpecialty: 'Japan (Tokyo, Kyoto, Osaka & Mount Fuji)',
    languages: ['English', 'Japanese', 'Mandarin'],
    experienceYears: 7,
    supportCategories: [
      'Japan eVisa & Schedule of Stay Review',
      'Shinkansen Bullet Train & Digital Suica Card',
      'Authentic Tea Ceremonies & Ryokan Stays',
      'Dietary Translation Cards (Vegan/Halal/Jain)'
    ],
    bio: 'Tokyo native Kenji assists international visitors with bullet train logistics, traditional ryokan etiquette, and Japanese customs declarations with thoughtful precision.',
    tripRef: 'SATH-TYO-3210',
    isAvailable: true,
    isHumanServiceSimulated: true,
    isAiAssistant: false,
    email: 'kenji.sato@saathi.travel',
    phone: '+81 3 5550 7192 (Tokyo Desk)',
    supportHours: '08:30 – 21:00 Japan Standard Time (JST)',
    availabilityStatus: 'In Consultation',
    rating: 4.96,
    tripsHandled: 1410,
    serviceSpecialties: {
      itineraryAssistance: 'Hyper-efficient transit routing across JR lines and Tokyo Metro networks.',
      bookingGuidance: 'Advance bookings for teamLab, Studio Ghibli, and Gion traditional dinners.',
      visaSupport: 'MOFA Japan eVisa requirements, bank statement thresholds, and Visit Japan Web QR codes.',
      emergencyProtocol: 'Tokyo English Lifeline, Japan National Tourism Organization helpline (050-3816-2720).'
    }
  },
  {
    id: 'AST-SEA-4472',
    name: 'Priya Nair',
    title: 'Southeast Asia & Island Expeditions Advisor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    destinationSpecialty: 'Singapore, Thailand, Malaysia & Indonesia',
    languages: ['English', 'Hindi', 'Malay', 'Thai'],
    experienceYears: 6,
    supportCategories: [
      'Singapore SG Arrival Card & Customs Pre-Clearance',
      'Thailand Visa Exemption & Currency Cash Rules',
      'Island Speedboat & Ferry Logistics',
      'Street Food Safaris & Halal Hawker Trails'
    ],
    bio: 'Singapore-based logistics coordinator with vast experience orchestrating smooth airport transfers, island connections, and multi-generational itineraries across Southeast Asia.',
    tripRef: 'SATH-SEA-4472',
    isAvailable: true,
    isHumanServiceSimulated: true,
    isAiAssistant: false,
    email: 'priya.nair@saathi.travel',
    phone: '+65 6700 8921 (Singapore Desk)',
    supportHours: '08:00 – 22:00 Singapore Time (SGT)',
    availabilityStatus: 'Available Now',
    rating: 4.93,
    tripsHandled: 1620,
    serviceSpecialties: {
      itineraryAssistance: 'Tropical multi-city routes connecting metropolitan Singapore with Phuket beaches.',
      bookingGuidance: 'Verified private car bookings via Grab / ComfortDelGro and authorized speedboats.',
      visaSupport: 'ICA Singapore SG Arrival Card electronic filing and Thailand 60-day visa exemption rules.',
      emergencyProtocol: 'Singapore Tourist Protection Scheme and Tourist Police Thailand (1155).'
    }
  }
];

export function matchTravelSaathi(
  destinationCountry: string,
  languagePreference?: string,
  preferAi?: boolean
): TravelAssistant {
  if (preferAi) {
    return AI_TRAVEL_ASSISTANT;
  }

  const destLower = (destinationCountry || '').toLowerCase();

  if (destLower.includes('emirates') || destLower.includes('dubai') || destLower.includes('uae') || destLower.includes('abu dhabi')) {
    return TRAVEL_ASSISTANTS[0];
  }
  if (destLower.includes('france') || destLower.includes('italy') || destLower.includes('switzerland') || destLower.includes('schengen') || destLower.includes('europe') || destLower.includes('paris') || destLower.includes('rome') || destLower.includes('zurich')) {
    return TRAVEL_ASSISTANTS[1];
  }
  if (destLower.includes('japan') || destLower.includes('tokyo') || destLower.includes('kyoto') || destLower.includes('osaka')) {
    return TRAVEL_ASSISTANTS[2];
  }
  if (destLower.includes('singapore') || destLower.includes('thailand') || destLower.includes('bangkok') || destLower.includes('malaysia') || destLower.includes('bali') || destLower.includes('indonesia')) {
    return TRAVEL_ASSISTANTS[3];
  }

  // If destination is not one of our regional human specialists, clearly return AI Travel Assistant!
  return AI_TRAVEL_ASSISTANT;
}
