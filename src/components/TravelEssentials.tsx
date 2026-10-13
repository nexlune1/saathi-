import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  FileText,
  Shirt,
  HeartPulse,
  Smartphone,
  Sparkle,
  Compass,
  Filter
} from 'lucide-react';
import { ChecklistItem } from '../types/travel';
import { DEFAULT_PACKING_ITEMS } from '../data/packingData';

interface TravelEssentialsProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (item: ChecklistItem) => void;
  onDeleteItem: (id: string) => void;
  onResetDefaults: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const TravelEssentials: React.FC<TravelEssentialsProps> = ({
  items,
  onToggleItem,
  onAddItem,
  onDeleteItem,
  onResetDefaults,
  onShowToast
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [newText, setNewText] = useState<string>('');
  const [newCategory, setNewCategory] = useState<ChecklistItem['category']>('documents');

  const categories = [
    { id: 'all', label: 'All Essentials', icon: CheckSquare },
    { id: 'documents', label: 'Documents & IDs', icon: FileText },
    { id: 'clothing', label: 'Clothing & Gear', icon: Shirt },
    { id: 'health', label: 'Medical & First Aid', icon: HeartPulse },
    { id: 'electronics', label: 'Tech & Chargers', icon: Smartphone },
    { id: 'toiletries', label: 'Toiletries & Care', icon: Sparkle },
    { id: 'destination', label: 'Destination Gear', icon: Compass }
  ];

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const totalCount = items.length;
  const completedCount = items.filter((i) => i.completed).length;
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) {
      onShowToast('Please enter an item description', 'error');
      return;
    }

    const newItem: ChecklistItem = {
      id: `item-${Date.now()}`,
      text: newText.trim(),
      category: newCategory,
      completed: false
    };

    onAddItem(newItem);
    setNewText('');
    onShowToast(`Added "${newItem.text}" to your checklist!`, 'success');
  };

  return (
    <div id="essentials" className="py-16 lg:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-[#E2DDD2]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#247BA0] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF8066]" />
              <span>Zero-Stress Preparation</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight">
              Travel Essentials Checklist
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[#243E56]">
              Keep track of documents, chargers, medications, and clothes before stepping out the door.
            </p>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset checklist to recommended travel defaults?')) {
                onResetDefaults();
                onShowToast('Restored recommended packing essentials', 'info');
              }
            }}
            className="self-start md:self-auto px-4 py-2 bg-white border border-[#CBD5E1] hover:bg-gray-50 text-[#102A43] text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
            <span>Reset to Recommended List</span>
          </button>
        </div>

        {/* Progress Cockpit Card */}
        <div className="bg-[#102A43] text-white rounded-2xl p-6 sm:p-8 shadow-xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-2/3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DCE8DF]">
                Packing Readiness
              </div>
              <div className="text-sm font-bold text-white">
                {completedCount} of {totalCount} items packed ({percentComplete}%)
              </div>
            </div>

            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                style={{ width: `${percentComplete}%` }}
                className="h-full bg-gradient-to-r from-[#247BA0] to-[#FF8066] transition-all duration-500 rounded-full"
              />
            </div>
            <p className="text-xs text-white/70 mt-2">
              {percentComplete === 100
                ? '🎉 Congratulations! You are 100% packed and ready to explore!'
                : percentComplete >= 50
                ? '👍 Halfway there! Double check identity documents and chargers.'
                : '🎒 Just getting started. Check off items as you pack them into your bag.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10">
            <CheckCircle2 className="w-8 h-8 text-[#FF8066]" />
            <div>
              <div className="text-2xl font-bold font-display">{percentComplete}%</div>
              <div className="text-[11px] text-[#DCE8DF] uppercase tracking-wider">Completed</div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Categories Sidebar / Buttons (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#E2DDD2] shadow-sm space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-3 py-1">
              Filter by Category
            </div>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              const count = cat.id === 'all'
                ? items.length
                : items.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#102A43] text-white shadow-sm'
                      : 'text-[#243E56] hover:bg-[#FAF8F3]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#FF8066]" />
                    <span>{cat.label}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Add Custom Item Widget */}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-3">
                Add Custom Item
              </div>
              <form onSubmit={handleAddNew} className="space-y-2.5">
                <input
                  type="text"
                  placeholder="e.g. Scuba license, Camera lens"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:ring-1 focus:ring-[#247BA0]"
                />
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#102A43] focus:outline-none"
                >
                  <option value="documents">Documents</option>
                  <option value="clothing">Clothing</option>
                  <option value="health">Health & Medical</option>
                  <option value="electronics">Electronics</option>
                  <option value="toiletries">Toiletries</option>
                  <option value="destination">Destination Gear</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#247BA0] hover:bg-[#1A5E7B] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Checklist</span>
                </button>
              </form>
            </div>
          </div>

          {/* Checklist Items Column (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#E2DDD2] shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h4 className="font-display text-xl font-bold text-[#102A43]">
                {categories.find((c) => c.id === activeCategory)?.label}
              </h4>
              <span className="text-xs text-gray-500">
                {filteredItems.filter((i) => i.completed).length} of {filteredItems.length} packed
              </span>
            </div>

            <div className="divide-y divide-gray-100 space-y-1">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-[#FAF8F3] transition-colors group"
                >
                  <button
                    onClick={() => onToggleItem(item.id)}
                    className="flex items-center gap-3.5 text-left cursor-pointer flex-1"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-md border-2 border-gray-300 hover:border-[#247BA0] shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        item.completed
                          ? 'line-through text-gray-400 font-normal'
                          : 'text-[#102A43] font-medium'
                      }`}
                    >
                      {item.text}
                    </span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-semibold text-gray-400 px-2 py-0.5 rounded bg-gray-100 hidden sm:inline">
                      {item.category}
                    </span>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-rose-500 transition-opacity"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm">
                No items in this category yet. Add one from the sidebar!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
