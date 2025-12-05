import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { API_URL } from '../config';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const handleLogin = async () => {
        if (phone.length !== 10) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { phone });
            if (res.data.success) {
                navigation.navigate('OTP', { phone, devOtp: res.data.devOtp });
            }
        } catch (error) {
            console.error(error);
            alert('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-gray-900">
            <StatusBar style="light" />

            {/* Background Image (Top Half) */}
            <View className="absolute top-10 left-10 z-50 bg-red-500 p-4 rounded-lg">
                <Text className="text-white font-bold">Tailwind Test</Text>
            </View>
            <View className="absolute top-0 w-full h-[60%]">
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Shivraj_Singh_Chouhan_%28cropped%29.jpg' }}
                    className="w-full h-full object-cover opacity-90"
                    resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/20" />
            </View>

            {/* Bottom Sheet Content */}
            <View className="flex-1 justify-end">
                <View className="bg-white h-[55%] w-full rounded-t-[40px] px-8 pt-10 pb-6 shadow-2xl">
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {!showInput ? (
                                <>
                                    <Text className="text-3xl font-bold text-center text-slate-800 mb-3">Let's get started</Text>
                                    <Text className="text-center text-slate-500 mb-8 px-4">
                                        Login to your account below or signup for an amazing experience
                                    </Text>

                                    <TouchableOpacity
                                        className="bg-teal-500 py-4 rounded-full mb-4 shadow-lg shadow-teal-200"
                                        onPress={() => setShowInput(true)}
                                    >
                                        <Text className="text-white text-center font-bold text-lg">Have an account? Login</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        className="bg-gray-100 py-4 rounded-full mb-6"
                                        onPress={() => setShowInput(true)}
                                    >
                                        <Text className="text-slate-700 text-center font-bold text-lg">Join us, it's Free</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Text className="text-center text-slate-400 text-sm">Forgot password?</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <View className="flex-row items-center mb-6">
                                        <TouchableOpacity onPress={() => setShowInput(false)} className="mr-4">
                                            <Text className="text-2xl text-slate-400">←</Text>
                                        </TouchableOpacity>
                                        <Text className="text-2xl font-bold text-slate-800">Citizen Login</Text>
                                    </View>

                                    <View className="mb-6">
                                        <Text className="text-slate-600 font-medium mb-2 ml-2">Mobile Number</Text>
                                        <View className="flex-row items-center border border-slate-200 rounded-2xl bg-slate-50 px-4 py-3">
                                            <Text className="text-slate-500 font-bold mr-3 text-lg">+91</Text>
                                            <TextInput
                                                className="flex-1 text-lg font-semibold text-slate-800"
                                                placeholder="98765 43210"
                                                placeholderTextColor="#cbd5e1"
                                                keyboardType="phone-pad"
                                                value={phone}
                                                onChangeText={setPhone}
                                                maxLength={10}
                                                autoFocus
                                            />
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        className={`bg-teal-600 py-4 rounded-2xl shadow-lg shadow-teal-200 ${loading ? 'opacity-70' : ''}`}
                                        onPress={handleLogin}
                                        disabled={loading}
                                    >
                                        <Text className="text-white text-center font-bold text-lg">
                                            {loading ? 'Sending OTP...' : 'Get OTP'}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}

                            <View className="mt-8 items-center">
                                <Text className="text-slate-300 text-[10px] uppercase tracking-widest">Mamaji App • Gov of MP</Text>
                            </View>

                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;
