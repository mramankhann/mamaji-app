import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BroadcastScreen = () => {
    const broadcasts = [
        { id: '1', title: 'City Cleanliness Drive', description: 'Join us this Sunday for the cleanliness drive.', date: '2023-10-26' },
        { id: '2', title: 'New Traffic Rules', description: 'Please be aware of the new traffic regulations starting next month.', date: '2023-10-24' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-gray-50 p-4">
            <Text className="text-2xl font-bold mb-4">Broadcasts</Text>
            <FlatList
                data={broadcasts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="bg-white p-4 rounded-lg shadow-sm mb-3 border-l-4 border-blue-500">
                        <Text className="font-bold text-lg mb-1">{item.title}</Text>
                        <Text className="text-gray-600 mb-2">{item.description}</Text>
                        <Text className="text-gray-400 text-xs">{item.date}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default BroadcastScreen;
