export interface Destination {
  id: string;
  name: string;
  country: string;
  state?: string;
  continent: string;
  flag: string;
  currency: string;
  tagline: string;
  description: string;
  category: 'metropolis' | 'beach' | 'heritage' | 'nature' | 'adventure' | 'romantic';
  bestTimeToVisit: string;
  recommendedDuration: string;
  dailyBudgetUSD: number;
  dailyBudgetINR: number;
  imageUrl: string;
  attractions: string[];
  localFood: string[];
  travelTips: string[];
  vibe: string;
  nearestHub: string;
  visaSummary: string;
}

export interface Activity {
  id: string;
  period: 'morning' | 'afternoon' | 'evening';
  time: string;
  title: string;
  description: string;
  location: string;
  category: 'sightseeing' | 'food' | 'activity' | 'relaxation' | 'transit' | 'nature';
  estimatedCostUSD: number;
  estimatedCostINR: number;
  transportAdvice: string;
  imageUrl?: string;
}

export interface DayPlan {
  dayNumber: number;
  dateStr: string;
  theme: string;
  activities: Activity[];
  dailyTotalUSD: number;
  dailyTotalINR: number;
  insiderTip: string;
}

export interface BookingConfirmation {
  bookingReference: string;
  confirmedAt: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  emailSent: boolean;
  emailDispatchedAt?: string;
  specialRequests?: string;
}

export interface TripPlan {
  id: string;
  title: string;
  departureCountry: string;
  departureCity: string;
  destinationCountry: string;
  destinationCity: string;
  destination?: string;
  startDate: string;
  endDate: string;
  travellersCount: number;
  purpose: 'tourism' | 'business' | 'study' | 'family';
  totalBudgetUSD: number;
  totalBudgetINR: number;
  preferredCurrency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'SGD' | 'JPY';
  preferences: string[];
  transportMode: 'flight' | 'train' | 'bus' | 'car';
  pace: 'relaxed' | 'balanced' | 'fast-paced';
  days: DayPlan[];
  estimatedTotalUSD: number;
  estimatedTotalINR: number;
  createdAt: string;
  notes?: string;
  savedHotelIds?: string[];
  savedRestaurantIds?: string[];
  assignedAssistantId?: string;
  visaProgressStage?: number;
  bookingStatus?: 'draft' | 'confirmed';
  bookingReference?: string;
  booking?: BookingConfirmation;
}

export interface VisaStage {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface VisaRequirement {
  id: string;
  destinationCountry: string;
  countryCode: string;
  flag: string;
  passportNationality: string;
  purpose: 'tourism' | 'business' | 'study' | 'family';
  visaType: string; // e.g. "Pre-Arranged Tourist Visa" | "Visa on Arrival" | "Schengen Visa" | "eVisa"
  processingTimeline: string;
  indicativeFee: string;
  validityRequirement: string;
  officialPortal: {
    name: string;
    url: string;
    isOfficial: boolean;
  };
  steps: Array<{
    step: number;
    title: string;
    description: string;
    tips?: string;
  }>;
  requiredDocuments: string[];
  stages: VisaStage[];
  importantNotices: string[];
}

export interface DocumentVaultItem {
  id: string;
  title: string;
  category: 'passport' | 'photo' | 'visa_form' | 'flight' | 'hotel' | 'insurance' | 'financial' | 'invitation' | 'custom';
  status: 'pending' | 'uploaded' | 'reviewed' | 'needs_correction';
  required: boolean;
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  fileType?: string;
  notes?: string;
  feedback?: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  neighborhood: string;
  imageUrl: string;
  pricePerNightUSD: number;
  pricePerNightLocal: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  type: 'budget' | 'hostel' | 'boutique' | 'family' | 'luxury' | 'apartment';
  amenities: string[];
  distanceToAttraction: string;
  bookingUrl: string;
  description: string;
}

export interface Restaurant {
  id: string;
  name: string;
  city: string;
  country: string;
  neighborhood: string;
  cuisine: string;
  imageUrl: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  indicativePricePerPerson: string;
  currency: string;
  dietary: Array<'Vegetarian' | 'Vegan' | 'Halal' | 'Gluten-Free' | 'Jain Friendly'>;
  category: 'local' | 'affordable' | 'finedining' | 'streetfood' | 'vegetarian' | 'cafe';
  openingHours: string;
  menuUrl: string;
  mapUrl: string;
  isFamilyFriendly: boolean;
  description: string;
}

export interface TravelAssistant {
  id: string;
  name: string;
  title: string;
  avatar: string;
  destinationSpecialty: string;
  languages: string[];
  experienceYears: number;
  supportCategories: string[];
  bio: string;
  tripRef: string;
  isAvailable: boolean;
  isHumanServiceSimulated: boolean;
  isAiAssistant?: boolean;
  email?: string;
  phone?: string;
  supportHours?: string;
  availabilityStatus?: 'Available Now' | 'In Consultation' | '24/7 Automated Online';
  rating?: number;
  tripsHandled?: number;
  serviceSpecialties?: {
    itineraryAssistance: string;
    bookingGuidance: string;
    visaSupport: string;
    emergencyProtocol: string;
  };
}

export interface BudgetBreakdown {
  flights: number;
  accommodation: number;
  food: number;
  activities: number;
  visaInsurance: number;
  emergencyBuffer: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: 'documents' | 'clothing' | 'health' | 'electronics' | 'toiletries' | 'destination';
  completed: boolean;
}

export interface ChatAction {
  label: string;
  actionType: 'plan' | 'destination' | 'budget' | 'checklist' | 'link' | 'quick_question' | 'visa' | 'vault' | 'hotel' | 'restaurant' | 'assistant';
  payload?: string;
  url?: string;
}

export interface ChatSource {
  title: string;
  url: string;
  domain?: string;
  isOfficial?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: 'visa' | 'passport' | 'flights' | 'hotels' | 'money' | 'safety' | 'general' | 'restaurants' | 'vault';
  verifiedDate?: string;
  sources?: ChatSource[];
  actions?: ChatAction[];
  missingDetailsPrompt?: string[];
  suggestedAction?: {
    type: 'plan' | 'destination' | 'budget';
    payload: string;
  };
}
