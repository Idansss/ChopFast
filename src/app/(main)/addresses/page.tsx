"use client";

import { useState } from "react";
import { MapPin, Trash2, Plus, Home, Briefcase, MoreHorizontal, Check } from "lucide-react";
import { useUserStore, type SavedAddress } from "@/store/userStore";

type LabelOption = "Home" | "Work" | "Other";

const LABEL_CONFIG: Record<LabelOption, { color: string; bg: string; icon: React.ReactNode }> = {
  Home: {
    color: "text-blue-700",
    bg: "bg-blue-100",
    icon: <Home className="w-3.5 h-3.5" />,
  },
  Work: {
    color: "text-green-700",
    bg: "bg-green-100",
    icon: <Briefcase className="w-3.5 h-3.5" />,
  },
  Other: {
    color: "text-gray-600",
    bg: "bg-gray-100",
    icon: <MoreHorizontal className="w-3.5 h-3.5" />,
  },
};

const EMPTY_FORM = {
  label: "Home" as LabelOption,
  street: "",
  city: "",
  landmark: "",
};

export default function AddressesPage() {
  const savedAddresses = useUserStore((s) => s.savedAddresses);
  const addAddress = useUserStore((s) => s.addAddress);
  const removeAddress = useUserStore((s) => s.removeAddress);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saved, setSaved] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.street.trim() || !form.city.trim()) return;

    addAddress({
      id: `addr-${Date.now()}`,
      label: form.label,
      street: form.street.trim(),
      city: form.city.trim(),
      landmark: form.landmark.trim() || undefined,
    });

    setForm(EMPTY_FORM);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    setTimeout(() => {
      removeAddress(id);
      setDeletingId(null);
    }, 300);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Saved Addresses</h1>
          <p className="text-sm text-gray-400 mt-1">Quick access during checkout</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#FF5A1F] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#e8430a] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add new
          </button>
        )}
      </div>

      {/* Success toast */}
      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-xl mb-5">
          <Check className="w-4 h-4 flex-shrink-0" />
          Address saved successfully
        </div>
      )}

      {/* Address list */}
      {savedAddresses.length === 0 && !showForm ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-gray-300" />
          </div>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">No saved addresses</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-xs">
            Save your home, work, or favourite drop-off spots for faster checkout.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#FF5A1F] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#e8430a] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add your first address
          </button>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {savedAddresses.map((addr) => {
            const cfg = LABEL_CONFIG[addr.label];
            const isDeleting = deletingId === addr.id;

            return (
              <div
                key={addr.id}
                className={`bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-5 flex items-start gap-4 transition-all duration-300 ${isDeleting ? "opacity-0 scale-95" : "opacity-100"}`}
              >
                {/* Icon */}
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <MapPin className="w-5 h-5 text-[#FF5A1F]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                      {cfg.icon}
                      {addr.label}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#1A1A2E] leading-snug">{addr.street}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{addr.city}</p>
                  {addr.landmark && (
                    <p className="text-xs text-gray-400 mt-0.5">Near: {addr.landmark}</p>
                  )}
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="p-2 rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors flex-shrink-0"
                  aria-label="Remove address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add address form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-[#1A1A2E] flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#FF5A1F]" />
              Add new address
            </h2>
            <button
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
              className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Label select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
              <div className="grid grid-cols-3 gap-2">
                {(["Home", "Work", "Other"] as LabelOption[]).map((opt) => {
                  const cfg = LABEL_CONFIG[opt];
                  const selected = form.label === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setForm((f) => ({ ...f, label: opt }))}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                        selected
                          ? "border-[#FF5A1F] bg-orange-50 text-[#FF5A1F]"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {cfg.icon}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Street address <span className="text-[#FF5A1F]">*</span>
              </label>
              <input
                type="text"
                required
                value={form.street}
                onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
                placeholder="e.g. 15 Awolowo Road, Victoria Island"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                City <span className="text-[#FF5A1F]">*</span>
              </label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                placeholder="e.g. Lagos, Abuja, Port Harcourt"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Landmark <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={form.landmark}
                onChange={(e) => setForm((f) => ({ ...f, landmark: e.target.value }))}
                placeholder="e.g. Near Access Bank, Behind Shoprite"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!form.street.trim() || !form.city.trim()}
              className="w-full bg-[#FF5A1F] text-white py-3.5 rounded-2xl font-semibold hover:bg-[#e8430a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              Save address
            </button>
          </form>
        </div>
      )}

      {/* Add more button if list is non-empty and form not shown */}
      {savedAddresses.length > 0 && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 text-gray-400 text-sm font-medium py-4 rounded-2xl hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors mt-1"
        >
          <Plus className="w-4 h-4" />
          Add another address
        </button>
      )}
    </div>
  );
}
