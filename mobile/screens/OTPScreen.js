import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../config';

const OTPScreen = ({ route, navigation }) => {
    const { phone, devOtp } = route.params;
    const [otp, setOtp] = useState('');

    const handleVerify = async () => {
        try {
            const res = await axios.post(`${API_URL}/auth/verify`, { phone, otp });
            if (res.data.success) {
                await SecureStore.setItemAsync('token', res.data.token);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Invalid OTP');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white justify-center px-6">
            <Text className="text-2xl font-bold text-center mb-4">Verify OTP</Text>
            <Text className="text-center text-gray-600 mb-8">Sent to +91 {phone}</Text>
            {devOtp && <Text className="text-center text-red-500 mb-4">Dev OTP: {devOtp}</Text>}

            <TextInput
                className="border border-gray-300 rounded-lg p-4 mb-6 text-lg text-center tracking-widest"
                placeholder="XXXXXX"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
                maxLength={6}
            />
            <TouchableOpacity
                className="bg-green-600 p-4 rounded-lg"
                onPress={handleVerify}
            >
                <Text className="text-white text-center font-bold text-lg">Verify</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default OTPScreen;
