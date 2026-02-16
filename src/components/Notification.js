import { useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';

export default function Notification() {
    const { message, isError, clear } = useNotification();

    useEffect(() => {
        if (!message) return;
        const t = setTimeout(clear, 6000);
        return () => clearTimeout(t);
    }, [message, clear]);

    if (!message) return null;

    return (
        <div
            className={`notification ${isError ? 'notification--error' : 'notification--success'}`}
            role="alert"
        >
            <span className="notification__text">{message}</span>
            <button type="button" className="notification__close" onClick={clear} aria-label="Fechar">
                ×
            </button>
        </div>
    );
}
