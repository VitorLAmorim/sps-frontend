import { apiFetch } from './api';

export async function login(email, password) {
    return await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
}