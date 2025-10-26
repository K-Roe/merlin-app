import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '@/app/lib/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import AssessmentList from '../../components/Dashboard/AssessmentList';
import DashboardButtons from '../../components/Dashboard/DashboardButtons';


const { width } = Dimensions.get('window');

export default function DashboardScreen() {
    const { logout } = useAuth(); // ✅ use logout from context
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const { user } = useAuth();


    const handleLogOut = async () => {
        setLoading(true);
        try {
            // Optional: Call Laravel logout endpoint
            await api.post('/mobile/logout');

            // Remove token and clear header
            await AsyncStorage.removeItem('authToken');
            delete api.defaults.headers.common.Authorization;

            console.log('👋 User logged out successfully');
            Alert.alert('Logged Out', 'You have been signed out.');

            // ✅ Flip state via context (this auto-switches to PublicNavigator)
            await logout();
        } catch (err: any) {
            console.log(
                '❌ Logout error:',
                err.response?.status,
                err.response?.data || err.message
            );
            Alert.alert(
                'Logout Failed',
                err.response?.data?.message ?? 'Unable to log out right now.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClear = async () => {
        await AsyncStorage.removeItem('authToken');
    };

    return (
        <LinearGradient colors={['#f8f5ff', '#ffffff']} style={styles.background}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Image
                            source={require('../../../assets/MerlinForAllLogo.jpg')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={styles.title}>💼 Financial Dashboard</Text>

                        <Text style={styles.subtitle}>
                            Stay on top of your finances, track assessments, and get insights.
                        </Text>

                        <View style={styles.infoCard}>
                            <Text style={styles.infoGreeting}>Welcome back, <Text style={styles.userName}>{user?.name}</Text></Text>
                            <Text style={styles.infoText}>Manage your financial assessments below 👇</Text>
                        </View>

                        <View style={[styles.infoCard, styles.planCard]}>
                            <Text style={styles.planLabel}>Current Plan</Text>
                            <Text style={styles.planName}>{user?.sub?.planName || 'No plan active'}</Text>
                        </View>

                        <DashboardButtons onCreated={() => setRefreshKey(prev => prev + 1)} />

                        <AssessmentList refreshKey={refreshKey} />

                        <TouchableOpacity
                            style={[styles.saveButton, loading && { opacity: 0.7 }]}
                            onPress={handleLogOut}
                            disabled={loading}
                        >
                            <Text style={styles.saveButtonText}>
                                {loading ? 'Logging out...' : 'Log Out'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.saveButton, loading && { opacity: 0.7 }]}
                            onPress={handleClear}
                            disabled={loading}
                        >
                            <Text style={styles.saveButtonText}>
                                {loading ? 'Clear Auth Token' : 'Cleaering'}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
    },
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
        boxShadow: '0px 10px 20px rgba(75, 0, 130, 0.12)',
        elevation: 8,
        alignItems: 'center',
    },

    infoCard: {
        backgroundColor: '#f9f8ff',
        borderRadius: 18,
        paddingVertical: 20,
        paddingHorizontal: 24,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: 'rgba(75,0,130,0.1)',
        shadowColor: '#4B0082',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        height: 100,
        width: width * 0.6,
        marginBottom: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#3B0085',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: 0.6,
        textShadowColor: 'rgba(75,0,130,0.25)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },

    subtitle: {
        fontSize: 17,
        fontWeight: '500',
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: 26,
        lineHeight: 24,
    },

    infoGreeting: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 6,
    },

    userName: {
        color: '#4B0082',
        fontWeight: '800',
    },

    infoText: {
        fontSize: 15,
        color: '#4B5563',
        textAlign: 'center',
    },

    planCard: {
        backgroundColor: 'linear-gradient(145deg, #ede9fe 0%, #d8b4fe 100%)',
        borderColor: 'rgba(75,0,130,0.15)',
        shadowOpacity: 0.15,
    },

    planLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4B0082',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 4,
    },

    planName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#16A34A',
    },
    saveButton: {
        backgroundColor: '#1f58ea',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        boxShadow: '0px 10px 20px rgba(75, 0, 130, 0.12)',
        elevation: 4,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});
