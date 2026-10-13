import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { DestinationDiscovery } from './components/DestinationDiscovery';
import { HowItWorksSection } from './components/HowItWorksSection';
import { VisaAssistant } from './components/VisaAssistant';
import { DocumentVault } from './components/DocumentVault';
import { HotelFinder } from './components/HotelFinder';
import { RestaurantFinder } from './components/RestaurantFinder';
import { MyTravelSaathi } from './components/MyTravelSaathi';
import { TripPlanner } from './components/TripPlanner';
import { BudgetPlanner } from './components/BudgetPlanner';
import { MyTripsDashboard } from './components/MyTripsDashboard';
import { TravelEssentials } from './components/TravelEssentials';
import { TravelChatbot } from './components/TravelChatbot';
import { DestinationModal } from './components/DestinationModal';
import { ItineraryViewModal } from './components/ItineraryViewModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { Destination, TripPlan, ChecklistItem, Hotel, Restaurant } from './types/travel';
import { DEFAULT_PACKING_ITEMS } from './data/packingData';
import { POPULAR_DESTINATIONS } from './data/destinationsData';
import { generateSmartItinerary } from './services/itineraryGenerator';

// Seed international trip for instant presentation value
const SEED_TRIP: TripPlan = generateSmartItinerary({
  destination: 'Dubai',
  destinationCountry: 'United Arab Emirates',
  departureCity: 'Mumbai',
  departureCountry: 'India',
  startDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
  endDate: new Date(Date.now() + 19 * 86400000).toISOString().split('T')[0],
  travellersCount: 2,
  totalBudgetUSD: 2400,
  totalBudgetINR: 200000,
  preferences: ['sightseeing', 'culture', 'relaxation'],
  transportMode: 'flight',
  pace: 'balanced'
});
SEED_TRIP.notes = 'Pre-arranged 30-day tourist eVisa verified with ICP UAE. Burj Khalifa 124th-floor tickets booked for sunset slot (5:30 PM). Stored digital passports in SAATHI Vault.';
SEED_TRIP.bookingStatus = 'confirmed';
SEED_TRIP.bookingReference = 'SATHI-BK-94821';
SEED_TRIP.booking = {
  bookingReference: 'SATHI-BK-94821',
  confirmedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  guestName: 'Mansi Kachare',
  guestEmail: 'mansikachare66@gmail.com',
  guestPhone: '+91 98201 54321',
  emailSent: true,
  emailDispatchedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  specialRequests: 'Vegetarian meals preferred, airport fast-track arrival assistance'
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isSaathiChatOpen, setIsSaathiChatOpen] = useState(false);

  // Sub-module routing state
  const [selectedVisaCountry, setSelectedVisaCountry] = useState<string>('dubai');
  const [selectedVaultDestination, setSelectedVaultDestination] = useState<string>('Dubai, United Arab Emirates');
  const [assignedCompanionCountry, setAssignedCompanionCountry] = useState<string>('United Arab Emirates');

  // Saved Hotels & Restaurants
  const [savedHotelIds, setSavedHotelIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('saathi_saved_hotels');
      return stored ? JSON.parse(stored) : ['hotel-dxb-1', 'hotel-sin-1'];
    } catch {
      return ['hotel-dxb-1', 'hotel-sin-1'];
    }
  });

  const [savedRestaurantIds, setSavedRestaurantIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('saathi_saved_restaurants');
      return stored ? JSON.parse(stored) : ['rest-dxb-1', 'rest-sin-1'];
    } catch {
      return ['rest-dxb-1', 'rest-sin-1'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('saathi_saved_hotels', JSON.stringify(savedHotelIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedHotelIds]);

  useEffect(() => {
    try {
      localStorage.setItem('saathi_saved_restaurants', JSON.stringify(savedRestaurantIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedRestaurantIds]);

  // Persistent Saved Trips
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>(() => {
    try {
      const stored = localStorage.getItem('saathi_saved_trips');
      if (stored) {
        return JSON.parse(stored);
      }
      return [SEED_TRIP];
    } catch {
      return [SEED_TRIP];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('saathi_saved_trips', JSON.stringify(savedTrips));
    } catch (e) {
      console.error('Failed to save trips to local storage', e);
    }
  }, [savedTrips]);

  // Persistent Packing Checklist
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(() => {
    try {
      const stored = localStorage.getItem('saathi_checklist');
      if (stored) {
        return JSON.parse(stored);
      }
      return DEFAULT_PACKING_ITEMS;
    } catch {
      return DEFAULT_PACKING_ITEMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('saathi_checklist', JSON.stringify(checklistItems));
    } catch (e) {
      console.error('Failed to save checklist to local storage', e);
    }
  }, [checklistItems]);

  // Planner pre-fill parameters
  const [plannerParams, setPlannerParams] = useState<any>({
    destination: 'Dubai',
    departureCity: 'Mumbai',
    departureCountry: 'India',
    destinationCountry: 'United Arab Emirates',
    startDate: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
    travellersCount: 2,
    totalBudgetINR: 180000,
    totalBudgetUSD: 2150
  });

  // Active trip for Budget Planner
  const [activeBudgetTrip, setActiveBudgetTrip] = useState<TripPlan | null>(savedTrips[0] || null);

  // Modals
  const [activeDestinationModal, setActiveDestinationModal] = useState<Destination | null>(null);
  const [activeItineraryModal, setActiveItineraryModal] = useState<TripPlan | null>(null);
  const [bookingTripModal, setBookingTripModal] = useState<TripPlan | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Toast dispatch helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation handlers
  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick Plan from Hero
  const handleHeroPlanTrip = (params: any) => {
    setPlannerParams(params);
    setCurrentTab('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded ${params.destinationCity || params.destination || 'journey'} into your trip planner!`, 'success');
  };

  // Hero -> Visa Assistant
  const handleHeroOpenVisa = (countryKey: string) => {
    setSelectedVisaCountry(countryKey);
    setCurrentTab('visa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Destination Card -> Plan Journey
  const handlePlanDestination = (destName: string) => {
    setPlannerParams((prev: any) => ({
      ...prev,
      destination: destName,
      destinationCity: destName
    }));
    setCurrentTab('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Ready to plan your international trip to ${destName}!`, 'info');
  };

  // Save Trip from Planner
  const handleSaveTrip = (trip: TripPlan) => {
    setSavedTrips((prev) => {
      const exists = prev.some((t) => t.id === trip.id);
      if (exists) {
        return prev.map((t) => (t.id === trip.id ? trip : t));
      }
      return [trip, ...prev];
    });
    showToast(`Trip to ${trip.destination || trip.destinationCity} saved to My Trips!`, 'success');
  };

  // Open Booking & Confirmation Modal
  const handleOpenBookingModal = (trip: TripPlan) => {
    setBookingTripModal(trip);
    setIsBookingModalOpen(true);
  };

  // Handle Booking Confirmed & Email Dispatched
  const handleBookingConfirmed = (updatedTrip: TripPlan, emailReceipt: any) => {
    setSavedTrips((prev) => {
      const exists = prev.some((t) => t.id === updatedTrip.id);
      if (exists) {
        return prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t));
      }
      return [updatedTrip, ...prev];
    });

    setBookingTripModal(updatedTrip);

    if (activeItineraryModal && activeItineraryModal.id === updatedTrip.id) {
      setActiveItineraryModal(updatedTrip);
    }
  };

  // Delete Trip
  const handleDeleteTrip = (tripId: string) => {
    setSavedTrips((prev) => prev.filter((t) => t.id !== tripId));
  };

  // Update Trip Notes
  const handleUpdateNotes = (tripId: string, notes: string) => {
    setSavedTrips((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, notes } : t))
    );
  };

  // Open Trip in Budget Planner
  const handleOpenBudget = (trip: TripPlan) => {
    setActiveBudgetTrip(trip);
    setCurrentTab('budget');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded expenses for ${trip.destination || trip.destinationCity} into Budget Planner!`, 'info');
  };

  // Hotel Bookmark handler
  const handleSaveHotel = (hotel: Hotel) => {
    setSavedHotelIds((prev) => {
      const isSaved = prev.includes(hotel.id);
      if (isSaved) {
        showToast(`Removed ${hotel.name} from saved hotels`, 'info');
        return prev.filter((id) => id !== hotel.id);
      } else {
        showToast(`Saved ${hotel.name} to your travel list!`, 'success');
        return [...prev, hotel.id];
      }
    });
  };

  // Restaurant Bookmark handler
  const handleSaveRestaurant = (restaurant: Restaurant) => {
    setSavedRestaurantIds((prev) => {
      const isSaved = prev.includes(restaurant.id);
      if (isSaved) {
        showToast(`Removed ${restaurant.name} from saved dining`, 'info');
        return prev.filter((id) => id !== restaurant.id);
      } else {
        showToast(`Saved ${restaurant.name} to your dining itinerary!`, 'success');
        return [...prev, restaurant.id];
      }
    });
  };

  // Chatbot suggested action handler
  const handleChatbotAction = (actionType: string, payload?: string, url?: string) => {
    if (actionType === 'plan') {
      if (payload) {
        handlePlanDestination(payload);
      } else {
        setCurrentTab('plan');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (actionType === 'visa') {
      if (payload) setSelectedVisaCountry(payload);
      setCurrentTab('visa');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (actionType === 'vault') {
      if (payload) setSelectedVaultDestination(payload);
      setCurrentTab('vault');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (actionType === 'hotel') {
      setCurrentTab('hotels');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (actionType === 'restaurant') {
      setCurrentTab('restaurants');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (actionType === 'assistant') {
      if (payload) setAssignedCompanionCountry(payload);
      setCurrentTab('assistant');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (actionType === 'budget') {
      setCurrentTab('budget');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (actionType === 'checklist') {
      setCurrentTab('essentials');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Opened Travel Essentials & Document Checklist', 'info');
    } else if (actionType === 'destination') {
      const dest = POPULAR_DESTINATIONS.find((d) => d.id === (payload || '').toLowerCase());
      if (dest) {
        setActiveDestinationModal(dest);
      } else {
        setCurrentTab('explore');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (actionType === 'link' && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Checklist Handlers
  const handleToggleChecklistItem = (id: string) => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleAddChecklistItem = (item: ChecklistItem) => {
    setChecklistItems((prev) => [item, ...prev]);
  };

  const handleDeleteChecklistItem = (id: string) => {
    setChecklistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetChecklistDefaults = () => {
    setChecklistItems(DEFAULT_PACKING_ITEMS);
  };

  const totalSavedCount = savedTrips.length + savedHotelIds.length + savedRestaurantIds.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#102A43]">
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        savedItemsCount={totalSavedCount}
        onOpenSaathi={() => setIsSaathiChatOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: HOME (Landing Showcase) */}
        {currentTab === 'home' && (
          <div>
            <HeroSection
              onPlanTrip={handleHeroPlanTrip}
              onExploreClick={() => handleNavigate('explore')}
              onOpenVisaAssistant={handleHeroOpenVisa}
            />
            <ProblemSolutionSection />
            <DestinationDiscovery
              onSelectDestination={(dest) => setActiveDestinationModal(dest)}
              onPlanDestination={handlePlanDestination}
            />
            <HowItWorksSection
              onStartPlanning={() => handleNavigate('plan')}
            />
          </div>
        )}

        {/* VIEW 2: EXPLORE (Destinations Discovery) */}
        {currentTab === 'explore' && (
          <DestinationDiscovery
            onSelectDestination={(dest) => setActiveDestinationModal(dest)}
            onPlanDestination={handlePlanDestination}
          />
        )}

        {/* VIEW 3: VISA ASSISTANT (6-Stage Interactive Visa Workflow) */}
        {currentTab === 'visa' && (
          <VisaAssistant
            initialCountry={selectedVisaCountry}
            onOpenVault={(countryKey) => {
              setSelectedVaultDestination(countryKey);
              setCurrentTab('vault');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAskQuestion={(q) => {
              setIsSaathiChatOpen(true);
            }}
          />
        )}

        {/* VIEW 4: DOCUMENT VAULT (Pre-flight Document Readiness Checker) */}
        {currentTab === 'vault' && (
          <DocumentVault
            selectedDestination={selectedVaultDestination}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 5: INTERNATIONAL HOTELS */}
        {currentTab === 'hotels' && (
          <HotelFinder
            onSaveHotel={handleSaveHotel}
            savedHotelIds={savedHotelIds}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 6: INTERNATIONAL RESTAURANTS & DINING */}
        {currentTab === 'restaurants' && (
          <RestaurantFinder
            onSaveRestaurant={handleSaveRestaurant}
            savedRestaurantIds={savedRestaurantIds}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 7: MY TRAVEL SAATHI (Personal Concierge & Regional Specialist) */}
        {currentTab === 'assistant' && (
          <MyTravelSaathi
            destinationCountry={assignedCompanionCountry}
            onOpenVisaAssistant={() => {
              setCurrentTab('visa');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenVault={() => {
              setCurrentTab('vault');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 8: PLAN (Smart International Itinerary Planner) */}
        {currentTab === 'plan' && (
          <TripPlanner
            initialParams={plannerParams}
            onSaveTrip={handleSaveTrip}
            onBookTrip={handleOpenBookingModal}
            onOpenBudget={handleOpenBudget}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 9: BUDGET (Multi-Currency Financial Cockpit) */}
        {currentTab === 'budget' && (
          <BudgetPlanner
            initialTripPlan={activeBudgetTrip}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 10: MY JOURNEY (Saved Itineraries & Bookmarks Vault) */}
        {currentTab === 'trips' && (
          <MyTripsDashboard
            trips={savedTrips}
            onViewItinerary={(trip) => setActiveItineraryModal(trip)}
            onBookTrip={handleOpenBookingModal}
            onOpenBudget={handleOpenBudget}
            onDeleteTrip={handleDeleteTrip}
            onUpdateNotes={handleUpdateNotes}
            onStartNewTrip={() => handleNavigate('plan')}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 11: ESSENTIALS (Packing Checklist) */}
        {currentTab === 'essentials' && (
          <TravelEssentials
            items={checklistItems}
            onToggleItem={handleToggleChecklistItem}
            onAddItem={handleAddChecklistItem}
            onDeleteItem={handleDeleteChecklistItem}
            onResetDefaults={handleResetChecklistDefaults}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* In-depth Destination Modal Guide */}
      <DestinationModal
        destination={activeDestinationModal}
        onClose={() => setActiveDestinationModal(null)}
        onPlanDestination={handlePlanDestination}
      />

      {/* In-depth Full Itinerary Modal */}
      <ItineraryViewModal
        trip={activeItineraryModal}
        onClose={() => setActiveItineraryModal(null)}
        onBookTrip={handleOpenBookingModal}
        onOpenBudget={handleOpenBudget}
        onShowToast={showToast}
      />

      {/* Official Booking Confirmation & Email Modal */}
      <BookingConfirmationModal
        isOpen={isBookingModalOpen}
        trip={bookingTripModal}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingConfirmed={handleBookingConfirmed}
        onShowToast={showToast}
      />

      {/* Floating Travel Assistant Chatbot */}
      <TravelChatbot
        onActionTrigger={handleChatbotAction}
        isOpenControlled={isSaathiChatOpen}
        onToggleOpen={setIsSaathiChatOpen}
      />

      {/* Platform Editorial Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSaathi={() => setIsSaathiChatOpen(true)}
      />
    </div>
  );
}
