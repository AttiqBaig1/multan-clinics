import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

type ToastListener = (toasts: ToastItem[]) => void;

let globalToasts: ToastItem[] = [];
const listeners: Set<ToastListener> = new Set();

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  const id = `toast-${Date.now()}-${Math.random()}`;
  const newToast: ToastItem = { id, message, type };
  globalToasts = [...globalToasts, newToast];
  listeners.forEach(l => l(globalToasts));

  setTimeout(() => {
    globalToasts = globalToasts.filter(t => t.id !== id);
    listeners.forEach(l => l(globalToasts));
  }, 4000);
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>(globalToasts);

  useEffect(() => {
    const handleUpdate = (updated: ToastItem[]) => setToasts([...updated]);
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const removeToast = (id: string) => {
    globalToasts = globalToasts.filter(t => t.id !== id);
    listeners.forEach(l => l(globalToasts));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-md w-full px-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl backdrop-blur-md border ${
              toast.type === 'success'
                ? 'bg-slate-900/95 text-amber-300 border-amber-500/30'
                : toast.type === 'error'
                ? 'bg-red-950/90 text-red-200 border-red-800/40'
                : 'bg-slate-900/95 text-slate-200 border-slate-700/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}
              <span className="text-sm font-medium tracking-wide">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 opacity-70 hover:opacity-100" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
