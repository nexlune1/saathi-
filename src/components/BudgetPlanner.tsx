import React, { useState, useEffect } from 'react';
import {
  IndianRupee,
  Plane,
  Home,
  Utensils,
  Camera,
  ShieldAlert,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Percent,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { TripPlan, BudgetBreakdown } from '../types/travel';

interface BudgetPlannerProps {
  initialTripPlan?: TripPlan | null;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const BudgetPlanner: React.FC<BudgetPlannerProps> = ({
  initialTripPlan,
  onShowToast
}) => {
  // Budget State in INR
  const [totalBudget, setTotalBudget] = useState<number>(initialTripPlan?.totalBudgetINR || 25000);

  // Categories
  const [transportation, setTransportation] = useState<number>(
    initialTripPlan ? Math.round(initialTripPlan.totalBudgetINR * 0.28) : 7000
  );
  const [accommodation, setAccommodation] = useState<number>(
    initialTripPlan ? Math.round(initialTripPlan.totalBudgetINR * 0.32) : 8000
  );
  const [food, setFood] = useState<number>(
    initialTripPlan ? Math.round(initialTripPlan.totalBudgetINR * 0.2) : 5000
  );
  const [activities, setActivities] = useState<number>(
    initialTripPlan ? Math.round(initialTripPlan.totalBudgetINR * 0.12) : 3000
  );
  const [emergency, setEmergency] = useState<number>(
    initialTripPlan ? Math.round(initialTripPlan.totalBudgetINR * 0.08) : 2000
  );

  // Custom expenses list
  const [customItems, setCustomItems] = useState<Array<{ id: string; name: string; amount: number }>>([]);
  const [newCustomName, setNewCustomName] = useState('');
  const [newCustomAmount, setNewCustomAmount] = useState('');

  // Update when initialTripPlan changes
  useEffect(() => {
    if (initialTripPlan) {
      setTotalBudget(initialTripPlan.totalBudgetINR);
      const b = initialTripPlan.totalBudgetINR;
      setTransportation(Math.round(b * 0.28));
      setAccommodation(Math.round(b * 0.32));
      setFood(Math.round(b * 0.2));
      setActivities(Math.round(b * 0.12));
      setEmergency(Math.round(b * 0.08));
    }
  }, [initialTripPlan]);

  // Total Custom Expenses
  const customTotal = customItems.reduce((acc, curr) => acc + curr.amount, 0);

  // Total Estimated Expenses
  const totalExpenses = transportation + accommodation + food + activities + emergency + customTotal;
  const remainingBalance = totalBudget - totalExpenses;
  const isOverBudget = remainingBalance < 0;
  const percentUsed = Math.min(100, Math.round((totalExpenses / Math.max(1, totalBudget)) * 100));

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomName.trim()) {
      onShowToast('Please enter an expense name', 'error');
      return;
    }
    const amt = Number(newCustomAmount);
    if (isNaN(amt) || amt <= 0) {
      onShowToast('Please enter a valid amount in rupees', 'error');
      return;
    }

    const item = {
      id: `custom-${Date.now()}`,
      name: newCustomName.trim(),
      amount: amt
    };
    setCustomItems([...customItems, item]);
    setNewCustomName('');
    setNewCustomAmount('');
    onShowToast(`Added "${item.name}" (₹${amt.toLocaleString('en-IN')})`, 'success');
  };

  const handleDeleteCustom = (id: string) => {
    setCustomItems(customItems.filter((item) => item.id !== id));
    onShowToast('Expense item removed', 'info');
  };

  const handleAutoRebalance = () => {
    // 30% stay, 25% transit, 20% food, 15% activities, 10% emergency
    setTransportation(Math.round(totalBudget * 0.25));
    setAccommodation(Math.round(totalBudget * 0.30));
    setFood(Math.round(totalBudget * 0.20));
    setActivities(Math.round(totalBudget * 0.15));
    setEmergency(Math.round(totalBudget * 0.10));
    setCustomItems([]);
    onShowToast('Rebalanced to recommended standard 30/25/20/15/10 ratio!', 'success');
  };

  const categoriesConfig = [
    {
      id: 'transportation',
      label: 'Transportation & Transit',
      description: 'Flights, trains, cabs, local scooters, fuel, metro passes',
      amount: transportation,
      setAmount: setTransportation,
      icon: Plane,
      color: '#247BA0',
      bgColor: 'bg-[#247BA0]'
    },
    {
      id: 'accommodation',
      label: 'Accommodation & Stay',
      description: 'Hotels, boutique homestays, hostels, resorts',
      amount: accommodation,
      setAmount: setAccommodation,
      icon: Home,
      color: '#102A43',
      bgColor: 'bg-[#102A43]'
    },
    {
      id: 'food',
      label: 'Food, Dining & Cafes',
      description: 'Local thalis, beach shacks, street food, morning breakfasts',
      amount: food,
      setAmount: setFood,
      icon: Utensils,
      color: '#FF8066',
      bgColor: 'bg-[#FF8066]'
    },
    {
      id: 'activities',
      label: 'Activities & Sightseeing',
      description: 'Monument tickets, rafting, safaris, boat tours, workshops',
      amount: activities,
      setAmount: setActivities,
      icon: Camera,
      color: '#2A9D8F',
      bgColor: 'bg-emerald-600'
    },
    {
      id: 'emergency',
      label: 'Emergency & Contingency',
      description: 'Unforeseen medical, extra baggage, emergency taxis, tips',
      amount: emergency,
      setAmount: setEmergency,
      icon: ShieldAlert,
      color: '#64748B',
      bgColor: 'bg-slate-500'
    }
  ];

  return (
    <div id="budget" className="py-16 lg:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#247BA0] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF8066]" />
              <span>Smart Travel Economics</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight">
              Interactive Budget Planner
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[#243E56]">
              Real-time expense allocation in Indian Rupees with dynamic remaining balance calculations.
            </p>
          </div>

          <button
            onClick={handleAutoRebalance}
            className="self-start md:self-auto px-4 py-2 bg-white border border-[#CBD5E1] hover:bg-gray-50 text-[#102A43] text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#247BA0]" />
            <span>Apply Recommended 30/25/20 Split</span>
          </button>
        </div>

        {/* Financial Cockpit Display Card */}
        <div className="bg-[#102A43] text-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-white/10">
            {/* 1. Total Trip Budget */}
            <div>
              <div className="text-xs font-semibold text-[#DCE8DF] uppercase tracking-wider mb-1">
                Total Allocated Budget
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-4xl sm:text-5xl font-bold text-white">
                  ₹{totalBudget.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-white/70">Edit:</span>
                <input
                  type="number"
                  step={1000}
                  min={1000}
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Math.max(1000, Number(e.target.value)))}
                  className="w-32 bg-white/10 border border-white/20 rounded px-2 py-0.5 text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#FF8066]"
                />
              </div>
            </div>

            {/* 2. Total Estimated Spend */}
            <div>
              <div className="text-xs font-semibold text-[#DCE8DF] uppercase tracking-wider mb-1">
                Total Estimated Expenses
              </div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-white">
                ₹{totalExpenses.toLocaleString('en-IN')}
              </div>
              <div className="mt-2 text-xs text-white/70">
                {percentUsed}% of total budget committed
              </div>
            </div>

            {/* 3. Remaining Balance Indicator */}
            <div className={`p-5 rounded-2xl border ${isOverBudget ? 'bg-rose-950/50 border-rose-400' : 'bg-emerald-950/40 border-emerald-400'}`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/80 flex items-center justify-between">
                <span>Remaining Balance</span>
                {isOverBudget ? (
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div className={`font-display text-3xl sm:text-4xl font-bold mt-1 ${isOverBudget ? 'text-rose-300' : 'text-emerald-300'}`}>
                {isOverBudget ? `-₹${Math.abs(remainingBalance).toLocaleString('en-IN')}` : `₹${remainingBalance.toLocaleString('en-IN')}`}
              </div>
              <div className="mt-1 text-xs text-white/90">
                {isOverBudget
                  ? '⚠️ Warning: Expenses exceed planned budget by ₹' + Math.abs(remainingBalance).toLocaleString('en-IN')
                  : '✓ Safely within your financial target'}
              </div>
            </div>
          </div>

          {/* Visual Breakdown Bar */}
          <div className="pt-6">
            <div className="flex items-center justify-between text-xs text-white/80 mb-2">
              <span className="font-semibold uppercase tracking-wider">Expense Allocation Breakdown:</span>
              <span>{totalExpenses > 0 ? `${percentUsed}% utilized` : '0%'}</span>
            </div>

            <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden flex shadow-inner">
              {totalExpenses > 0 && (
                <>
                  <div
                    style={{ width: `${(transportation / totalExpenses) * 100}%` }}
                    className="bg-[#247BA0] transition-all duration-300"
                    title={`Transportation: ₹${transportation}`}
                  />
                  <div
                    style={{ width: `${(accommodation / totalExpenses) * 100}%` }}
                    className="bg-indigo-400 transition-all duration-300"
                    title={`Accommodation: ₹${accommodation}`}
                  />
                  <div
                    style={{ width: `${(food / totalExpenses) * 100}%` }}
                    className="bg-[#FF8066] transition-all duration-300"
                    title={`Food: ₹${food}`}
                  />
                  <div
                    style={{ width: `${(activities / totalExpenses) * 100}%` }}
                    className="bg-emerald-500 transition-all duration-300"
                    title={`Activities: ₹${activities}`}
                  />
                  <div
                    style={{ width: `${(emergency / totalExpenses) * 100}%` }}
                    className="bg-slate-400 transition-all duration-300"
                    title={`Emergency: ₹${emergency}`}
                  />
                  {customTotal > 0 && (
                    <div
                      style={{ width: `${(customTotal / totalExpenses) * 100}%` }}
                      className="bg-amber-400 transition-all duration-300"
                      title={`Custom: ₹${customTotal}`}
                    />
                  )}
                </>
              )}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#247BA0]" />
                <span>Transit ({totalExpenses ? Math.round((transportation / totalExpenses) * 100) : 0}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span>Stay ({totalExpenses ? Math.round((accommodation / totalExpenses) * 100) : 0}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF8066]" />
                <span>Food ({totalExpenses ? Math.round((food / totalExpenses) * 100) : 0}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Activities ({totalExpenses ? Math.round((activities / totalExpenses) * 100) : 0}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span>Buffer ({totalExpenses ? Math.round((emergency / totalExpenses) * 100) : 0}%)</span>
              </div>
              {customTotal > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Custom ({totalExpenses ? Math.round((customTotal / totalExpenses) * 100) : 0}%)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Editable Expense Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesConfig.map((cat) => {
            const Icon = cat.icon;
            const pctOfBudget = totalBudget > 0 ? Math.round((cat.amount / totalBudget) * 100) : 0;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl p-6 border border-[#E2DDD2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-base font-bold text-[#102A43]">
                          {cat.label}
                        </h4>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {pctOfBudget}% of total budget
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#486581] leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Input & Slider */}
                  <div className="space-y-3 pt-2">
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-xs font-bold text-gray-500">₹</span>
                      <input
                        type="number"
                        min={0}
                        step={500}
                        value={cat.amount}
                        onChange={(e) => cat.setAmount(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-lg pl-7 pr-3 py-2 text-sm font-bold text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#247BA0]"
                      />
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={totalBudget}
                      step={500}
                      value={cat.amount}
                      onChange={(e) => cat.setAmount(Number(e.target.value))}
                      className="w-full accent-[#247BA0] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Quick Adjust:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => cat.setAmount(Math.max(0, cat.amount - 500))}
                      className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded font-medium text-xs text-gray-700"
                    >
                      -₹500
                    </button>
                    <button
                      onClick={() => cat.setAmount(cat.amount + 500)}
                      className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded font-medium text-xs text-gray-700"
                    >
                      +₹500
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add Custom Expense Card */}
          <div className="bg-[#FAF8F3] rounded-2xl p-6 border border-dashed border-[#CBD5E1] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Plus className="w-5 h-5 text-[#247BA0]" />
                <h4 className="font-display text-base font-bold text-[#102A43]">
                  Add Custom Expense
                </h4>
              </div>
              <p className="text-xs text-[#486581] mb-4">
                Include specific costs like scuba diving certificates, visa fees, camera rentals, or gifts.
              </p>

              <form onSubmit={handleAddCustom} className="space-y-3">
                <input
                  type="text"
                  placeholder="Expense name (e.g., Souvenirs & Tea)"
                  value={newCustomName}
                  onChange={(e) => setNewCustomName(e.target.value)}
                  className="w-full bg-white border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#247BA0]"
                />

                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-gray-500">₹</span>
                  <input
                    type="number"
                    min={100}
                    step={100}
                    placeholder="Amount in INR"
                    value={newCustomAmount}
                    onChange={(e) => setNewCustomAmount(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg pl-7 pr-3 py-2 text-xs text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#247BA0]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#247BA0] hover:bg-[#1A5E7B] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Add Custom Expense
                </button>
              </form>
            </div>

            {/* List of custom items */}
            {customItems.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-200 space-y-1.5 max-h-32 overflow-y-auto">
                <div className="text-[11px] font-semibold text-gray-500 uppercase">Added Items:</div>
                {customItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs bg-white p-2 rounded border border-gray-200">
                    <span className="truncate max-w-[120px] font-medium text-[#102A43]">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#247BA0]">₹{item.amount.toLocaleString('en-IN')}</span>
                      <button
                        onClick={() => handleDeleteCustom(item.id)}
                        className="text-gray-400 hover:text-rose-500"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
