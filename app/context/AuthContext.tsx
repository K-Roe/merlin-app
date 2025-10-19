import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// The shape of our context
interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    logout: () => Promise<void>;
}

// Create the context with defaults
const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    logout: async () => {},
});

// ✅ Provider component that wraps your whole app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // On app start, check for saved token
    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('authToken');
            setIsLoggedIn(!!token);
        })();
    }, []);

    // Logout clears token + flips state
    const logout = async () => {
        await AsyncStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Helper hook for any component to use it easily
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
