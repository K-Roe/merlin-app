import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function TermsScreen() {
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

                        <Text style={styles.title}>Terms & Conditions</Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>1. Use of Service</Text>
                            <Text style={styles.sectionText}>
                                Merlin for All provides tools to help you track your spending, manage budgets,
                                and gain insights into your financial habits. You agree to use the service only
                                for lawful purposes and in accordance with these terms.
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>2. Accounts</Text>
                            <Text style={styles.sectionText}>
                                To use Merlin for All, you must create an account. You are responsible for maintaining
                                the confidentiality of your login information and for all activities under your account.
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>3. Subscriptions & Payments</Text>
                            <Text style={styles.sectionText}>
                                Some features of Merlin for All require a paid subscription. Payments are processed
                                securely through <Text style={styles.bold}>Stripe</Text>. We do not store your payment card information. Subscription
                                fees are billed on a recurring basis until canceled.
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>4. Cancellations & Refunds</Text>
                            <Text style={styles.sectionText}>
                                You may cancel your subscription at any time through your account settings. Refunds are
                                handled in accordance with our refund policy, if applicable.
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
                            <Text style={styles.sectionText}>
                                Merlin for All is provided &#34;as is&#34; without warranties of any kind. We are not
                                responsible for any losses, damages, or expenses arising from your use of the service.
                                Financial decisions you make using Merlin for All are solely your responsibility.
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
                            <Text style={styles.sectionText}>
                                We may update these Terms & Conditions from time to time. Any changes will be posted
                                here and will take effect upon posting.
                            </Text>
                        </View>



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
        color: '#2865ec',
        textAlign: 'center',
        marginBottom: 6,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2865ec',
        textAlign: 'left',
        marginBottom: 24,
    },
    section: {
        width: '100%',
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2865ec',
        marginBottom: 4,
        textAlign: 'left',
    },

    sectionText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#374151',
        textAlign: 'left',
    },
    bold: {
        fontWeight: '700',
        color: '#2865ec',
    },
});
