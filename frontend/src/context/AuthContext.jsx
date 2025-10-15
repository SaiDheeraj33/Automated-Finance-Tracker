import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored token on load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        // Mock Login Logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'admin' && password === 'password') {
                    const mockUser = { username: 'admin', role: 'admin', token: 'mock-jwt-token-admin' };
                    setUser(mockUser);
                    localStorage.setItem('user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else if (username === 'user' && password === 'password') {
                    const mockUser = { username: 'user', role: 'user', token: 'mock-jwt-token-user' };
                    setUser(mockUser);
                    localStorage.setItem('user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    };

    const loginWithOAuth = (provider) => {
        // Mock OAuth Logic
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = { username: `${provider}_user`, role: 'user', token: `mock-oauth-token-${provider}` };
                setUser(mockUser);
                localStorage.setItem('user', JSON.stringify(mockUser));
                resolve(mockUser);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, loginWithOAuth, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
