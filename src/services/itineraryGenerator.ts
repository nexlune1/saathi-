import { DayPlan, TripPlan, Activity } from '../types/travel';
import { POPULAR_INTERNATIONAL_DESTINATIONS } from '../data/destinationsData';

interface GenerateParams {
  destinationCountry?: string;
  destinationCity: string;
  departureCountry?: string;
  departureCity: string;
  startDate: string;
  endDate: string;
  travellersCount: number;
  purpose?: 'tourism' | 'business' | 'study' | 'family';
  totalBudgetUSD?: number;
  totalBudgetINR?: number;
  preferredCurrency?: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'SGD' | 'JPY';
  preferences: string[];
  transportMode: 'flight' | 'train' | 'bus' | 'car';
  pace: 'relaxed' | 'balanced' | 'fast-paced';
}

interface ActivityTemplate {
  title: string;
  desc: string;
  loc: string;
  cat: Activity['category'];
  costUSD: number;
  costINR: number;
  transit: string;
}

const INTERNATIONAL_ACTIVITIES: Record<string, {
  morning: ActivityTemplate[];
  afternoon: ActivityTemplate[];
  evening: ActivityTemplate[];
  themes: string[];
  tips: string[];
}> = {
  dubai: {
    themes: [
      'Futuristic Architecture & Modern Wonders',
      'Old Dubai Heritage, Gold Souks & Creek Crossing',
      'Desert Safari Dunes & Starlit Bedouin Feasting',
      'Palm Jumeirah & Marina Sunset Yacht Cruise',
      'Art, Culture & Luxury Waterfront Dining'
    ],
    tips: [
      'Take the driverless Dubai Metro with a Silver Nol Card for quick air-conditioned city transit.',
      'Book Burj Khalifa At The Top tickets 2 to 3 weeks ahead for the 5:30 PM sunset slot.',
      'Dress modestly in government premises, religious sites, and traditional market alleys.',
      'Drink plenty of water and explore outdoor souks during late afternoon or evening hours.'
    ],
    morning: [
      { title: 'Burj Khalifa Sky Deck & Dubai Mall Promenade', desc: 'Ascend to the 124th & 125th observation decks for 360-degree desert and gulf views.', loc: 'Downtown Dubai', cat: 'sightseeing', costUSD: 48, costINR: 4000, transit: 'Red Line Metro to Dubai Mall Station' },
      { title: 'Al Fahidi Historical District & Traditional Abra Boat Ride', desc: 'Wander coral-stone wind-tower alleys and cross Dubai Creek on a traditional 1 AED wooden abra.', loc: 'Bur Dubai to Deira', cat: 'sightseeing', costUSD: 10, costINR: 850, transit: 'Heritage Abra boat across Dubai Creek' },
      { title: 'Museum of the Future Architectural Tour', desc: 'Step into a 77-meter toroidal stainless-steel calligraphy marvel exploring humanity in 2071.', loc: 'Sheikh Zayed Road', cat: 'sightseeing', costUSD: 40, costINR: 3350, transit: 'Metro to Emirates Towers Station' },
      { title: 'Miracle Garden Floral Sculptures Walk', desc: 'Explore the world’s largest natural flower garden featuring 150 million blooming blossoms.', loc: 'Al Barsha South', cat: 'nature', costUSD: 25, costINR: 2100, transit: 'RTA Bus #105 from Mall of the Emirates' }
    ],
    afternoon: [
      { title: 'Traditional Emirati Feast at Arabian Tea House', desc: 'Savor fragrant Machboos spiced rice, fresh flatbreads, and sweet cardamom Karak tea.', loc: 'Al Fahidi Courtyard', cat: 'food', costUSD: 28, costINR: 2350, transit: 'Short shaded walk' },
      { title: 'Palm Jumeirah Monorail & Atlantis Aquaventure', desc: 'Ride the scenic monorail to the crescent and explore marine exhibits and thrilling waterslides.', loc: 'Palm Jumeirah', cat: 'activity', costUSD: 85, costINR: 7100, transit: 'Palm Monorail from Gateway Station' },
      { title: 'Gold & Spice Souks Sensory Walk', desc: 'Bargain for aromatic saffron, pure frankincense, dates, and intricate handcrafted gold jewelry.', loc: 'Deira Souks', cat: 'activity', costUSD: 15, costINR: 1250, transit: 'Walking through market lanes' },
      { title: 'Ski Dubai Alpine Snow Park Experience', desc: 'Escape the desert heat inside a massive sub-zero indoor ski resort with live gentoo penguins.', loc: 'Mall of the Emirates', cat: 'activity', costUSD: 65, costINR: 5400, transit: 'Inside Mall of the Emirates' }
    ],
    evening: [
      { title: 'Red Dune 4x4 Desert Safari & Bedouin BBQ', desc: 'Thrilling sand dune bashing followed by camel rides, henna painting, and dinner under the stars.', loc: 'Lahbab Red Desert', cat: 'activity', costUSD: 55, costINR: 4600, transit: '4x4 safari hotel pickup transfer' },
      { title: 'Dubai Fountain Show & Waterfront Dinner', desc: 'Watch choreographed dancing fountains shoot 150 meters high accompanied by classical melodies.', loc: 'Burj Lake Boardwalk', cat: 'relaxation', costUSD: 45, costINR: 3750, transit: 'Short walk from Dubai Mall' },
      { title: 'Dubai Marina Twilight Yacht Cruise', desc: 'Glide past glittering illuminated skyscrapers and Bluewaters Island Ferris Wheel.', loc: 'Dubai Marina Yacht Club', cat: 'relaxation', costUSD: 60, costINR: 5000, transit: 'Tram to Marina Mall' }
    ]
  },

  singapore: {
    themes: [
      'Gardens by the Bay & Bayfront Splendor',
      'Heritage Quarters: Chinatown & Little India',
      'Sentosa Island & Universal Studios Fun',
      'Civic District, Colonial Splendor & River Cruise'
    ],
    tips: [
      'Submit the free online SG Arrival Card within 3 days before landing at Changi Airport.',
      'Tap your everyday contactless Visa/Mastercard on the MRT for seamless, token-free travel.',
      'Eat at UNESCO-listed hawker centres for incredible Michelin-level meals under $10 SGD.',
      'Carry a lightweight umbrella for spontaneous late afternoon tropical showers.'
    ],
    morning: [
      { title: 'Gardens by the Bay: Flower Dome & Cloud Forest', desc: 'Marvel at the indoor 35-meter mountain waterfall and thousands of rare exotic misty alpine flora.', loc: 'Marina South', cat: 'nature', costUSD: 38, costINR: 3200, transit: 'Bayfront MRT Station' },
      { title: 'Chinatown Heritage Walk & Buddha Tooth Relic Temple', desc: 'Explore historic shophouses, traditional medicinal dispensaries, and Buddhist architecture.', loc: 'Chinatown', cat: 'sightseeing', costUSD: 5, costINR: 420, transit: 'Chinatown MRT Station' },
      { title: 'Singapore Botanic Gardens (UNESCO Heritage Site)', desc: 'Stroll through 160-year-old tropical rainforest grounds and the National Orchid Garden.', loc: 'Cluny Road', cat: 'nature', costUSD: 10, costINR: 850, transit: 'Botanic Gardens MRT' }
    ],
    afternoon: [
      { title: 'Michelin Hawker Lunch at Maxwell Food Centre', desc: 'Relish legendary Tian Tian Hainanese Chicken Rice, dim sum, and fresh sugarcane juice.', loc: 'Maxwell Road', cat: 'food', costUSD: 8, costINR: 670, transit: '5 min walk from Chinatown' },
      { title: 'Universal Studios Singapore Movie Thrills', desc: 'Experience Battlestar Galactica coasters, Transformers 3D, and Jurassic Park river rapids.', loc: 'Resorts World Sentosa', cat: 'activity', costUSD: 62, costINR: 5200, transit: 'Sentosa Express Monorail from VivoCity' },
      { title: 'Kampong Glam & Haji Lane Bohemian Boutiques', desc: 'Browse quirky independent fashion boutiques and admire vibrant street graffiti murals.', loc: 'Bugis / Kampong Glam', cat: 'activity', costUSD: 15, costINR: 1250, transit: 'Bugis MRT Station' }
    ],
    evening: [
      { title: 'Supertree Grove Garden Rhapsody Light & Sound Show', desc: 'Watch towering 50-meter vertical gardens come alive with synchronized music and neon lights.', loc: 'Gardens by the Bay', cat: 'sightseeing', costUSD: 0, costINR: 0, transit: 'Evening walkway' },
      { title: 'Marina Bay Sands SkyPark Observation Deck', desc: 'Perch 57 levels above the bay with panoramic twilight views across the Singapore Strait.', loc: 'Marina Bay Sands Tower 3', cat: 'relaxation', costUSD: 24, costINR: 2000, transit: 'Bayfront MRT' },
      { title: 'Singapore River Electric Bumboat Twilight Cruise', desc: 'Cruise from Clarke Quay past historic bridges, Sir Stamford Raffles landing, and the Merlion.', loc: 'Clarke Quay Jetty', cat: 'relaxation', costUSD: 20, costINR: 1680, transit: 'Clarke Quay MRT' }
    ]
  },

  thailand: {
    themes: [
      'Golden Temples & River Chophraya Majesty',
      'Floating Markets & Street Food Revelry',
      'Phuket Tropical Turquoise Island Hopping',
      'Night Bazaars & Thai Wellness Massage'
    ],
    tips: [
      'Cover your shoulders and knees before entering temples like Wat Pho and Grand Palace.',
      'Carry 10,000 THB cash equivalent per person as spot proof of funds at airport immigration.',
      'Download the Grab app for transparent taxi and motorcycle pricing across Bangkok and Phuket.'
    ],
    morning: [
      { title: 'Grand Palace & Emerald Buddha (Wat Phra Kaew)', desc: 'Marvel at 200-year-old royal Siamese architecture and glittering golden spires.', loc: 'Old City, Bangkok', cat: 'sightseeing', costUSD: 16, costINR: 1350, transit: 'Chao Phraya Express Boat to Chang Pier' },
      { title: 'Phi Phi Islands & Maya Bay Island Cruise', desc: 'Cruise through limestone sea cliffs, snorkel crystal waters, and explore famous Maya Bay.', loc: 'Andaman Sea, Phuket', cat: 'nature', costUSD: 65, costINR: 5450, transit: 'Speedboat departure from Royal Phuket Marina' },
      { title: 'Damnoen Saduak Floating Market Tour', desc: 'Glide through narrow canals in a traditional longtail wooden boat browsing tropical fruit vendors.', loc: 'Ratchaburi Province', cat: 'activity', costUSD: 25, costINR: 2100, transit: 'Morning air-conditioned minibus transfer' }
    ],
    afternoon: [
      { title: 'Authentic Street Food Feast & Tom Yum Soup', desc: 'Sample freshly tossed Pad Thai, green papaya salad, and grilled chicken skewers.', loc: 'Chinatown / Yaowarat', cat: 'food', costUSD: 8, costINR: 670, transit: 'Walk' },
      { title: 'Wat Pho Giant Reclining Buddha & Thai Massage School', desc: 'Admire the 46-meter gold-plated reclining Buddha and experience traditional acupressure.', loc: 'Bangkok Old Town', cat: 'sightseeing', costUSD: 15, costINR: 1250, transit: 'Short tuk-tuk ride' },
      { title: 'Phuket Elephant Sanctuary Ethical Encounter', desc: 'Observe rescued elephants roaming free in lush jungle canopies and assist in preparing nutritious snacks.', loc: 'Paklok, Phuket', cat: 'nature', costUSD: 70, costINR: 5850, transit: 'Sanctuary minivan pickup' }
    ],
    evening: [
      { title: 'Asiatique The Riverfront & Night Market Stroll', desc: 'Dine alongside the Chao Phraya River, ride the giant Ferris Wheel, and shop handmade silk goods.', loc: 'Charoen Krung Road', cat: 'activity', costUSD: 20, costINR: 1680, transit: 'Free shuttle boat from Sathorn Pier' },
      { title: 'Promthep Cape Sunset Viewpoint over Andaman Sea', desc: 'Gather on the southernmost cape of Phuket island to witness the sun set over the azure horizon.', loc: 'Rawai, Phuket', cat: 'relaxation', costUSD: 0, costINR: 0, transit: 'Rental scooter or taxi' },
      { title: 'Yaowarat Chinatown Night Food Safari', desc: 'Navigate neon-lit food carts serving Michelin-lauded rolled rice noodles and mango sticky rice.', loc: 'Yaowarat Road', cat: 'food', costUSD: 12, costINR: 1000, transit: 'MRT Wat Mangkon' }
    ]
  },

  japan: {
    themes: [
      'Tokyo Modernity: Shibuya, Shinjuku & Harajuku',
      'Historic Kyoto: Thousand Torii Gates & Tea Pavilions',
      'Mount Fuji Snow Peak & Hot Spring Wellness',
      'Ancient Shrines & Culinary Ramen Hidden Gems'
    ],
    tips: [
      'Load digital Suica/Pasmo transit cards directly onto Apple/Google wallet for effortless train hopping.',
      'Book Shinkansen bullet train reserved seats in advance if travelling with oversized luggage.',
      'Tipping in Japan is not customary and will cause confusion; service charge is already included.'
    ],
    morning: [
      { title: 'Fushimi Inari Taisha Shrine Mountain Trek', desc: 'Walk under thousands of vermilion Shinto torii gates winding up the sacred cedar mountain.', loc: 'Kyoto', cat: 'sightseeing', costUSD: 0, costINR: 0, transit: 'JR Nara Line to Inari Station' },
      { title: 'Meiji Jingu Shrine & Yoyogi Forest Walk', desc: 'Enter through towering cedar torii gates into a tranquil 170-acre evergreen forest sanctuary.', loc: 'Shibuya, Tokyo', cat: 'sightseeing', costUSD: 0, costINR: 0, transit: 'JR Yamanote Line to Harajuku' },
      { title: 'Tsukiji Outer Market Fresh Seafood Breakfast', desc: 'Taste freshly blow-torched wagyu skewers, tamagoyaki sweet omelette, and fresh sea urchin.', loc: 'Chuo City, Tokyo', cat: 'food', costUSD: 22, costINR: 1850, transit: 'Oedo Subway Line to Tsukijishijo' }
    ],
    afternoon: [
      { title: 'Shibuya Sky 360-Degree Rooftop Observation Deck', desc: 'Stand on the glass corner 229 meters high gazing down at the famous Shibuya Scramble Crossing.', loc: 'Shibuya Scramble Square', cat: 'sightseeing', costUSD: 18, costINR: 1500, transit: 'Direct access from Shibuya Station' },
      { title: 'Kinkaku-ji The Golden Pavilion & Zen Rock Gardens', desc: 'Marvel at the top two floors completely covered in pure gold leaf reflecting over Kyoko-chi mirror pond.', loc: 'Northern Kyoto', cat: 'sightseeing', costUSD: 5, costINR: 420, transit: 'Kyoto City Bus #205' },
      { title: 'Arashiyama Bamboo Grove & Tenryu-ji Temple', desc: 'Stroll through towering emerald bamboo stalks whispering in the mountain breeze.', loc: 'Western Kyoto', cat: 'nature', costUSD: 6, costINR: 500, transit: 'JR San-in Line to Saga-Arashiyama' }
    ],
    evening: [
      { title: 'Shinjuku Omoide Yokocho Alleyway Dinner', desc: 'Squeeze into tiny lantern-lit izakayas for charcoal yakitori skewers and draft beer.', loc: 'Shinjuku, Tokyo', cat: 'food', costUSD: 25, costINR: 2100, transit: '2 min walk from JR Shinjuku Station' },
      { title: 'Gion Historic Geisha District Twilight Stroll', desc: 'Walk past preserved 17th-century wooden machiya merchant houses and lantern-lit stone alleys.', loc: 'Gion, Kyoto', cat: 'relaxation', costUSD: 0, costINR: 0, transit: 'Keihan Main Line to Gion-Shijo' },
      { title: 'Akihabara Electric Town Tech & Retro Arcade Night', desc: 'Immerse in retro Sega arcades, multi-level anime figures, and high-tech electronic malls.', loc: 'Chiyoda, Tokyo', cat: 'activity', costUSD: 15, costINR: 1250, transit: 'JR Akihabara Station' }
    ]
  },

  france: {
    themes: [
      'Iconic Monuments & Royal Seine Waterfront',
      'The Louvre & World-Class Impressionist Art',
      'Palace of Versailles Grandeur & Royal Gardens',
      'Bohemian Montmartre, Sacré-Cœur & French Bistros'
    ],
    tips: [
      'Book Louvre Museum time slots at least 3 weeks ahead; tickets sell out completely in peak months.',
      'Schengen rules require €30,000 emergency medical travel insurance valid across all member states.',
      'Watch out for petition scams and friendship bracelet tricks near the Sacré-Cœur steps.'
    ],
    morning: [
      { title: 'Eiffel Tower Summit Elevator & Trocadéro Panorama', desc: 'Ascend to 276 meters for panoramic views of Paris, the Seine, and the Champs-Élysées.', loc: 'Champ de Mars', cat: 'sightseeing', costUSD: 35, costINR: 2950, transit: 'Metro Line 6 to Bir-Hakeim' },
      { title: 'The Louvre Museum: Mona Lisa & Venus de Milo', desc: 'Explore the world’s largest art museum inside the former fortress palace of French kings.', loc: '1st Arrondissement', cat: 'sightseeing', costUSD: 24, costINR: 2000, transit: 'Metro Line 1 to Palais Royal - Musée du Louvre' },
      { title: 'Palace of Versailles Hall of Mirrors & Fountains', desc: 'Witness the opulent golden state apartments of Louis XIV and vast neoclassical gardens.', loc: 'Versailles', cat: 'sightseeing', costUSD: 30, costINR: 2500, transit: 'RER C train from central Paris' }
    ],
    afternoon: [
      { title: 'Traditional Bistro Lunch: Croque Monsieur & Wine', desc: 'Relax on wicker sidewalk café chairs with confit duck, frites, and artisanal café au lait.', loc: 'Saint-Germain-des-Prés', cat: 'food', costUSD: 30, costINR: 2500, transit: 'Walking stroll' },
      { title: 'Montmartre Artists Square & Sacré-Cœur Basilica', desc: 'Wander cobblestone lanes where Picasso and Van Gogh painted, reaching Paris’s highest natural point.', loc: '18th Arrondissement', cat: 'sightseeing', costUSD: 0, costINR: 0, transit: 'Metro Line 2 to Anvers' },
      { title: 'Musée d\'Orsay Impressionist Masterpieces', desc: 'Admire works by Monet, Renoir, and Van Gogh inside a magnificent converted Beaux-Arts railway station.', loc: 'Left Bank of Seine', cat: 'sightseeing', costUSD: 18, costINR: 1500, transit: 'RER C to Musée d\'Orsay' }
    ],
    evening: [
      { title: 'Seine River Illuminated Dinner Cruise', desc: 'Glide beneath romantic stone bridges as the Eiffel Tower sparkles with golden flashing lights.', loc: 'Port de la Bourdonnais', cat: 'relaxation', costUSD: 65, costINR: 5450, transit: 'Walk from Eiffel Tower' },
      { title: 'Latin Quarter Bookstore & Wine Bar Stroll', desc: 'Browse the storied shelves of Shakespeare and Company and sip Côtes du Rhône in candlelit cellars.', loc: '5th Arrondissement', cat: 'relaxation', costUSD: 25, costINR: 2100, transit: 'Metro Line 10 to Cluny - La Sorbonne' },
      { title: 'Champs-Élysées Stroll to Arc de Triomphe Sunset', desc: 'Climb the 284 steps of the Arc de Triomphe to watch 12 grand boulevards radiate into the sunset.', loc: 'Place Charles de Gaulle', cat: 'sightseeing', costUSD: 16, costINR: 1350, transit: 'Metro Line 1 to Charles de Gaulle - Étoile' }
    ]
  }
};

