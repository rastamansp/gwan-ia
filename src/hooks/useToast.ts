import { useState, useCallback } from 'react';
import { ToastProps } from '../components/ui/Toast';

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastProps['type'] = 'info', duration?: number) => {
      const id = Date.now().toString();
      const newToast: ToastProps = {
        id,
        message,
        type,
        duration,
        onClose: removeToast,
      };

      setToasts(prev => [...prev, newToast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showInfo = useCallback(
    (message: string, duration?: number) => {
      addToast(message, 'info', duration);
    },
    [addToast]
  );

  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      addToast(message, 'success', duration);
    },
    [addToast]
  );

  const showWarning = useCallback(
    (message: string, duration?: number) => {
      addToast(message, 'warning', duration);
    },
    [addToast]
  );

  const showError = useCallback(
    (message: string, duration?: number) => {
      addToast(message, 'error', duration);
    },
    [addToast]
  );

  return {
    toasts,
    showInfo,
    showSuccess,
    showWarning,
    showError,
    removeToast,
  };
};
