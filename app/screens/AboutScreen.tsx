import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AboutScreen() {
    return (
        <LinearGradient colors={['#f8f5ff', '#ffffff']} style={styles.background}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Image
                            source={require('../../assets/MerlinForAllLogo.jpg')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={styles.title}>About Merlin for All</Text>
                        <Text style={styles.subtitle}>Your Finance Companion</Text>

                        <Text style={styles.paragraph}>
                            <Text style={styles.bold}>Merlin for All</Text> is your personal finance companion. Track your
                            spending, manage budgets, and gain insights into your financial habits — all in one intuitive platform.
                        </Text>

                        <Text style={styles.paragraphAlt}>
                            Built with <Text style={styles.bold}>Laravel</Text> and <Text style={styles.bold}>Vue 3</Text>, Merlin for
                            All combines modern web technology with practical financial tools. Stay on top of your finances, make
                            smarter decisions, and watch your savings grow.
                        </Text>
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
        color: '#6B21A8',
        textAlign: 'center',
        marginBottom: 24,
    },
    paragraph: {
        fontSize: 16,
        color: '#374151',
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 18,
    },
    paragraphAlt: {
        fontSize: 15,
        color: '#4B5563',
        textAlign: 'center',
        lineHeight: 24,
    },
    bold: {
        fontWeight: '700',
        color: '#4B0082',
    },
});
