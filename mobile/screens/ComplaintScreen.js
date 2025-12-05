import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const ComplaintScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('Roads');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        Alert.alert('Location Fetched', JSON.stringify(location.coords));
    };

    const handleSubmit = () => {
        // Mock submission
        Alert.alert('Success', 'Complaint submitted successfully!');
        navigation.goBack();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="p-6">
                <Text className="text-2xl font-bold mb-6">New Complaint</Text>

                <Text className="mb-2 font-bold">Title</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3 mb-4"
                    value={title}
                    onChangeText={setTitle}
                    placeholder="e.g., Pothole on Main Road"
                />

                <Text className="mb-2 font-bold">Department</Text>
                <View className="flex-row flex-wrap mb-4">
                    {['Roads', 'Water', 'Electricity', 'Sanitation'].map((dept) => (
                        <TouchableOpacity
                            key={dept}
                            onPress={() => setDepartment(dept)}
                            className={`mr-2 mb-2 px-4 py-2 rounded-full ${department === dept ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        >
                            <Text className={department === dept ? 'text-white' : 'text-black'}>
                                {dept}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text className="mb-2 font-bold">Description</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3 mb-4 h-32"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                    placeholder="Describe the issue..."
                />

                <View className="flex-row justify-between mb-6">
                    <TouchableOpacity
                        className="bg-gray-200 p-4 rounded-lg flex-1 mr-2 items-center"
                        onPress={pickImage}
                    >
                        <Text>📷 Add Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-gray-200 p-4 rounded-lg flex-1 ml-2 items-center"
                        onPress={getLocation}
                    >
                        <Text>📍 Add Location</Text>
                    </TouchableOpacity>
                </View>

                {image && (
                    <Image source={{ uri: image }} className="w-full h-48 rounded-lg mb-6" />
                )}

                <TouchableOpacity
                    className="bg-blue-600 p-4 rounded-lg mb-10"
                    onPress={handleSubmit}
                >
                    <Text className="text-white text-center font-bold text-lg">Submit Complaint</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ComplaintScreen;
