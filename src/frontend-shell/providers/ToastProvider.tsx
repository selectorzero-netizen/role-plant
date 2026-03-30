import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { cx } from '../primitives/cx';

type ToastTone = 'info' | 'success' | 'error';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  tone?: ToastTone;
}

interface ToastContextValue {
  pushToast: (toast: Omit<ToastItem, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue>({
  pushToast: () => {},
  dismissToast: () => {},
});

export const useToast = () => useContext(ToastContext);

const toneMap: Record<ToastTone, string> = {
  info: 'border-[var(--shell-border)] bg-[color:var(--shell-panel)]',
  success: 'border-[var(--shell-moss)] bg-[#eef2e5]',
  error: 'border-[var(--shell-error)] bg-[#f4e8e4]',
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const pushToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setItems((current) => [...current, { id, tone: 'info', ...toast }]);
    window.setTimeout(() => dismissToast(id), 3200);
  }, [dismissToast]);

  const value = useMemo(() => ({ pushToast, dismissToast }), [pushToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(92vw,360px)] flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={cx(
              'pointer-events-auto rounded-xl border px-4 py-3 shadow-sm',
              toneMap[item.tone || 'info']
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--shell-ink)]">{item.title}</p>
                {item.description ? (
                  <p className="mt-1 text-xs leading-6 text-[var(--shell-ink-soft)]">
                    {item.description}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(item.id)}
                className="text-[10px] uppercase tracking-[0.2em] text-[var(--shell-ink-soft)]"
              >
                Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
