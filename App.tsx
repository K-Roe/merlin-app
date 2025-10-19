import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import PublicNavigator from './app/navigation/PublicNavigator';
import PrivateNavigator from './app/navigation/PrivateNavigator';

function RootNavigator() {
    const { isLoggedIn } = useAuth();

    return (
        <NavigationContainer>
            {isLoggedIn ? <PrivateNavigator /> : <PublicNavigator />}
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}
