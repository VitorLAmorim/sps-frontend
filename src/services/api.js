import { getToken, clearAuth} from './StorageService'

const API_URL = process.env.REACT_APP_API_URL;

export async function apiFetch(path, options = {}) {
    const token = getToken();

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 401) {
            clearAuth();
            window.location.href = '/login';
        }

        const message = errorData?.error || errorData?.message || 'Falha na requisição.';
        throw new Error(message);
    }

    const contentType = response.headers.get('content-type');
    const hasNoBody = response.status === 204 || (response.status === 201 && !contentType?.includes('application/json'));
    if (hasNoBody) return null;

    const text = await response.text();
    if (!text || !text.trim()) return null;
    try {
        return JSON.parse(text);
    } catch {
        return null;
    }
}
