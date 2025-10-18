import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Dimensions, Alert, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from 'expo-linear-gradient';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import type {RootDrawerParamList} from '../types/navigation';
import Input from '../components/Input';

type MyNavProp = DrawerNavigationProp<RootDrawerParamList, 'HomePage'>;

const {width} = Dimensions.get('window');
export default function LoginScreen() {
    const navigation = useNavigation<MyNavProp>();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSave = () => {
        Alert.alert('Saved', `Your name is now: ${email}`);
    };

    return (
        <LinearGradient
            colors={['#f8f5ff', '#ffffff']}
            style={styles.background}
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
                            placeholder="Enter your name"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Input
                            label="Password"
                            placeholder="********"
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Login</Text>
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
        shadowColor: '#4B0082',
        shadowOpacity: 0.12,
        shadowRadius: 20,
        shadowOffset: {width: 0, height: 10},
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
