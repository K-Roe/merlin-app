import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = useCallback(async () => {
        await AsyncStorage.removeItem('authToken');
        setIsLoggedIn(false);
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                setIsLoggedIn(true);
            } else {
                // 🚪 No token found — auto logout
                setIsLoggedIn(false);
            }
        };

        checkAuth();

        // Optional: you can re-check occasionally or when app comes back to focus
        const interval = setInterval(checkAuth, 60 * 1000); // every 60 seconds
        return () => clearInterval(interval);
    }, [logout]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
