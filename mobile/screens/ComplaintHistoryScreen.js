import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ComplaintHistoryScreen = () => {
    const complaints = [
        { id: '1', title: 'Pothole on MG Road', status: 'Pending', date: '2023-10-25' },
        { id: '2', title: 'No Water Supply', status: 'Resolved', date: '2023-10-20' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-gray-50 p-4">
            <Text className="text-2xl font-bold mb-4">My Complaints</Text>
            <FlatList
                data={complaints}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="bg-white p-4 rounded-lg shadow-sm mb-3">
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="font-bold text-lg">{item.title}</Text>
                            <Text className={`px-2 py-1 rounded text-xs ${item.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {item.status}
                            </Text>
                        </View>
                        <Text className="text-gray-500">{item.date}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default ComplaintHistoryScreen;