export function generateSmartInternationalItinerary(params: GenerateParams): TripPlan {
  const {
    destinationCountry = 'United Arab Emirates',
    destinationCity = 'Dubai',
    departureCountry = 'India',
    departureCity = 'Mumbai',
    startDate,
    endDate,
    travellersCount = 2,
    purpose = 'tourism',
    totalBudgetUSD = 2400,
    totalBudgetINR = 200000,
    preferredCurrency = 'USD',
    preferences = ['culture', 'sightseeing'],
    transportMode = 'flight',
    pace = 'balanced'
  } = params;

  // Calculate duration
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) + 1;
  const daysCount = Math.min(Math.max(diffDays, 2), 7);

  // Match key
  const destLower = (destinationCity + ' ' + destinationCountry).toLowerCase();
  let matchedKey = 'dubai';
  for (const k of Object.keys(INTERNATIONAL_ACTIVITIES)) {
    if (destLower.includes(k)) {
      matchedKey = k;
      break;
    }
  }

  const pool = INTERNATIONAL_ACTIVITIES[matchedKey] || INTERNATIONAL_ACTIVITIES.dubai;
  const matchedDest = POPULAR_INTERNATIONAL_DESTINATIONS.find(d => d.id === matchedKey) || POPULAR_INTERNATIONAL_DESTINATIONS[0];

  const generatedDays: DayPlan[] = [];
  let cumulativeActivityUSD = 0;
  let cumulativeActivityINR = 0;

  for (let d = 0; d < daysCount; d++) {
    const dayDate = new Date(start);
    dayDate.setDate(dayDate.getDate() + d);
    const dateFormatted = dayDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const theme = pool.themes[d % pool.themes.length] || `Day ${d + 1}: Discovering ${matchedDest.name}`;
    const tip = pool.tips[d % pool.tips.length] || 'Keep passport photocopies handy and store digital copies in your SAATHI Document Vault.';

    const m = pool.morning[d % pool.morning.length];
    const a = pool.afternoon[d % pool.afternoon.length];
    const e = pool.evening[d % pool.evening.length];

    const mUSD = m.costUSD * travellersCount;
    const aUSD = a.costUSD * travellersCount;
    const eUSD = e.costUSD * travellersCount;
    const dayTotalUSD = mUSD + aUSD + eUSD;
    const dayTotalINR = Math.round(dayTotalUSD * 84);

    cumulativeActivityUSD += dayTotalUSD;
    cumulativeActivityINR += dayTotalINR;

    const activities: Activity[] = [
      {
        id: `act-${d}-1`,
        period: 'morning',
        time: pace === 'relaxed' ? '09:30 AM' : '08:30 AM',
        title: m.title,
        description: m.desc,
        location: m.loc,
        category: m.cat,
        estimatedCostUSD: mUSD,
        estimatedCostINR: Math.round(mUSD * 84),
        transportAdvice: m.transit
      },
      {
        id: `act-${d}-2`,
        period: 'afternoon',
        time: '01:00 PM',
        title: a.title,
        description: a.desc,
        location: a.loc,
        category: a.cat,
        estimatedCostUSD: aUSD,
        estimatedCostINR: Math.round(aUSD * 84),
        transportAdvice: a.transit
      },
      {
        id: `act-${d}-3`,
        period: 'evening',
        time: pace === 'fast-paced' ? '05:30 PM' : '06:30 PM',
        title: e.title,
        description: e.desc,
        location: e.loc,
        category: e.cat,
        estimatedCostUSD: eUSD,
        estimatedCostINR: Math.round(eUSD * 84),
        transportAdvice: e.transit
      }
    ];

    generatedDays.push({
      dayNumber: d + 1,
      dateStr: dateFormatted,
      theme,
      activities,
      dailyTotalUSD: dayTotalUSD,
      dailyTotalINR: dayTotalINR,
      insiderTip: tip
    });
  }

  // Realistic flights and hotel calculation
  const flightPerPersonUSD = matchedKey === 'dubai' ? 320 : matchedKey === 'singapore' || matchedKey === 'thailand' ? 380 : 750;
  const flightTotalUSD = flightPerPersonUSD * travellersCount;
  const hotelPerNightUSD = matchedDest.dailyBudgetUSD * 0.7;
  const roomsCount = Math.ceil(travellersCount / 2);
  const hotelTotalUSD = Math.round(hotelPerNightUSD * roomsCount * (daysCount - 1));
  const estimatedTotalUSD = cumulativeActivityUSD + flightTotalUSD + hotelTotalUSD;
  const estimatedTotalINR = Math.round(estimatedTotalUSD * 84);

  return {
    id: `trip-saathi-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: `${daysCount}-Day ${matchedDest.name} International Journey`,
    departureCountry,
    departureCity,
    destinationCountry: matchedDest.country,
    destinationCity: matchedDest.name,
    destination: matchedDest.name,
    startDate,
    endDate,
    travellersCount,
    purpose,
    totalBudgetUSD,
    totalBudgetINR,
    preferredCurrency,
    preferences,
    transportMode,
    pace,
    days: generatedDays,
    estimatedTotalUSD,
    estimatedTotalINR,
    createdAt: new Date().toISOString(),
    assignedAssistantId: matchedKey === 'dubai' ? 'saathi-uae' : matchedKey === 'japan' ? 'saathi-asia' : matchedKey === 'singapore' || matchedKey === 'thailand' ? 'saathi-sea' : 'saathi-eu',
    visaProgressStage: 2
  };
}

export const generateSmartItinerary = (params: any): TripPlan => {
  const destName = params.destination || params.destinationCity || 'Dubai';
  return generateSmartInternationalItinerary({
    destinationCity: destName,
    destinationCountry: params.destinationCountry || (destName.toLowerCase().includes('dubai') ? 'United Arab Emirates' : destName.toLowerCase().includes('singapore') ? 'Singapore' : destName.toLowerCase().includes('paris') ? 'France' : 'International'),
    departureCity: params.departureCity || 'Mumbai',
    departureCountry: params.departureCountry || 'India',
    startDate: params.startDate || new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    endDate: params.endDate || new Date(Date.now() + 8 * 86400000).toISOString().split('T')[0],
    travellersCount: params.travellersCount || 2,
    purpose: params.purpose || 'tourism',
    totalBudgetINR: params.totalBudgetINR || 180000,
    totalBudgetUSD: params.totalBudgetUSD || Math.round((params.totalBudgetINR || 180000) / 84),
    preferredCurrency: params.preferredCurrency || 'USD',
    preferences: params.preferences || ['sightseeing', 'culture'],
    transportMode: params.transportMode || 'flight',
    pace: params.pace || 'balanced'
  });
};

