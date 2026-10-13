export interface TravelRuleItem {
  id: string;
  name: string;
  category: 'liquids' | 'medicines' | 'batteries' | 'electronics' | 'customs' | 'destination_bans' | 'general';
  cabinStatus: 'prohibited' | 'restricted' | 'allowed';
  checkedStatus: 'prohibited' | 'restricted' | 'allowed';
  description: string;
  detailedConditions: string;
  officialSource: {
    authority: string;
    url: string;
  };
  warningLevel: 'high' | 'medium' | 'info';
  destinationNotes?: Record<string, string>;
  airlineNotes?: Record<string, string>;
}

export interface AirlineBaggageRule {
  airlineCode: string;
  airlineName: string;
  cabinAllowance: string;
  cabinDimensions: string;
  checkedAllowance: string;
  checkedWeightEconomy: string;
  checkedWeightBusiness: string;
  excessBaggageFee: string;
  powerBankRule: string;
  liquidsRule: string;
  officialWebsite: string;
}

export interface DestinationCustomsRule {
  countryCode: string;
  countryName: string;
  dutyFreeAlcohol: string;
  dutyFreeTobacco: string;
  currencyDeclarationLimit: string;
  bannedItems: string[];
  restrictedMedications: string[];
  quarantineRules: string;
  officialCustomsUrl: string;
}

export const AIRLINE_BAGGAGE_RULES: Record<string, AirlineBaggageRule> = {
  EK: {
    airlineCode: 'EK',
    airlineName: 'Emirates',
    cabinAllowance: '1 piece up to 7 kg (Economy) / 2 pieces up to 7 kg each (Business/First)',
    cabinDimensions: '55 x 38 x 20 cm',
    checkedAllowance: '20 kg - 35 kg depending on fare brand (Special, Saver, Flex, Flex Plus)',
    checkedWeightEconomy: 'Up to 30 kg (Flex) or 2 pieces of 23 kg for Americas/Africa routes',
    checkedWeightBusiness: '40 kg (Business) / 50 kg (First Class)',
    excessBaggageFee: '$15 - $30 per kg depending on sector',
    powerBankRule: 'Must be in cabin baggage only. Maximum 100Wh per battery (up to 160Wh with airline pre-approval). Forbidden in checked baggage.',
    liquidsRule: 'Max 100ml containers in single transparent re-sealable 1-litre bag (20x20 cm).',
    officialWebsite: 'https://www.emirates.com/english/before-you-fly/baggage/'
  },
  SQ: {
    airlineCode: 'SQ',
    airlineName: 'Singapore Airlines',
    cabinAllowance: '1 piece up to 7 kg (Economy) / 2 pieces up to 7 kg each (Suites/First/Business)',
    cabinDimensions: 'Sum of length, width and height must not exceed 115 cm',
    checkedAllowance: '25 kg (Lite) to 30 kg (Standard/Flexi) for Economy',
    checkedWeightEconomy: '30 kg (Standard Economy)',
    checkedWeightBusiness: '40 kg (Business Class)',
    excessBaggageFee: 'From $8 per kg online pre-purchase',
    powerBankRule: 'Strictly carry-on only. Lithium-ion batteries >160Wh strictly prohibited on board.',
    liquidsRule: 'Standard IATA LAGs rule applies: 100ml per container in 1-litre bag.',
    officialWebsite: 'https://www.singaporeair.com/en_UK/sg/travel-info/baggage/'
  },
  QR: {
    airlineCode: 'QR',
    airlineName: 'Qatar Airways',
    cabinAllowance: '1 piece up to 7 kg (Economy) / 2 pieces up to 15 kg total (Business/First)',
    cabinDimensions: '50 x 37 x 25 cm',
    checkedAllowance: '25 kg - 35 kg for weight concept; 2 x 23 kg for piece concept',
    checkedWeightEconomy: '30 kg (Economy Classic/Convenience)',
    checkedWeightBusiness: '40 kg (Business Class)',
    excessBaggageFee: 'Tiered by zone, roughly $20-$40 per kg at airport counter',
    powerBankRule: 'Spare lithium batteries and power banks prohibited in checked luggage. Maximum 2 spare batteries per person in cabin.',
    liquidsRule: 'Liquids, aerosols and gels over 100ml will be confiscated at security screening.',
    officialWebsite: 'https://www.qatarairways.com/en/baggage.html'
  },
  AI: {
    airlineCode: 'AI',
    airlineName: 'Air India',
    cabinAllowance: '1 piece up to 8 kg (Economy) / 12 kg (Business/First)',
    cabinDimensions: '55 x 35 x 25 cm (total 115 cm)',
    checkedAllowance: '20 kg to 25 kg for international short/medium haul; 2 pieces x 23 kg for long-haul',
    checkedWeightEconomy: '23 kg per piece (or 25-30 kg weight allowance)',
    checkedWeightBusiness: '35 kg weight allowance or 2 pieces x 32 kg',
    excessBaggageFee: 'Approx ₹1,200 - ₹2,500 ($15-$30) per kg on international sectors',
    powerBankRule: 'Power banks and e-cigarettes forbidden in checked baggage by DGCA India. Cabin only.',
    liquidsRule: '100ml limit in clear ziploc bag. Spices/powders in excess of 350g may trigger additional screening.',
    officialWebsite: 'https://www.airindia.com/in/en/travel-information/baggage-guidelines.html'
  },
  BA: {
    airlineCode: 'BA',
    airlineName: 'British Airways',
    cabinAllowance: '1 cabin bag (up to 23 kg) + 1 personal handbag/laptop bag (up to 23 kg)',
    cabinDimensions: 'Cabin bag: 56 x 45 x 25 cm; Handbag: 40 x 30 x 15 cm',
    checkedAllowance: '1 x 23 kg (Economy Standard) / 2 x 32 kg (Club World Business)',
    checkedWeightEconomy: '23 kg per bag',
    checkedWeightBusiness: '32 kg per bag',
    excessBaggageFee: '£65 / $75 per overweight bag up to 32kg',
    powerBankRule: 'Lithium battery devices in hold must be completely switched off. Spare power banks strictly hand baggage only.',
    liquidsRule: 'UK/EU aviation security: liquids, pastes, gels in max 100ml bottles in clear 20x20cm bag.',
    officialWebsite: 'https://www.britishairways.com/en-gb/information/baggage-essentials'
  },
  LH: {
    airlineCode: 'LH',
    airlineName: 'Lufthansa',
    cabinAllowance: '1 piece up to 8 kg (Economy) / 2 pieces up to 8 kg each (Business)',
    cabinDimensions: '55 x 40 x 23 cm',
    checkedAllowance: '1 x 23 kg (Economy Classic) / 2 x 32 kg (Business Class)',
    checkedWeightEconomy: '23 kg per bag',
    checkedWeightBusiness: '32 kg per bag',
    excessBaggageFee: '€70 - €150 depending on intercontinental route',
    powerBankRule: 'Power banks max 100Wh strictly in cabin. Maximum 2 spare units per passenger.',
    liquidsRule: 'EU regulation: liquids must be in individual containers not exceeding 100ml each.',
    officialWebsite: 'https://www.lufthansa.com/de/en/baggage-overview'
  }
};

