import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="p-6 bg-white shadow-sm">
                <Text className="text-2xl font-bold text-blue-800">Namaste, Citizen!</Text>
                <Text className="text-gray-500">Welcome to Suchna Kendra</Text>
            </View>

            <ScrollView className="p-4">
                <View className="flex-row flex-wrap justify-between">
                    <TouchableOpacity
                        className="bg-white w-[48%] p-6 rounded-xl shadow-sm mb-4 items-center"
                        onPress={() => navigation.navigate('Complaint')}
                    >
                        <Text className="text-4xl mb-2">📢</Text>
                        <Text className="font-bold text-center">New Complaint</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-white w-[48%] p-6 rounded-xl shadow-sm mb-4 items-center"
                        onPress={() => navigation.navigate('ComplaintHistory')}
                    >
                        <Text className="text-4xl mb-2">📋</Text>
                        <Text className="font-bold text-center">My Complaints</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-white w-[48%] p-6 rounded-xl shadow-sm mb-4 items-center"
                        onPress={() => navigation.navigate('Broadcasts')}
                    >
                        <Text className="text-4xl mb-2">📡</Text>
                        <Text className="font-bold text-center">Broadcasts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-white w-[48%] p-6 rounded-xl shadow-sm mb-4 items-center"
                        onPress={() => navigation.navigate('Events')}
                    >
                        <Text className="text-4xl mb-2">📅</Text>
                        <Text className="font-bold text-center">Events</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
