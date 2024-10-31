import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from '../Toast';

interface ToastContextType {
  showToast: (message: string, severity?: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; severity: 'success' | 'error' | 'info' | 'warning'; duration?: number } | null>(null);

  const showToast = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 3000) => {
    setToast({ message, severity, duration });
  };

  const handleClose = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} severity={toast.severity} duration={toast.duration} onClose={handleClose} />}
    </ToastContext.Provider>
  );
};