export const DESTINATION_CUSTOMS_RULES: Record<string, DestinationCustomsRule> = {
  'United Arab Emirates': {
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    dutyFreeAlcohol: '4 litres of alcoholic beverages or 2 cartons of beer (non-Muslim passengers over 18)',
    dutyFreeTobacco: '400 cigarettes or 50 cigars or 500 grams of tobacco',
    currencyDeclarationLimit: 'AED 60,000 (or equivalent in foreign currency/traveller cheques)',
    bannedItems: [
      'Poppy seeds (Khaskhas) - strictly zero tolerance, felony offense',
      'Electronic cigarettes and vapes without Ministry of Health approval if exceeding personal limit',
      'Pork products without proper commercial customs declaration',
      'Betel leaves (Paan) and chewing tobacco',
      'Counterfeit currency and pirated merchandise',
      'Goods made in boycotted territories'
    ],
    restrictedMedications: [
      'Tramadol, Codeine, Diazepam, Morphine require Ministry of Health & Prevention (MOHAP) online permit before arrival.',
      'Must carry original English prescription and doctor letter specifying exact dosage for maximum 30 days.'
    ],
    quarantineRules: 'Fresh food, unpasteurised dairy, and plants require agriculture certification. Pets require import permit and microchip.',
    officialCustomsUrl: 'https://www.dubaicustoms.gov.ae/en/eServices/ServicesForIndividuals/Pages/PermittedGoods.aspx'
  },
  'Singapore': {
    countryCode: 'SG',
    countryName: 'Singapore',
    dutyFreeAlcohol: 'Option of 1L spirits + 1L wine + 1L beer (or 2L wine + 1L beer, etc.) IF arriving from non-Malaysia points',
    dutyFreeTobacco: 'NO DUTY-FREE CONCESSION on any tobacco. All cigarettes must be declared and taxed at customs arrival.',
    currencyDeclarationLimit: 'SGD 20,000 (Form NP 727 must be submitted upon arrival)',
    bannedItems: [
      'Chewing gum (except oral dental/medicinal gum approved by HSA)',
      'E-cigarettes, vaporizers, heated tobacco products, shisha, imitation tobacco (S$2,000 fine)',
      'Firecrackers and toy weapons looking identical to real arms',
      'Endangered wildlife derivatives (CITES)',
      'Obscene articles and publications'
    ],
    restrictedMedications: [
      'Sleeping pills, anti-anxiety meds (e.g. Zolpidem, Alprazolam) require HSA approval if exceeding 3 months supply.',
      'Bring original doctor prescription for all daily medicines.'
    ],
    quarantineRules: 'Meat, poultry, eggs from non-approved countries strictly prohibited. Max 5kg meat per person from AVA approved countries only.',
    officialCustomsUrl: 'https://www.customs.gov.sg/businesses/importing-goods/controlled-and-prohibited-goods/'
  },
  'Japan': {
    countryCode: 'JP',
    countryName: 'Japan',
    dutyFreeAlcohol: '3 bottles of alcoholic beverages (approx 760 ml each)',
    dutyFreeTobacco: '200 cigarettes or 50 cigars or 250g tobacco for non-residents',
    currencyDeclarationLimit: '1,000,000 JPY (or equivalent in foreign currencies or gold/bullion)',
    bannedItems: [
      'Stimulant medicines containing Pseudoephedrine (e.g. Sudafed, Vicks Inhaler) strictly illegal in Japan',
      'Uncooked meat products, beef jerky, bacon, ham (Animal Quarantine Service strictly fines up to ¥3 million)',
      'Cannabis products including CBD oil unless THC-free certified',
      'Fresh fruit and vegetables without phytosanitary certificates'
    ],
    restrictedMedications: [
      'Yakkan Shoumei (import certificate) required for medical narcotics or prescription medication exceeding 1 month supply.',
      'Codeine, Dexamphetamine and Morphine strictly regulated.'
    ],
    quarantineRules: 'Strict detector dogs at Narita and Haneda airports for fresh fruits, seeds, beef jerky, and raw sausages.',
    officialCustomsUrl: 'https://www.customs.go.jp/english/summary/passenger.htm'
  },
  'France': {
    countryCode: 'FR',
    countryName: 'France (EU Schengen)',
    dutyFreeAlcohol: '4 litres of still wine, 16 litres of beer, plus 1 litre of spirits (>22% vol) OR 2 litres of fortified wine (<22%)',
    dutyFreeTobacco: '200 cigarettes OR 100 cigarillos OR 50 cigars OR 250g of smoking tobacco (for non-EU arrivals)',
    currencyDeclarationLimit: '€10,000 (must be declared to customs online or upon entry)',
    bannedItems: [
      'Counterfeit luxury branded designer goods (strict fines up to €300,000 and criminal penalties)',
      'Meat and dairy products from non-EU countries (African Swine Fever prevention)',
      'Protected flora and fauna under CITES (e.g. ivory, certain reptile leathers)'
    ],
    restrictedMedications: [
      'Personal medication must not exceed length of stay. Carry English/French translation of medical certificate for scheduled substances.',
      'Schengen Article 75 certificate needed for psychotropic medication.'
    ],
    quarantineRules: 'No meat, milk, cheese, or charcuterie permitted from outside the EU in personal luggage.',
    officialCustomsUrl: 'https://www.douane.gouv.fr/fiche/travel-coming-france'
  },
  'Thailand': {
    countryCode: 'TH',
    countryName: 'Thailand',
    dutyFreeAlcohol: '1 litre of alcoholic beverage',
    dutyFreeTobacco: '200 cigarettes or 250 grams of cigars or smoking tobacco',
    currencyDeclarationLimit: '$20,000 USD or 50,000 THB when leaving Thailand',
    bannedItems: [
      'E-cigarettes, vapes, and refill liquids (strictly illegal with heavy fines or imprisonment)',
      'Baraku and shisha tobacco',
      'Pornographic materials and obscene literature',
      'Fake goods and trademark-infringing apparel'
    ],
    restrictedMedications: [
      'Category II psychotropic substances (ADHD medications like Ritalin/Adderall) require FDA Thailand permit via online portal 14 days prior.',
      'Cannabis/weed cannot be exported or carried across international borders.'
    ],
    quarantineRules: 'Fresh fruits, soil, and live plants strictly regulated by the Department of Agriculture.',
    officialCustomsUrl: 'https://www.customs.go.th/cont_strc_simple.php?lang=en&ini_menu=menu_passenger'
  },
  'Switzerland': {
    countryCode: 'CH',
    countryName: 'Switzerland',
    dutyFreeAlcohol: '5 litres up to 18% alcohol volume, PLUS 1 litre above 18% alcohol volume (passengers age 17+)',
    dutyFreeTobacco: '250 cigarettes or cigars, or 250 grams of tobacco',
    currencyDeclarationLimit: 'No restrictions on cash imports, but customs officers can question cash over CHF 10,000',
    bannedItems: [
      'Meat and meat products from non-EU/non-EFTA countries (strictly banned)',
      'Counterfeit watches and luxury goods',
      'Weapons and self-defense sprays containing irritants like CS/CN without license'
    ],
    restrictedMedications: [
      'Prescription medicines allowed only for the passenger\'s own personal needs for a maximum of 30 days.'
    ],
    quarantineRules: 'Meat, poultry, dairy, and eggs from non-EU origins prohibited.',
    officialCustomsUrl: 'https://www.bazg.admin.ch/bazg/en/home/information-individuals/travel-and-purchases--allowances-and-duty-free-limits.html'
  }
};

