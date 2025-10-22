import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SelectProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
}

export default function Select({ label, value, onChange }: SelectProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View
                style={[
                    styles.pickerContainer,
                    isFocused && styles.pickerFocused
                ]}
            >
                <Picker
                    selectedValue={value}
                    onValueChange={(val) => onChange(val)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    dropdownIconColor="#4B0082"
                    style={styles.picker}
                    mode={Platform.OS === 'ios' ? 'dialog' : 'dropdown'}
                >
                    <Picker.Item label="Select a category" value="" color="#9CA3AF" />

                    {/* Income Group */}
                    <Picker.Item label="— Income —" enabled={false} color="#6B7280" />
                    <Picker.Item label="Salary / Wages" value="salary" />
                    <Picker.Item label="Freelance / Side Job" value="freelance" />
                    <Picker.Item label="Business Income" value="business" />
                    <Picker.Item label="Investments / Dividends" value="investment" />
                    <Picker.Item label="Rental Income" value="rental-income" />
                    <Picker.Item label="Refunds / Reimbursements" value="refund" />
                    <Picker.Item label="Gifts / Donations Received" value="gift-income" />
                    <Picker.Item label="Other Income" value="misc-income" />
                    <Picker.Item label="Benefits" value="benefits" />

                    {/* Expense Group */}
                    <Picker.Item label="— Expenses —" enabled={false} color="#6B7280" />
                    <Picker.Item label="Takeaway" value="takeaway" />
                    <Picker.Item label="Groceries" value="groceries" />
                    <Picker.Item label="Rent / Mortgage" value="rent" />
                    <Picker.Item label="House Bills" value="house-bill" />
                    <Picker.Item label="Transport" value="transport" />
                    <Picker.Item label="Subscriptions" value="subscriptions" />
                    <Picker.Item label="Entertainment" value="entertainment" />
                    <Picker.Item label="Insurance" value="insurance" />
                    <Picker.Item label="Healthcare" value="healthcare" />
                    <Picker.Item label="Education" value="education" />
                    <Picker.Item label="Savings" value="savings" />
                    <Picker.Item label="Miscellaneous" value="misc-expense" />
                </Picker>
            </View>
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
    pickerContainer: {
        backgroundColor: '#F9FAFB',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    picker: {
        color: '#111827',
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    pickerFocused: {
        borderColor: '#4B0082',
        shadowOpacity: 0.15,
        shadowRadius: 3,
        shadowColor: '#4B0082',
    },
});
