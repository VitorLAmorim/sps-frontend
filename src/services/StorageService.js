

const STORAGE_TOKEN_KEY = 'auth_token'
const STORAGE_USER_KEY = 'auth_user'

export function setAuth(dataToken, dataUser) {
    localStorage.setItem(STORAGE_TOKEN_KEY, dataToken);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(dataUser));
}

export function getToken() {
    return localStorage.getItem(STORAGE_TOKEN_KEY);
}

export function getUser() {
    return JSON.parse(localStorage.getItem(STORAGE_USER_KEY) || 'null');
}

export function clearAuth() {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
}

