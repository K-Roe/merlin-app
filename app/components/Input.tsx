import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
}

export default function Input({ label, style, ...props }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                {...props}
                placeholderTextColor="#9CA3AF"
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    style,
                ]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: '#4B0082',
        fontWeight: '600',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#111827',
        shadowColor: '#4B0082',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    inputFocused: {
        borderColor: '#4B0082',
        shadowOpacity: 0.15,
    },
});
