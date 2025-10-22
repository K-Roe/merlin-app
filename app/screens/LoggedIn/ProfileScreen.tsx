import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    const [user] = useState({
        name: 'Karl Roe',
        email: 'karl.roe@example.com',
    });
    const [isSubscribed] = useState(true);

    const handleLogout = () => {
        Alert.alert('Logout', 'You have been logged out (demo only).');
    };

    const handleCancelSub = () => {
        Alert.alert('Cancel Subscription', 'Subscription cancelled (demo only).');
    };

    return (
        <LinearGradient
            colors={['#111827', '#4B0082', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    <Text style={styles.title}>👤 Your Profile</Text>

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {user.name.charAt(0).toUpperCase()}
                            </Text>
                        </View>

                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userEmail}>{user.email}</Text>
                        </View>
                    </View>

                    {/* Profile Fields */}
                    <View style={styles.profileFields}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.field}>{user.name}</Text>

                        <Text style={[styles.label, { marginTop: 10 }]}>Email</Text>
                        <Text style={styles.field}>{user.email}</Text>
                    </View>

                    {/* Cancel Subscription */}
                    {isSubscribed ? (
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleCancelSub}
                        >
                            <Text style={styles.buttonText}>Cancel Subscription</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.inactiveText}>No active subscription</Text>
                    )}

                    {/* Logout */}
                    <TouchableOpacity
                        style={[styles.button, styles.logoutButton]}
                        onPress={handleLogout}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 16,
    },
    card: {
        width: '100%',
        maxWidth: 600,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        borderRadius: 24,
        paddingVertical: 36,
        paddingHorizontal: 28,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
        backdropFilter: 'blur(12px)',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#c084fc',
        textAlign: 'center',
        marginBottom: 28,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        backgroundColor: '#7e22ce',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#fff',
    },
    userInfo: {
        alignItems: 'center',
    },
    userName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    userEmail: {
        color: '#c4b5fd',
        fontSize: 14,
    },
    profileFields: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },
    label: {
        color: '#c4b5fd',
        fontWeight: '600',
        fontSize: 14,
        marginBottom: 4,
    },
    field: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        color: '#fff',
        fontSize: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    button: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 14,
    },
    cancelButton: {
        backgroundColor: '#dc2626',
    },
    logoutButton: {
        backgroundColor: '#ec4899',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    inactiveText: {
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        marginBottom: 20,
        fontStyle: 'italic',
    },
});
