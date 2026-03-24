"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Package, Tag, Star, X } from "lucide-react";

const NOTIFICATIONS = [
  {
    id: "1",
    type: "order",
    icon: Package,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "Order delivered!",
    body: "Your order from Mama Put Kitchen has been delivered.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    type: "promo",
    icon: Tag,
    iconBg: "bg-orange-50",
    iconColor: "text-[#FF5A1F]",
    title: "50% off your next order",
    body: "Use code CHOP50 before midnight tonight.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "3",
    type: "review",
    icon: Star,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    title: "How was your meal?",
    body: "Rate your last order from Suya Spot.",
    time: "3 hr ago",
    unread: false,
  },
  {
    id: "4",
    type: "order",
    icon: Package,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    title: "Order confirmed",
    body: "Suya Spot accepted your order. ETA 28 min.",
    time: "Yesterday",
    unread: false,
  },
];

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function markAllRead() {
    setNotifications((ns) => ns.map((n) => ({ ...n, unread: false })));
  }

  function dismiss(id: string) {
    setNotifications((ns) => ns.filter((n) => n.id !== id));
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Notifications"
        onClick={() => setOpen(!open)}
        className="relative hidden md:flex w-9 h-9 rounded-xl border border-gray-200 items-center justify-center text-gray-500 hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#FF5A1F] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-modal border border-gray-100 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-bold text-[#1A1A2E]">Notifications</p>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs text-[#FF5A1F] font-semibold hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <Bell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No notifications</p>
              </div>
            ) : (
              notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors relative group ${n.unread ? "bg-orange-50/40" : ""}`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${n.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-4 h-4 ${n.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold text-[#1A1A2E] ${n.unread ? "" : "font-medium"}`}>{n.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.body}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
                    </div>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#FF5A1F] flex-shrink-0 mt-1.5" />
                    )}
                    <button
                      type="button"
                      aria-label="Dismiss notification"
                      onClick={() => dismiss(n.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-gray-100"
                    >
                      <X className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <button
              type="button"
              className="w-full text-xs font-semibold text-[#FF5A1F] hover:underline text-center"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
