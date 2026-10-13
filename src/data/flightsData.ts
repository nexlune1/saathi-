export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  terminalDefault: string;
}

export interface AirlineInfo {
  code: string;
  name: string;
  logoText: string;
  color: string;
  aircraftTypes: string[];
}

export interface FlightOption {
  id: string;
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
  aircraftType: string;
  originAirport: Airport;
  destinationAirport: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stopsCount: number;
  stopDetails?: string;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
  priceUSD: number;
  baggageAllowance: {
    cabin: string;
    checked: string;
  };
  cancellationPolicy: {
    isRefundable: boolean;
    changeAllowed: boolean;
    termsSummary: string;
  };
  mealsIncluded: boolean;
  entertainment: boolean;
  wifiAvailable: boolean;
  seatsLeft: number;
}

export interface FlightPassenger {
  id: string;
  title: 'Mr' | 'Ms' | 'Mrs' | 'Master' | 'Dr';
  firstName: string;
  lastName: string;
  category: 'adult' | 'child' | 'infant';
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  passportIssuingCountry: string;
  seatNumber?: string;
  mealPreference?: string;
  extraBaggageKg?: number;
}

export interface InternationalTicket {
  pnr: string;
  eTicketNumber: string;
  bookingStatus: 'Confirmed' | 'e-Ticket Issued';
  issueDate: string;
  tripType: 'round_trip' | 'one_way';
  outboundFlight: FlightOption;
  returnFlight?: FlightOption;
  departureDate: string;
  returnDate?: string;
  passengers: FlightPassenger[];
  totalFareUSD: number;
  totalFareFormatted: string;
  currency: string;
  paymentMethod: string;
  terminalOutbound: string;
  gateOutbound: string;
  boardingTimeOutbound: string;
}

