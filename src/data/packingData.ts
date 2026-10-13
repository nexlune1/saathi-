import { ChecklistItem } from '../types/travel';

export const DEFAULT_PACKING_ITEMS: ChecklistItem[] = [
  // Documents
  { id: 'doc-1', text: 'Government Photo ID / Aadhaar Card / Passport', category: 'documents', completed: true },
  { id: 'doc-2', text: 'Confirmed Flight / Train / Bus e-Tickets', category: 'documents', completed: true },
  { id: 'doc-3', text: 'Hotel / Homestay confirmation vouchers & contact', category: 'documents', completed: false },
  { id: 'doc-4', text: 'Emergency cash in INR (₹3,000–₹5,000 in smaller notes)', category: 'documents', completed: true },
  { id: 'doc-5', text: 'Travel insurance copy & emergency contact card', category: 'documents', completed: false },

  // Clothing
  { id: 'cloth-1', text: 'Light breathable cotton/linen outfits (3-4 sets)', category: 'clothing', completed: false },
  { id: 'cloth-2', text: 'Comfortable walking sneakers / trekking shoes', category: 'clothing', completed: true },
  { id: 'cloth-3', text: 'Warm fleece layer / light jacket for evening chills', category: 'clothing', completed: false },
  { id: 'cloth-4', text: 'Quick-dry socks & extra undergarments', category: 'clothing', completed: false },
  { id: 'cloth-5', text: 'Sunglasses with UV protection & wide sun hat', category: 'clothing', completed: false },

  // Health & Medical
  { id: 'health-1', text: 'Personal daily prescribed medications (with prescription)', category: 'health', completed: true },
  { id: 'health-2', text: 'First-aid essentials: Band-aids, antiseptic cream, pain relievers', category: 'health', completed: false },
  { id: 'health-3', text: 'Motion sickness pills (especially for hill stations)', category: 'health', completed: false },
  { id: 'health-4', text: 'ORS hydration sachets & antacids', category: 'health', completed: false },
  { id: 'health-5', text: 'Mosquito repellent lotion / spray', category: 'health', completed: false },

  // Electronics
  { id: 'tech-1', text: 'High-capacity Power Bank (10,000mAh or 20,000mAh)', category: 'electronics', completed: true },
  { id: 'tech-2', text: 'Smartphone fast chargers & backup charging cables', category: 'electronics', completed: true },
  { id: 'tech-3', text: 'Earphones / Noise-cancelling headphones for transit', category: 'electronics', completed: false },
  { id: 'tech-4', text: 'Universal plug adapter (if needed)', category: 'electronics', completed: false },

  // Toiletries
  { id: 'toil-1', text: 'Broad-spectrum Sunscreen SPF 50+ (PA+++)', category: 'toiletries', completed: false },
  { id: 'toil-2', text: 'Travel-size toothbrush, toothpaste & dental floss', category: 'toiletries', completed: true },
  { id: 'toil-3', text: 'Hand sanitizer & biodegradable wet wipes', category: 'toiletries', completed: true },
  { id: 'toil-4', text: 'Hydrating lip balm & moisturizer', category: 'toiletries', completed: false },

  // Destination Specific
  { id: 'dest-1', text: 'Reusable insulated water bottle (stay hydrated & reduce plastic)', category: 'destination', completed: true },
  { id: 'dest-2', text: 'Compact waterproof pouch for phone & valuables', category: 'destination', completed: false },
  { id: 'dest-3', text: 'Lightweight daypack (15-20L) for day excursions', category: 'destination', completed: false }
];
