import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EventScreen = () => {
    const events = [
        { id: '1', title: 'Diwali Mela', location: 'City Ground', date: '2023-11-10' },
        { id: '2', title: 'Health Camp', location: 'Community Center', date: '2023-11-05' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-gray-50 p-4">
            <Text className="text-2xl font-bold mb-4">Upcoming Events</Text>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="bg-white p-4 rounded-lg shadow-sm mb-3">
                        <Text className="font-bold text-lg mb-1">{item.title}</Text>
                        <Text className="text-gray-600">📍 {item.location}</Text>
                        <Text className="text-blue-600 mt-2">📅 {item.date}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default EventScreen;