export const TRAVEL_RULES_DATABASE: TravelRuleItem[] = [
  // POWER BANKS & BATTERIES
  {
    id: 'rule-powerbank',
    name: 'Power Banks & Portable Chargers',
    category: 'batteries',
    cabinStatus: 'allowed',
    checkedStatus: 'prohibited',
    description: 'Power banks must ONLY be carried in cabin baggage. Strictly prohibited in checked luggage due to lithium battery thermal runaway risk.',
    detailedConditions: 'Must not exceed 100 Watt-hours (Wh) (approx. 27,000 mAh at 3.7V). Power banks between 101Wh - 160Wh require explicit airline approval before departure. Anything over 160Wh is forbidden. Must have legible rating labels.',
    officialSource: {
      authority: 'IATA Dangerous Goods Regulations (DGR)',
      url: 'https://www.iata.org/en/programs/cargo/dgr/lithium-batteries/'
    },
    warningLevel: 'high'
  },
  {
    id: 'rule-spare-lithium',
    name: 'Spare Lithium-Ion / Lithium-Metal Batteries',
    category: 'batteries',
    cabinStatus: 'restricted',
    checkedStatus: 'prohibited',
    description: 'Spare camera, drone, or laptop batteries must be kept in carry-on bags with terminals insulated against short circuit.',
    detailedConditions: 'Terminals must be taped or stored in individual plastic pouches. Max 2 spare batteries between 100Wh - 160Wh with airline approval. Batteries fitted inside devices may go in checked luggage ONLY if device is completely powered down.',
    officialSource: {
      authority: 'ICAO Technical Instructions for Safe Transport',
      url: 'https://www.icao.int/safety/DangerousGoods/Pages/technical-instructions.aspx'
    },
    warningLevel: 'high'
  },

  // LIQUIDS, AEROSOLS & GELS (LAGS)
  {
    id: 'rule-lags-100ml',
    name: 'Liquids, Aerosols & Gels (100ml Rule)',
    category: 'liquids',
    cabinStatus: 'restricted',
    checkedStatus: 'allowed',
    description: 'Any liquid, gel, paste, cream, lotion, perfume, or aerosol carried into the aircraft cabin must follow the international LAGs policy.',
    detailedConditions: 'Each container must have a capacity of 100ml (3.4 oz) or less. All containers must fit comfortably in one transparent, re-sealable clear plastic bag with maximum capacity of 1 litre (dimensions approx. 20cm x 20cm). One bag per passenger.',
    officialSource: {
      authority: 'ICAO / TSA Aviation Security Standards',
      url: 'https://www.tsa.gov/travel/security-screening/liquids-rule'
    },
    warningLevel: 'medium'
  },
  {
    id: 'rule-perfumes-alcohol',
    name: 'Perfumes & Alcoholic Beverages',
    category: 'liquids',
    cabinStatus: 'restricted',
    checkedStatus: 'allowed',
    description: 'In cabin: only if under 100ml or purchased duty-free in airport with Security Tamper-Evident Bag (STEB) and matching receipt.',
    detailedConditions: 'In checked luggage: Alcoholic beverages with 24% to 70% ABV are limited to 5 litres per person in unopened retail packaging. Beverages over 70% ABV (140 proof) are strictly prohibited in all baggage.',
    officialSource: {
      authority: 'IATA Passenger Dangerous Goods Information',
      url: 'https://www.iata.org/en/you-and-aviation/travelers/baggage/'
    },
    warningLevel: 'medium'
  },

  // MEDICINES & PRESCRIPTIONS
  {
    id: 'rule-prescription-meds',
    name: 'Prescription Medications & Injections',
    category: 'medicines',
    cabinStatus: 'allowed',
    checkedStatus: 'allowed',
    description: 'Always carry vital daily medications in your cabin baggage to prevent issues in case of delayed checked luggage.',
    detailedConditions: 'Liquid medications exceeding 100ml are exempt from LAG rules if declared at the security checkpoint with a doctor\'s letter in English. Keep in original pharmacist packaging showing your name and prescribing physician.',
    officialSource: {
      authority: 'World Health Organization & CDC International Travel Health',
      url: 'https://wwwnc.cdc.gov/travel/page/pack-smart'
    },
    warningLevel: 'info'
  },
  {
    id: 'rule-controlled-substances',
    name: 'Controlled Substances (Codeine, ADHD, Sedatives)',
    category: 'medicines',
    cabinStatus: 'restricted',
    checkedStatus: 'restricted',
    description: 'Certain common over-the-counter and prescription meds are banned or strictly controlled in specific countries.',
    detailedConditions: 'Codeine (cough syrup/painkillers) and Tramadol require prior permit in UAE. Sudafed / Pseudoephedrine is strictly criminalized in Japan. Ritalin / Adderall requires permit in Thailand and Japan. Always check destination embassy guidelines.',
    officialSource: {
      authority: 'International Narcotics Control Board (INCB)',
      url: 'https://www.incb.org/incb/en/travellers/index.html'
    },
    warningLevel: 'high'
  },

  // ELECTRONICS & GADGETS
  {
    id: 'rule-laptops-tablets',
    name: 'Laptops, Tablets & Smart Devices',
    category: 'electronics',
    cabinStatus: 'allowed',
    checkedStatus: 'restricted',
    description: 'Recommended in carry-on bag for security screening. Must be easily accessible to place in separate screening trays.',
    detailedConditions: 'If placed in checked baggage, devices MUST be completely powered off (not in sleep or hibernation mode) and protected from unintentional activation and damage.',
    officialSource: {
      authority: 'Federal Aviation Administration (FAA) PackSafe',
      url: 'https://www.faa.gov/hazmat/packsafe'
    },
    warningLevel: 'info'
  },
  {
    id: 'rule-drones',
    name: 'Camera Drones (DJI, etc.)',
    category: 'electronics',
    cabinStatus: 'restricted',
    checkedStatus: 'restricted',
    description: 'Drone batteries must travel in cabin bag. Drone body can be in checked or cabin baggage depending on airline size limits.',
    detailedConditions: 'Many countries (UAE, India, Egypt, Thailand) require strict civil aviation registration or military import license before bringing a drone into the country. Unregistered drones are seized at customs.',
    officialSource: {
      authority: 'General Civil Aviation Authority (GCAA) / FAA',
      url: 'https://www.gcaa.gov.ae/en/pages/drones.aspx'
    },
    warningLevel: 'high'
  },

  // E-CIGARETTES & VAPES
  {
    id: 'rule-vapes',
    name: 'E-Cigarettes, Vapes & Heated Tobacco',
    category: 'destination_bans',
    cabinStatus: 'restricted',
    checkedStatus: 'prohibited',
    description: 'Prohibited in checked baggage worldwide. Strictly illegal to possess in several countries like Thailand, Singapore, and India.',
    detailedConditions: 'Where legal: carry on person or in cabin baggage only. In Thailand, carrying a vape can result in arrest, fines up to 500,000 THB, or deportation. In Singapore, on-the-spot fine of up to SGD 2,000. In India, e-cigarettes are banned under PECA 2019.',
    officialSource: {
      authority: 'Ministry of Public Health Thailand / HSA Singapore',
      url: 'https://www.hsa.gov.sg/tobacco-regulation/electronic-vaporisers'
    },
    warningLevel: 'high'
  },

  // SHARP OBJECTS & TOOLS
  {
    id: 'rule-sharp-objects',
    name: 'Scissors, Pocket Knives, Swiss Army Blades',
    category: 'general',
    cabinStatus: 'prohibited',
    checkedStatus: 'allowed',
    description: 'Any blade, pointed tool, or knife over 6cm is strictly prohibited in cabin baggage.',
    detailedConditions: 'Must be securely wrapped and packed in checked baggage. Scissors with rounded blades under 6cm may pass at some security checkpoints, but checked baggage is the safest choice.',
    officialSource: {
      authority: 'European Union Aviation Security Regulations',
      url: 'https://transport.ec.europa.eu/transport-modes/air/aviation-security_en'
    },
    warningLevel: 'high'
  },

  // CUSTOMS & MONEY
  {
    id: 'rule-currency',
    name: 'Cash Currency & Negotiable Instruments',
    category: 'customs',
    cabinStatus: 'allowed',
    checkedStatus: 'restricted',
    description: 'Never pack cash in checked bags. Be aware of mandatory international customs declaration thresholds.',
    detailedConditions: 'Most countries require travelers carrying over $10,000 USD (or equivalent: €10,000 in EU, AED 60,000 in UAE, SGD 20,000 in Singapore) in cash, traveller checks, or bearer instruments to declare it on the customs form.',
    officialSource: {
      authority: 'World Customs Organization (WCO)',
      url: 'http://www.wcoomd.org/'
    },
    warningLevel: 'medium'
  },

  // SEEDS, PLANTS, RAW FOOD
  {
    id: 'rule-food-seeds',
    name: 'Seeds, Fresh Fruits, Spices & Raw Meat',
    category: 'destination_bans',
    cabinStatus: 'restricted',
    checkedStatus: 'restricted',
    description: 'International biosecurity laws prevent the transfer of agricultural pests and diseases.',
    detailedConditions: 'Poppy seeds (Khaskhas) are banned as narcotics in UAE. Raw meat, fresh fruits, and dairy are prohibited upon entry to Japan, EU, and Australia without phytosanitary clearance. Failure to declare attracts immediate spot fines.',
    officialSource: {
      authority: 'International Plant Protection Convention (IPPC)',
      url: 'https://www.ippc.int/en/'
    },
    warningLevel: 'high'
  }
];

