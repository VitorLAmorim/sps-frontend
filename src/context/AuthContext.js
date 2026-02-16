import { createContext, useContext, useState } from 'react';
import { getToken, getUser, setAuth, clearAuth } from '../services/StorageService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setTokenState] = useState(getToken());
    const [user, setUserState] = useState(getUser());

    function login(data) {
        setAuth(data.token, data.user);
        setTokenState(data.token);
        setUserState(data.user);
    }

    function logout() {
        clearAuth();

        setTokenState(null);
        setUserState(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated: !!token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