export const MAJOR_AIRPORTS: Airport[] = [
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj Intl', city: 'Mumbai', country: 'India', terminalDefault: 'Terminal 2' },
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India', terminalDefault: 'Terminal 3' },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', country: 'India', terminalDefault: 'Terminal 2' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates', terminalDefault: 'Terminal 3' },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', terminalDefault: 'Terminal 1' },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', terminalDefault: 'Main Terminal' },
  { code: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan', terminalDefault: 'Terminal 3' },
  { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan', terminalDefault: 'Terminal 1' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', terminalDefault: 'Terminal 2E' },
  { code: 'FCO', name: 'Leonardo da Vinci–Fiumicino Airport', city: 'Rome', country: 'Italy', terminalDefault: 'Terminal 3' },
  { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', terminalDefault: 'Terminal 2' },
  { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom', terminalDefault: 'Terminal 2' },
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States', terminalDefault: 'Terminal 4' }
];

export const AIRLINES_CATALOG: Record<string, AirlineInfo> = {
  EK: {
    code: 'EK',
    name: 'Emirates',
    logoText: 'Emirates',
    color: '#D71921',
    aircraftTypes: ['Boeing 777-300ER', 'Airbus A380-800']
  },
  SQ: {
    code: 'SQ',
    name: 'Singapore Airlines',
    logoText: 'Singapore Airlines',
    color: '#F4B41A',
    aircraftTypes: ['Airbus A350-900', 'Boeing 787-10 Dreamliner']
  },
  QR: {
    code: 'QR',
    name: 'Qatar Airways',
    logoText: 'Qatar Airways',
    color: '#5C0632',
    aircraftTypes: ['Airbus A350-1000', 'Boeing 777-300ER']
  },
  AI: {
    code: 'AI',
    name: 'Air India',
    logoText: 'Air India',
    color: '#ED1B24',
    aircraftTypes: ['Airbus A350-900', 'Boeing 787-8 Dreamliner']
  },
  AF: {
    code: 'AF',
    name: 'Air France',
    logoText: 'Air France',
    color: '#002157',
    aircraftTypes: ['Airbus A350-900', 'Boeing 777-200ER']
  },
  LH: {
    code: 'LH',
    name: 'Lufthansa',
    logoText: 'Lufthansa',
    color: '#05164D',
    aircraftTypes: ['Airbus A350-900', 'Boeing 747-8 Intercontinental']
  },
  JL: {
    code: 'JL',
    name: 'Japan Airlines',
    logoText: 'Japan Airlines',
    color: '#CC0000',
    aircraftTypes: ['Airbus A350-1000', 'Boeing 787-9 Dreamliner']
  },
  LX: {
    code: 'LX',
    name: 'SWISS International',
    logoText: 'SWISS',
    color: '#E30613',
    aircraftTypes: ['Boeing 777-300ER', 'Airbus A330-300']
  }
};

export function findAirportByCity(cityName: string): Airport {
  const norm = cityName.toLowerCase();
  const match = MAJOR_AIRPORTS.find(
    (a) => a.city.toLowerCase().includes(norm) || norm.includes(a.city.toLowerCase()) || a.name.toLowerCase().includes(norm)
  );
  if (match) return match;
  return {
    code: cityName.substring(0, 3).toUpperCase(),
    name: `${cityName} International Airport`,
    city: cityName,
    country: 'International',
    terminalDefault: 'Terminal 1'
  };
}

export function generateAvailableFlights(
  originCity: string,
  destinationCity: string,
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first' = 'economy',
  preferredTime: 'any' | 'morning' | 'afternoon' | 'evening' = 'any'
): FlightOption[] {
  const originAirport = findAirportByCity(originCity);
  const destAirport = findAirportByCity(destinationCity);

  const isUae = destAirport.city.toLowerCase().includes('dubai') || originAirport.city.toLowerCase().includes('dubai');
  const isSingapore = destAirport.city.toLowerCase().includes('singapore') || originAirport.city.toLowerCase().includes('singapore');
  const isJapan = destAirport.city.toLowerCase().includes('tokyo') || originAirport.city.toLowerCase().includes('tokyo');
  const isEurope = ['paris', 'rome', 'zurich', 'london'].some(c => destAirport.city.toLowerCase().includes(c));

  // Determine primary realistic airlines
  let primaryCodes = ['EK', 'AI', 'QR'];
  if (isSingapore) primaryCodes = ['SQ', 'AI', 'QR'];
  else if (isJapan) primaryCodes = ['JL', 'SQ', 'AI'];
  else if (isEurope) primaryCodes = ['AF', 'LH', 'LX', 'EK'];
  else if (isUae) primaryCodes = ['EK', 'AI', 'QR'];

  const multiplierMap = {
    economy: 1.0,
    premium_economy: 1.6,
    business: 3.2,
    first: 5.5
  };
  const classMultiplier = multiplierMap[cabinClass] || 1.0;

  const mockTemplates = [
    {
      airlineCode: primaryCodes[0] || 'EK',
      flightNumber: '501',
      depTime: '04:15',
      arrTime: '06:30',
      duration: '3h 45m',
      stops: 0,
      basePrice: 420,
      aircraft: 'Boeing 777-300ER',
      timeOfDay: 'morning'
    },
    {
      airlineCode: primaryCodes[1] || 'AI',
      flightNumber: '995',
      depTime: '08:40',
      arrTime: '11:10',
      duration: '3h 50m',
      stops: 0,
      basePrice: 360,
      aircraft: 'Airbus A350-900',
      timeOfDay: 'morning'
    },
    {
      airlineCode: primaryCodes[2] || 'QR',
      flightNumber: '556',
      depTime: '13:20',
      arrTime: '18:45',
      duration: '6h 55m',
      stops: 1,
      stopDetails: '1h 25m layover in Doha (DOH)',
      basePrice: 385,
      aircraft: 'Airbus A350-1000',
      timeOfDay: 'afternoon'
    },
    {
      airlineCode: primaryCodes[0] || 'EK',
      flightNumber: '509',
      depTime: '19:35',
      arrTime: '21:50',
      duration: '3h 45m',
      stops: 0,
      basePrice: 460,
      aircraft: 'Airbus A380-800',
      timeOfDay: 'evening'
    },
    {
      airlineCode: primaryCodes[3] || 'LH',
      flightNumber: '761',
      depTime: '23:10',
      arrTime: '06:15 (+1)',
      duration: '8h 35m',
      stops: 0,
      basePrice: 520,
      aircraft: 'Boeing 747-8 Intercontinental',
      timeOfDay: 'evening'
    }
  ];

  return mockTemplates
    .filter(t => preferredTime === 'any' || t.timeOfDay === preferredTime)
    .map((t, idx) => {
      const airline = AIRLINES_CATALOG[t.airlineCode] || AIRLINES_CATALOG.EK;
      const finalPriceUSD = Math.round(t.basePrice * classMultiplier);

      return {
        id: `flt-${t.airlineCode}-${t.flightNumber}-${idx}`,
        airlineCode: t.airlineCode,
        airlineName: airline.name,
        flightNumber: `${t.airlineCode} ${t.flightNumber}`,
        aircraftType: t.aircraft,
        originAirport,
        destinationAirport: destAirport,
        departureTime: t.depTime,
        arrivalTime: t.arrTime,
        duration: t.duration,
        stopsCount: t.stops,
        stopDetails: t.stopDetails,
        cabinClass,
        priceUSD: finalPriceUSD,
        baggageAllowance: {
          cabin: cabinClass === 'business' || cabinClass === 'first' ? '2 pieces (14 kg total)' : '1 piece up to 7 kg',
          checked: cabinClass === 'business' || cabinClass === 'first' ? '2 x 32 kg pieces' : '1 x 25-30 kg piece'
        },
        cancellationPolicy: {
          isRefundable: cabinClass !== 'economy' || idx % 2 === 0,
          changeAllowed: true,
          termsSummary: idx % 2 === 0
            ? 'Free cancellation & date changes up to 48 hours prior to scheduled departure.'
            : 'Changes permitted with minimal fare difference; non-refundable cancellation fee applies.'
        },
        mealsIncluded: true,
        entertainment: true,
        wifiAvailable: cabinClass !== 'economy' || t.airlineCode === 'EK' || t.airlineCode === 'SQ',
        seatsLeft: 3 + (idx * 2)
      };
    });
}
