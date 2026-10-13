import { VisaRequirement } from '../types/travel';

export const VISA_REQUIREMENTS_DATABASE: Record<string, VisaRequirement> = {
  dubai: {
    id: 'visa-dubai',
    destinationCountry: 'United Arab Emirates',
    countryCode: 'AE',
    flag: '🇦🇪',
    passportNationality: 'India',
    purpose: 'tourism',
    visaType: 'Pre-Arranged Tourist Visa (30 / 60 Days) or 14-Day Visa on Arrival',
    processingTimeline: '3 to 5 Working Days (Express available in 24 hrs)',
    indicativeFee: '~₹6,500 – ₹13,500 ($75 – $160 USD) depending on 30 vs 60 days',
    validityRequirement: 'Passport must have at least 6 months validity from intended date of entry',
    officialPortal: {
      name: 'GDRFA Dubai / Federal Authority for Identity & Citizenship (ICP)',
      url: 'https://gdrfad.gov.ae',
      isOfficial: true
    },
    steps: [
      {
        step: 1,
        title: 'Determine Eligibility & Visa Route',
        description: 'Indian passport holders with a valid US Tourist Visa/Green Card, UK Residence/Visa, or EU Schengen Visa with minimum 6 months validity can obtain a 14-Day Visa on Arrival (extendable once) at Dubai Airport. All other travellers must obtain a pre-approved 30 or 60-day tourist visa before departure.',
        tips: 'Avoid unauthorized social media agents; apply only through UAE-registered travel agencies, typing centres, or airlines like Emirates / Flydubai.'
      },
      {
        step: 2,
        title: 'Prepare Digital Documentation',
        description: 'Scan front and back bio-pages of passport in colour (minimum 300 DPI, no reflection). Prepare a digital passport-size photo with white background (80% facial coverage).',
        tips: 'Make sure your name exactly matches between flight reservation, hotel booking, and passport.'
      },
      {
        step: 3,
        title: 'Submit Application & Pay Processing Fees',
        description: 'Submit your application via the airline portal or authorized UAE GDRFA channel. Obtain an official application reference number.',
        tips: 'Verify that any prior UAE residence or tourist visa has been officially closed or cancelled in the system before applying.'
      },
      {
        step: 4,
        title: 'Receive eVisa & Complete Airline Check-in',
        description: 'Upon approval, you will receive an electronic visa PDF. Print at least two physical copies to show at origin airport immigration and Dubai arrival counters.',
        tips: 'Check with budget airlines (e.g. Air India Express, SpiceJet) if they require an "OK to Board" status update prior to departure.'
      }
    ],
    requiredDocuments: [
      'Original Passport with minimum 6 months validity from travel date',
      'High-resolution colour scan of passport first and last bio-pages',
      'Recent passport-size colour photograph on clear white background',
      'Confirmed return or onward flight reservation',
      'Proof of hotel accommodation or Emirates ID & tenancy contract of host',
      'Valid travel health insurance covering emergency medical expenses in UAE',
      'PAN card copy (for Indian tax & remittance records if applicable)'
    ],
    stages: [
      { id: 1, title: 'Requirements Reviewed', description: 'Understood visa type, 6-month validity rule, and eligibility', completed: true },
      { id: 2, title: 'Documents Being Prepared', description: 'Gathered clear passport scans, photo, flight tickets, and hotel voucher', completed: true },
      { id: 3, title: 'Documents Verified & Checked', description: 'Cross-checked name spelling, resolution, and previous visa clearance', completed: false },
      { id: 4, title: 'Application Submitted', description: 'Application filed via authorized airline or official GDRFA channel', completed: false },
      { id: 5, title: 'Biometrics / Verification', description: 'Internal immigration verification and reference number tracking', completed: false },
      { id: 6, title: 'Visa Decision Received', description: 'Official eVisa approved and printed for departure', completed: false }
    ],
    importantNotices: [
      'Overstaying a UAE visa incurs municipal fines starting at 50 AED per day; apply for extensions before visa expiry.',
      'A visa rejection may occur if an earlier visa was not cancelled, or if passport scans have glare.',
      'SAATHI provides preparation guidance; official approval is determined solely by UAE immigration authorities.'
    ]
  },

  singapore: {
    id: 'visa-singapore',
    destinationCountry: 'Singapore',
    countryCode: 'SG',
    flag: '🇸🇬',
    passportNationality: 'India',
    purpose: 'tourism',
    visaType: 'Electronic Tourist Visa (eVisa via Authorized Visa Agents)',
    processingTimeline: '3 to 5 Working Days',
    indicativeFee: '30 SGD (~₹1,900) government fee + authorized agent processing fee (~₹1,000–₹1,500)',
    validityRequirement: 'Passport must be valid for at least 6 months upon entry into Singapore',
    officialPortal: {
      name: 'Immigration & Checkpoints Authority (ICA) Singapore',
      url: 'https://www.ica.gov.sg',
      isOfficial: true
    },
    steps: [
      {
        step: 1,
        title: 'Locate an Authorized Visa Agent (AVA)',
        description: 'Individuals holding Indian travel documents cannot apply directly to the Singapore High Commission. Applications must be routed through an Authorized Visa Agent (AVA) accredited by ICA Singapore or via a Singapore citizen/PR sponsor using Singpass.',
        tips: 'Always confirm the agent is registered on the official ICA website to prevent bogus submissions.'
      },
      {
        step: 2,
        title: 'Complete Form 14A & Documentation',
        description: 'Fill out Form 14A with complete itinerary details, employment status, and local stay address in Singapore. Attach 2 passport photos (matte finish, 35x45mm, white background).',
        tips: 'Signatures on Form 14A must match the passport signature page exactly.'
      },
      {
        step: 3,
        title: 'Submit SG Arrival Card (within 3 days before trip)',
        description: 'All travellers must submit the electronic SG Arrival Card (SGAC) with health declaration within 3 days before arriving at Changi Airport. This is 100% free on the official ICA portal.',
        tips: 'Beware of scam websites charging fees for the SG Arrival Card—it is free on ica.gov.sg.'
      }
    ],
    requiredDocuments: [
      'Original Passport valid for at least 6 months with 2 blank pages',
      'Completed and signed Form 14A',
      'Two recent passport-size colour photographs (matte finish, white background)',
      'Covering letter explaining travel dates, purpose, and financial responsibility',
      'Confirmed return flight tickets',
      'Hotel reservation confirmation voucher',
      'Bank statement for past 3 to 6 months with authorized bank seal/stamp'
    ],
    stages: [
      { id: 1, title: 'Requirements Reviewed', description: 'Understood AVA agent requirement and 6-month passport validity', completed: true },
      { id: 2, title: 'Documents Being Prepared', description: 'Form 14A completed, photographs arranged to ICA specifications', completed: false },
      { id: 3, title: 'Documents Checked by Agent', description: 'Financial statements and travel itinerary reviewed', completed: false },
      { id: 4, title: 'Application Submitted on ICA', description: 'Agent lodged electronic submission on SAVE system', completed: false },
      { id: 5, title: 'SG Arrival Card Submitted', description: 'Completed free electronic SGAC health declaration', completed: false },
      { id: 6, title: 'eVisa Received & Printed', description: 'Obtained official electronic visa confirmation', completed: false }
    ],
    importantNotices: [
      'Possession of a valid visa does not guarantee entry into Singapore; final entry permission is determined by ICA officers at checkpoints.',
      'Do not pay third-party fees for SG Arrival Card (SGAC)—it is free on the official government website.'
    ]
  },

  thailand: {
    id: 'visa-thailand',
    destinationCountry: 'Thailand',
    countryCode: 'TH',
    flag: '🇹🇭',
    passportNationality: 'India',
    purpose: 'tourism',
    visaType: 'Visa Exemption / Visa on Arrival (VoA) / Official Thai e-Visa',
    processingTimeline: 'Instant on arrival or 5-7 days for pre-approved e-Visa',
    indicativeFee: 'Visa Exemption (Free) / VoA 2,000 THB (~₹4,800 INR)',
    validityRequirement: 'Passport must be valid for at least 6 months from entry date',
    officialPortal: {
      name: 'Official Thai e-Visa Portal (Ministry of Foreign Affairs)',
      url: 'https://www.thaievisa.go.th',
      isOfficial: true
    },
    steps: [
      {
        step: 1,
        title: 'Check Current Bilateral Exemption Status',
        description: 'Thailand regularly operates temporary visa-free entry exemptions (up to 30 or 60 days) for tourist arrivals from India and other key nations. If exemption is active, you simply present your passport at immigration.',
        tips: 'Always confirm exemption dates on the official Thai Embassy portal before booking.'
      },
      {
        step: 2,
        title: 'Prepare Proof of Sufficient Funds',
        description: 'Immigration regulations require travellers to carry proof of sufficient living expenses: minimum 10,000 THB per person (or 20,000 THB per family) in cash or foreign currency.',
        tips: 'Keep physical cash ready in USD or THB as airport immigration officers can conduct spot checks.'
      },
      {
        step: 3,
        title: 'Complete TM6 / Immigration Arrival Details',
        description: 'Present confirmed return air tickets departing Thailand within your permitted stay period and hotel booking confirmations.',
        tips: 'Overstaying in Thailand carries a fine of 500 THB per day up to a maximum of 20,000 THB.'
      }
    ],
    requiredDocuments: [
      'Passport with minimum 6 months validity and blank visa pages',
      'Confirmed return flight ticket within allowed stay limit',
      'Proof of accommodation (hotel bookings across your stay)',
      'Cash equivalent of at least 10,000 THB per person',
      'One passport-size photograph (4x6 cm) if taking Visa on Arrival counter route'
    ],
    stages: [
      { id: 1, title: 'Requirements Reviewed', description: 'Checked exemption status & fund rules', completed: true },
      { id: 2, title: 'Documents Being Prepared', description: 'Return flight, hotel voucher & cash buffer organized', completed: false },
      { id: 3, title: 'Documents Checked', description: 'Verified passport expiry and hotel addresses', completed: false },
      { id: 4, title: 'Boarding Clearance', description: 'Airlines verified return ticket at departure check-in', completed: false },
      { id: 5, title: 'Arrival Queue Clearance', description: 'Processed through immigration counter at BKK/HKT', completed: false },
      { id: 6, title: 'Entry Stamp Received', description: 'Verified 30/60-day entry stamp date in passport', completed: false }
    ],
    importantNotices: [
      'Always check your entry stamp immediately after immigration to know your exact required exit date.'
    ]
  },

  france: {
    id: 'visa-france',
    destinationCountry: 'France (Schengen Area)',
    countryCode: 'FR',
    flag: '🇫🇷',
    passportNationality: 'India',
    purpose: 'tourism',
    visaType: 'Uniform Schengen Short-Stay Visa (Type C - up to 90 Days)',
    processingTimeline: '15 Calendar Days standard (can take up to 30-45 days during peak season)',
    indicativeFee: '€90 EUR (~₹8,200 INR) for adults + VFS service charge (~₹2,500 INR)',
    validityRequirement: 'Passport must be issued within the last 10 years and valid for at least 3 months beyond intended departure from Schengen',
    officialPortal: {
      name: 'France-Visas (Official Portal) & VFS Global',
      url: 'https://france-visas.gouv.fr',
      isOfficial: true
    },
    steps: [
      {
        step: 1,
        title: 'Complete Application on France-Visas Portal',
        description: 'Create an account on the official France-Visas website. Fill out the application form with your travel itinerary, accommodation, and employment status. Generate your application receipt and list of required documents.',
        tips: 'Apply to France only if France is your main destination (longest duration of stay) or your first point of entry if duration is equal.'
      },
      {
        step: 2,
        title: 'Book Biometrics Appointment at VFS Global',
        description: 'Schedule an appointment at your nearest VFS Global visa application centre to submit physical documents and capture fingerprints/photographs.',
        tips: 'Book appointment slots at least 4 to 8 weeks before your travel date as slots fill up quickly.'
      },
      {
        step: 3,
        title: 'Mandatory Travel Insurance & Financial Proof',
        description: 'Obtain compliant travel health insurance covering repatriation and medical emergencies with minimum coverage of €30,000 ($33,000 USD), valid across all 29 Schengen states.',
        tips: 'Ensure 6 months of bank statements show steady salary credits, with official bank branch stamp.'
      },
      {
        step: 4,
        title: 'Attend Biometrics & Track Passport',
        description: 'Submit your dossier at VFS. Biometric data (fingerprints) is valid for 59 months for subsequent Schengen applications.',
        tips: 'Do not book non-refundable flights until the visa is issued; refundable reservations or flight itineraries are recommended.'
      }
    ],
    requiredDocuments: [
      'Original Passport (issued within 10 years, valid 3+ months past return, 2 blank pages)',
      'Completed France-Visas application form and registration receipt',
      'Two recent biometric passport photographs (35x45mm, light grey or white background)',
      'Travel health insurance covering at least €30,000 across all Schengen countries',
      'Day-by-day detailed travel itinerary with internal transport bookings (Eurostar/TGV)',
      'Confirmed hotel reservations covering all nights of the stay',
      'Last 3 years Income Tax Returns (ITR / Form 16)',
      'Last 6 months personal bank statements attested by bank with official seal',
      'Leave approval letter and employment certificate from employer / business registration'
    ],
    stages: [
      { id: 1, title: 'Requirements Reviewed', description: 'Understood 90/180 rule and main destination rule', completed: true },
      { id: 2, title: 'Form Filed on France-Visas', description: 'Completed official online form and generated checklist receipt', completed: false },
      { id: 3, title: 'VFS Appointment Booked', description: 'Slot scheduled for biometrics and submission', completed: false },
      { id: 4, title: 'Financial Dossier Compiled', description: 'Bank statements stamped, €30,000 insurance purchased', completed: false },
      { id: 5, title: 'Biometrics & Passport Lodged', description: 'Fingerprints recorded at VFS centre', completed: false },
      { id: 6, title: 'Visa Stamped & Passport Returned', description: 'Schengen sticker verified for entry dates and validity', completed: false }
    ],
    importantNotices: [
      'Schengen rules allow maximum stay of 90 days within any rolling 180-day period.',
      'Never submit fabricated hotel bookings; embassies routinely contact hotels to verify reservations.'
    ]
  },

  japan: {
    id: 'visa-japan',
    destinationCountry: 'Japan',
    countryCode: 'JP',
    flag: '🇯🇵',
    passportNationality: 'India',
    purpose: 'tourism',
    visaType: 'Short-Term Tourist eVisa or Single/Multiple Entry Sticker Visa',
    processingTimeline: '5 to 7 Working Days',
    indicativeFee: 'Approx. 3,000 JPY (~₹1,700 INR) + VFS submission fee (~₹800 INR)',
    validityRequirement: 'Passport must be valid for the duration of stay with at least 2 blank pages',
    officialPortal: {
      name: 'Ministry of Foreign Affairs of Japan (JAPAN eVISA)',
      url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html',
      isOfficial: true
    },
    steps: [
      {
        step: 1,
        title: 'Check JAPAN eVISA Eligibility',
        description: 'Indian passport holders residing in India can apply for a single-entry short-term tourist eVisa online through the JAPAN eVISA portal, or submit physical applications via VFS Japan centres.',
        tips: 'Japan requires a clear, itemized day-by-day schedule of stay (Schedule of Stay form).'
      },
      {
        step: 2,
        title: 'Prepare Schedule of Stay Form',
        description: 'Provide an activity breakdown for each day in Japan with hotel contact information and intended attractions (e.g. Tokyo, Kyoto, Osaka).',
        tips: 'The Schedule of Stay is scrutinized carefully by the Japanese Consulate; avoid generic one-line entries.'
      },
      {
        step: 3,
        title: 'Submit Financial Standing Proof',
        description: 'Submit bank statements for the past 6 months and last 1-2 years of Income Tax Returns showing sufficient funds to finance the entire trip.',
        tips: 'Japan looks for consistent financial stability rather than sudden large deposits.'
      }
    ],
    requiredDocuments: [
      'Original Passport valid for duration of stay',
      'Completed Visa Application Form with 45x45mm photograph',
      'Official Schedule of Stay Form (Day-by-day plan with hotel addresses and telephone numbers)',
      'Flight itinerary reservation',
      'Hotel booking confirmations',
      'Last 6 months bank account statements with bank verification stamp',
      'Latest Income Tax Return (ITR-V)'
    ],
    stages: [
      { id: 1, title: 'Requirements Reviewed', description: 'Selected eVisa vs VFS route and Schedule of Stay template', completed: true },
      { id: 2, title: 'Schedule of Stay Prepared', description: 'Itemized daily activities, addresses, and flight details', completed: false },
      { id: 3, title: 'Financial Proof Compiled', description: 'Stamped bank statements and ITR documents arranged', completed: false },
      { id: 4, title: 'Application Submitted', description: 'Lodged online or at VFS Japan processing counter', completed: false },
      { id: 5, title: 'Consulate Review', description: 'Application under review at the Embassy of Japan', completed: false },
      { id: 6, title: 'Visa Issued', description: 'Electronic Visa Issued / Passport returned with visa sticker', completed: false }
    ],
    importantNotices: [
      'Photographs must be strictly 45mm x 45mm taken within the last 6 months against a white background.'
    ]
  }
};
