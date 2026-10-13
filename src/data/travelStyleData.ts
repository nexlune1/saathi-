export type TravelStyleTier = 'budget' | 'comfort' | 'luxury';

export interface TravelStyleDefinition {
  id: TravelStyleTier;
  title: string;
  tagline: string;
  badge: string;
  colorScheme: {
    primary: string;
    light: string;
    border: string;
    accent: string;
  };
  features: {
    flights: string;
    accommodation: string;
    transportation: string;
    dining: string;
    activities: string;
  };
  dailyBaseCostUSD: number; // per person per day
  flightAverageUSD: number; // typical return flight base
}

export const TRAVEL_STYLES: Record<TravelStyleTier, TravelStyleDefinition> = {
  budget: {
    id: 'budget',
    title: 'Budget Nomad',
    tagline: 'Smart, authentic, and wallet-friendly travel without missing the magic.',
    badge: 'Best Value',
    colorScheme: {
      primary: '#102A43',
      light: '#F0F4F8',
      border: '#BCCCDC',
      accent: '#247BA0'
    },
    features: {
      flights: 'Economical economy class with value airlines or standard layovers to minimize fare.',
      accommodation: 'Charming hostels, boutique guesthouses, and clean 2–3 star hotels in well-connected areas.',
      transportation: 'Integrated public transit (metro, local buses, high-speed regional trains) with multi-day passes.',
      dining: 'Authentic street food, buzzing local hawker stalls, market food halls, and casual neighbourhood bistros.',
      activities: 'Self-guided walking tours, free museum days, scenic public viewpoints, and essential ticket passes.'
    },
    dailyBaseCostUSD: 65,
    flightAverageUSD: 380
  },
  comfort: {
    id: 'comfort',
    title: 'Comfort Explorer',
    tagline: 'Balanced journeys combining effortless convenience with restful stays.',
    badge: 'Most Popular',
    colorScheme: {
      primary: '#0B69A3',
      light: '#E6F4FA',
      border: '#7CC4E8',
      accent: '#FF8066'
    },
    features: {
      flights: 'Direct flights or optimal timings with standard advance seat selection and full checked baggage.',
      accommodation: 'Handpicked 4-star hotels, serviced apartments with breakfast, and central locations.',
      transportation: 'Convenient mix of ride-hailing (Uber/Grab), airport express shuttles, and priority express trains.',
      dining: 'Mid-range curated restaurants, traditional trattorias, popular rooftop cafes, and scenic dinner spots.',
      activities: 'Skip-the-line museum tickets, curated small-group day tours, and guided historic walking tours.'
    },
    dailyBaseCostUSD: 160,
    flightAverageUSD: 650
  },
  luxury: {
    id: 'luxury',
    title: 'Luxury Connoisseur',
    tagline: 'Uncompromising refinement, private privileges, and five-star hospitality.',
    badge: 'Premium Experience',
    colorScheme: {
      primary: '#48286A',
      light: '#F5EFFB',
      border: '#C1A1E4',
      accent: '#E09F3E'
    },
    features: {
      flights: 'Premium Economy or Business Class with lounge access, lie-flat beds, and priority boarding.',
      accommodation: 'World-renowned 5-star luxury hotels, heritage palace suites, and beach-front private villas.',
      transportation: 'Chauffeured private luxury airport transfers and dedicated vehicle services throughout the stay.',
      dining: 'Fine dining experiences, Michelin-starred tasting menus, chef’s tables, and private culinary masterclasses.',
      activities: 'Private VIP guides, exclusive after-hours museum entries, private yacht or helicopter charters.'
    },
    dailyBaseCostUSD: 420,
    flightAverageUSD: 1850
  }
};

export interface TravelStylePreferences {
  style: TravelStyleTier;
  destination: string;
  durationDays: number;
  travelersCount: number;
  currency: string;
  hotelPreference: 'hostel' | 'boutique_3star' | 'hotel_4star' | 'luxury_5star' | 'resort_villa';
  foodPreference: 'local_street' | 'casual_dining' | 'fine_dining' | 'halal' | 'pure_vegetarian' | 'vegan';
  customBudget?: number;
}

export function calculateStyleCostBreakdown(prefs: TravelStylePreferences) {
  const styleDef = TRAVEL_STYLES[prefs.style];
  const { durationDays, travelersCount } = prefs;

  // Rate multipliers
  let hotelMultiplier = 1.0;
  if (prefs.hotelPreference === 'hostel') hotelMultiplier = 0.5;
  else if (prefs.hotelPreference === 'boutique_3star') hotelMultiplier = 0.85;
  else if (prefs.hotelPreference === 'hotel_4star') hotelMultiplier = 1.25;
  else if (prefs.hotelPreference === 'luxury_5star') hotelMultiplier = 2.4;
  else if (prefs.hotelPreference === 'resort_villa') hotelMultiplier = 3.2;

  let foodMultiplier = 1.0;
  if (prefs.foodPreference === 'local_street') foodMultiplier = 0.6;
  else if (prefs.foodPreference === 'fine_dining') foodMultiplier = 2.2;

  // Base daily allocations
  const flightPerPerson = styleDef.flightAverageUSD;
  const totalFlights = flightPerPerson * travelersCount;

  const baseHotelNight = (styleDef.dailyBaseCostUSD * 0.45) * hotelMultiplier;
  // Rooms needed: roughly ceil(travelersCount / 2)
  const roomsCount = Math.ceil(travelersCount / 2);
  const totalAccommodation = Math.round(baseHotelNight * durationDays * roomsCount);

  const baseDailyFood = (styleDef.dailyBaseCostUSD * 0.28) * foodMultiplier;
  const totalFood = Math.round(baseDailyFood * durationDays * travelersCount);

  const baseDailyTransport = (styleDef.dailyBaseCostUSD * 0.14);
  const totalTransport = Math.round(baseDailyTransport * durationDays * travelersCount);

  const baseDailyActivities = (styleDef.dailyBaseCostUSD * 0.13);
  const totalActivities = Math.round(baseDailyActivities * durationDays * travelersCount);

  const visaAndInsurance = Math.round((60 + 25) * travelersCount);
  const emergencyBuffer = Math.round((totalFlights + totalAccommodation + totalFood) * 0.08);

  const grandTotalUSD = totalFlights + totalAccommodation + totalFood + totalTransport + totalActivities + visaAndInsurance + emergencyBuffer;

  // Conversion rates (rough current parity)
  const currencyRates: Record<string, number> = {
    USD: 1.0,
    INR: 83.5,
    EUR: 0.92,
    AED: 3.67,
    GBP: 0.79,
    SGD: 1.34
  };

  const rate = currencyRates[prefs.currency] || 1.0;

  return {
    grandTotalUSD,
    grandTotalConverted: Math.round(grandTotalUSD * rate),
    perPersonConverted: Math.round((grandTotalUSD / Math.max(1, travelersCount)) * rate),
    breakdown: {
      flights: Math.round(totalFlights * rate),
      accommodation: Math.round(totalAccommodation * rate),
      food: Math.round(totalFood * rate),
      transportation: Math.round(totalTransport * rate),
      activities: Math.round(totalActivities * rate),
      visaAndInsurance: Math.round(visaAndInsurance * rate),
      emergencyBuffer: Math.round(emergencyBuffer * rate)
    },
    rate,
    currency: prefs.currency
  };
}
