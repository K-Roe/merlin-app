import React, {use} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity} from 'react-native';
import { useNavigation} from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { PublicStackParamList } from '@/types/navigation';
type MyNavProp = NativeStackNavigationProp<PublicStackParamList, 'HomePage'>;

const { width } = Dimensions.get('window');
export default function HomePageScreen() {
    const navigation = useNavigation<MyNavProp>();

    return (
        <LinearGradient
            colors={['#f8f5ff', '#ffffff']}
            style={styles.background}
        >
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Image
                            source={require('../../../assets/MerlinForAllLogo.jpg')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={styles.title}>Merlin for All</Text>
                        <Text style={styles.subtitle}>Your Personal Finance Companion</Text>

                        <Text style={styles.paragraph}>
                            Take control of your money with <Text style={styles.bold}>Merlin for All</Text>. Track your income
                            and expenses, see where your money goes, and plan your savings effortlessly.
                        </Text>

                        <Text style={styles.paragraphAlt}>
                            Log what you earn, record what you spend, and visualize your progress toward your financial goals.
                            Whether you&#39;re budgeting, saving, or just keeping an eye on your spending, Merlin for All keeps it
                            all in one place.
                        </Text>
                        <TouchableOpacity style={styles.startedButton} onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.buttonText}>Get Started</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
                            <Text style={styles.buttonText}>Learn More</Text>
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
    paragraph: {
        fontSize: 16,
        color: '#374151', // gray-700
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 18,
    },
    paragraphAlt: {
        fontSize: 15,
        color: '#4B5563', // gray-600
        textAlign: 'center',
        lineHeight: 24,
    },
    bold: {
        fontWeight: '700',
        color: '#4B0082',
    },
    button: {
        backgroundColor: '#4B0082',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginTop: 20,
    },
    startedButton: {
        backgroundColor: '#2350ea',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});
