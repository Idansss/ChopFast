"use client";

import { useEffect, useState, createContext, useContext, useCallback } from "react";
import { CheckCircle, X, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const icons = { success: CheckCircle, error: AlertCircle, info: Info };
  const colors = {
    success: "bg-[#1A1A2E] text-white",
    error: "bg-red-600 text-white",
    info: "bg-[#FF5A1F] text-white",
  };
  const Icon = icons[toast.type];

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-modal transition-all duration-300 ${colors[toast.type]} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <p className="text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-1 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
