import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePageScreen from './app/screens/HomePageScreen';
import AboutScreen from './app/screens/AboutScreen';
import RegisterScreen from './app/screens/RegisterScreen';
// import SettingsScreen from './screens/SettingsScreen';
// import Header from './app/components/Header';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: '#4B0082' },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    drawerStyle: { backgroundColor: '#fff', width: 260 },
                    drawerActiveTintColor: '#4B0082',
                }}
            >
                <Drawer.Screen
                    name="HomePage"
                    component={HomePageScreen}
                    options={{ title: 'Merlin for All' }}
                />
                <Drawer.Screen
                    name="About"
                    component={AboutScreen}
                    options={{ title: 'About App' }}
                />
                <Drawer.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ title: 'Register' }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

