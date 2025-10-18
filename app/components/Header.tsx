import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4B0082" />
            <Text style={styles.title}>Merlin for All</Text>
            <Text style={styles.subtitle}>Your Money • Your Control</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4B0082',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#ccc',
        fontSize: 14,
    },
});