export const ITEMS_TO_AVOID_CHECKLIST = [
  { id: 'avoid-1', title: 'Poppy seeds (Khaskhas) in homemade spice mixes (Banned in UAE & Gulf)', category: 'Spices' },
  { id: 'avoid-2', title: 'E-cigarettes / Vapes if flying to Thailand, Singapore, or India', category: 'Gadgets' },
  { id: 'avoid-3', title: 'Power banks packed into checked suitcases (Must be in cabin bag)', category: 'Batteries' },
  { id: 'avoid-4', title: 'Over-the-counter decongestants with Pseudoephedrine when visiting Japan', category: 'Medicines' },
  { id: 'avoid-5', title: 'Liquid cosmetics / sunscreens over 100ml in your hand luggage', category: 'Liquids' },
  { id: 'avoid-6', title: 'Fresh fruits, uncooked meat, or sausages into Schengen EU / Japan', category: 'Food' },
  { id: 'avoid-7', title: 'Chewing gum when travelling to or transiting through Singapore', category: 'Confectionery' },
  { id: 'avoid-8', title: 'Unregistered drones without aviation authority prior clearances', category: 'Electronics' },
  { id: 'avoid-9', title: 'Swiss Army knives or nail cutters with long blades in handbag', category: 'Sharp Objects' },
  { id: 'avoid-10', title: 'Loose prescription pills without doctor’s prescription and original box', category: 'Medicines' }
];
