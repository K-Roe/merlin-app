import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '@/app/lib/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import AssessmentList from '../../components/Dashboard/AssessmentList';


const { width } = Dimensions.get('window');

export default function DashboardScreen() {
    const { logout } = useAuth(); // ✅ use logout from context
    const [loading, setLoading] = useState(false);

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
                            Stay on top of your finances,
                            track assessments, and get insights.
                        </Text>

                        <AssessmentList />


                        <TouchableOpacity
                            style={[styles.saveButton, loading && { opacity: 0.7 }]}
                            onPress={handleLogOut}
                            disabled={loading}
                        >
                            <Text style={styles.saveButtonText}>
                                {loading ? 'Logging out...' : 'Log Out'}
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
        boxShadow: '0px 10px 20px rgba(75, 0, 130, 0.12)',
        elevation: 4,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});
