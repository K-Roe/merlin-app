import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { RootDrawerParamList } from '../types/navigation';
import Input from '../components/Input';
import api from '../lib/axios';

type MyNavProp = DrawerNavigationProp<RootDrawerParamList, 'HomePage'>;

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const navigation = useNavigation<MyNavProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post<{
                user: { id: number; name: string; email: string };
                token: string;
            }>('/mobile/login', { email, password });

            // pull the fields out correctly
            const { user, token } = data;

            // save token for later use
            await AsyncStorage.setItem('authToken', token);

            // optionally set default header for all next requests in this session
            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            console.log('✅ Login response:', data);
            Alert.alert('Welcome', `Logged in as ${user.name}`);

            navigation.navigate('HomePage');
        } catch (err: any) {
            console.log('❌ Login error:', err.response?.status, err.response?.data || err.message);
            Alert.alert(
                'Login Failed',
                err.response?.data?.message ?? 'Invalid credentials or server not reachable.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={['#f8f5ff', '#ffffff']} style={styles.background}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <Image
                                source={require('../../assets/MerlinForAllLogo.jpg')}
                                style={styles.logo}
                                resizeMode="contain"
                            />

                            <Text style={styles.title}>Merlin for All</Text>
                            <Text style={styles.subtitle}>Login to Merlin for All</Text>

                            <Input
                                label="Email"
                                placeholder="you@example.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <Input
                                label="Password"
                                placeholder="********"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />

                            <TouchableOpacity
                                style={[styles.saveButton, loading && { opacity: 0.7 }]}
                                onPress={handleLogin}
                                disabled={loading}
                            >
                                <Text style={styles.saveButtonText}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    scroll: { flexGrow: 1, justifyContent: 'center' },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: 600,
        borderRadius: 28,
        paddingVertical: 36,
        paddingHorizontal: 28,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#4B0082',
        shadowOpacity: 0.12,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
        alignItems: 'center',
    },
    logo: {
        height: 100,
        width: width * 0.6,
        marginBottom: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#4B0082',
        textAlign: 'center',
        marginBottom: 6,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2865ec',
        textAlign: 'center',
        marginBottom: 24,
    },
    saveButton: {
        backgroundColor: '#1f58ea',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#1f58ea',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});
