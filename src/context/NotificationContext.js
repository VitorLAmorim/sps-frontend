import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(true);

    const showError = useCallback((msg) => {
        setMessage(msg);
        setIsError(true);
    }, []);

    const showSuccess = useCallback((msg) => {
        setMessage(msg);
        setIsError(false);
    }, []);

    const clear = useCallback(() => {
        setMessage(null);
    }, []);

    return (
        <NotificationContext.Provider value={{ showError, showSuccess, clear, message, isError }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
    return ctx;
}
