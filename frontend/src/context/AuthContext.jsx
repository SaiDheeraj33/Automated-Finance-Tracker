import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registeredUsers, setRegisteredUsers] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedRegisteredUsers = localStorage.getItem('registeredUsers');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedRegisteredUsers) {
            setRegisteredUsers(JSON.parse(storedRegisteredUsers));
        }
        setLoading(false);
    }, []);

    const signup = (username, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const existingUser = registeredUsers.find(u => u.username === username || u.email === email);
                if (existingUser) {
                    reject(new Error('User already exists'));
                    return;
                }

                const newUser = { username, email, password, role: 'user' };
                const updatedUsers = [...registeredUsers, newUser];
                setRegisteredUsers(updatedUsers);
                localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
                resolve(newUser);
            }, 1000);
        });
    };

    const login = (username, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'admin' && password === 'password') {
                    const mockUser = { username: 'admin', role: 'admin', token: 'mock-jwt-token-admin' };
                    setUser(mockUser);
                    localStorage.setItem('user', JSON.stringify(mockUser));
                    resolve(mockUser);
                    return;
                }

                const registeredUser = registeredUsers.find(
                    u => u.username === username && u.password === password
                );

                if (registeredUser) {
                    const mockUser = {
                        username: registeredUser.username,
                        email: registeredUser.email,
                        role: registeredUser.role,
                        token: `mock-jwt-token-${registeredUser.username}`
                    };
                    setUser(mockUser);
                    localStorage.setItem('user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    };

    const loginWithOAuth = (provider, account = null) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    username: account ? account.name : `${provider}_user`,
                    email: account ? account.email : `user@${provider}.com`,
                    role: 'user',
                    token: `mock-oauth-token-${provider}`,
                    avatar: account ? account.avatar : null
                };
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
        <AuthContext.Provider value={{ user, login, signup, loginWithOAuth, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
