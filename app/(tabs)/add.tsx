import Camera from '@/components/Camera';
import { SaveImage } from '@/functions/Images';
import { useSightings } from '@/Providers/Sightings';
import { Sighting } from '@/types';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function AddSighting() {
    const { sightings, addSighting } = useSightings();

    const [sighting, setSighting] = useState<Sighting>({
        id: 0,
        location: {
            latitude: 0,
            longitude: 0,
        },
        dateTime: new Date(),
        description: '',
        picture: '',
        status: 'pending',
        witnessName: '',
        witnessContact: '',
    });
    const [date, setDate] = useState('');
    const [cameraOpen, setCameraOpen] = useState(false);

    // Input change handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if(name === 'date'){
            setSighting(prev => ({
                ...prev,
                dateTime: new Date(value),
            }));
            setDate(value);
        } else {
            setSighting(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Submit
    const handleSubmit = () => {
        // Get last id
        const lastId = sightings.reduce((acc, sighting) => sighting.id > acc ? sighting.id : acc, 0);
        sighting.id = lastId + 1;

        // Add sighting
        if (Platform.OS === 'web') {
            addSighting(sighting);
        } else {
            // Save image before adding sighting
            SaveImage(sighting.picture)
                .then((uri) => {
                    sighting.picture = uri;
                    addSighting(sighting);
                })
                .catch((error) => console.error('Error saving image:', error));
        }

        // Route to details page with as previouse page the home page
        router.replace({ pathname: '/' })
        router.push({ pathname: '/detail', params: { id: sighting.id } });

        setSighting({
            id: 0,
            location: {
                latitude: 0,
                longitude: 0,
            },
            dateTime: new Date(),
            description: '',
            picture: '',
            status: 'pending',
            witnessName: '',
            witnessContact: '',
        });
    };

    // Show camera
    if (cameraOpen) {
        return <Camera onPictureTaken={picture => { setSighting(prev => ({ ...prev, picture })); setCameraOpen(false); }} onClose={() => setCameraOpen(false)} />;
    }

    // Sightings form
    return (
        <ScrollView className="p-4">
            <Text className="text-xl font-semibold mb-4">Add a New Sighting</Text>
            <View className="grid gap-2">
                {/* Date */}
                <View>
                    <Text>Date:</Text>
                    <TextInput
                        value={date}
                        onChangeText={text => handleChange({ target: { name: 'date', value: text } } as any)}
                        placeholder="YYYY-MM-DD"
                        className="border border-gray-300 bg-white rounded p-2"
                    />
                </View>

                {/* Description */}
                <View>
                    <Text>Description:</Text>
                    <TextInput
                        value={sighting.description}
                        onChangeText={text => handleChange({ target: { name: 'description', value: text } } as any)}
                        placeholder="Enter Description"
                        multiline
                        numberOfLines={4}
                        className="border border-gray-300 bg-white rounded p-2 h-24"
                    />
                </View>

                {/* Picture */}
                <View>
                    <Text>Picture:</Text>
                    <Pressable
                        onPress={() => setCameraOpen(true)}
                        className="bg-blue-600 p-2 rounded items-center"
                    >
                        <Text className="text-white">Take Picture</Text>
                    </Pressable>                    
                </View>

                {/* Status */}
                <View>
                    <Text>Status:</Text>
                    {/* <TextInput
                        value={sighting.status}
                        onChangeText={text => handleChange({ target: { name: 'status', value: text } } as any)}
                        placeholder="Enter Status"
                        className="border border-gray-300 rounded p-2"
                    /> */}
                    <Picker
                        selectedValue={sighting.status}
                        onValueChange={value => handleChange({ target: { name: 'status', value } } as any)}
                        className="border border-gray-300 bg-white rounded p-2"
                    >
                        <Picker.Item label="Pending" value="pending" />
                        <Picker.Item label="Approved" value="approved" />
                        <Picker.Item label="Rejected" value="rejected" />
                    </Picker>
                </View>

                {/* Location */}
                <View className="p-2 border border-gray-300 rounded">
                    <Text className="text-lg font-semibold mb-2">Location</Text>
                    <View className='flex flex-row justify-between gap-2 mb-4'>
                        <View className='w-[49%]'>
                            <Text>Latitude:</Text>
                            <TextInput
                                keyboardType="numeric"
                                value={sighting.location.latitude.toString()}
                                onChangeText={text => handleChange({ target: { name: 'latitude', value: text } } as any)}
                                placeholder="Enter Latitude"
                                className="border border-gray-300 bg-white rounded p-2"
                            />
                        </View>
                        <View className='w-[49%]'>  
                            <Text>Longitude:</Text>
                            <TextInput
                                keyboardType="numeric"
                                value={sighting.location.longitude.toString()}
                                onChangeText={text => handleChange({ target: { name: 'longitude', value: text } } as any)}
                                placeholder="Enter Longitude"
                                className="border border-gray-300 bg-white rounded p-2"
                            />
                        </View>
                    </View>
                </View>

                {/* Witness Information */}
                <View className="p-2 border border-gray-300 rounded">
                    <Text className="text-lg font-semibold mb-2">Witness Information</Text>
                    <View className="flex flex-row justify-between gap-2 mb-4">
                        <View className="w-[49%]">
                            <Text>Witness Name:</Text>
                            <TextInput
                                value={sighting.witnessName}
                                onChangeText={text => handleChange({ target: { name: 'witnessName', value: text } } as any)}
                                placeholder="Enter Witness Name"
                                className="border border-gray-300 bg-white rounded p-2"
                            />
                        </View>
                        <View className="w-[49%]">
                            <Text>Witness Contact:</Text>
                            <TextInput
                                value={sighting.witnessContact}
                                onChangeText={text => handleChange({ target: { name: 'witnessContact', value: text } } as any)}
                                placeholder="Enter Witness Contact"
                                keyboardType="email-address"
                                className="border border-gray-300 bg-white rounded p-2"
                            />
                        </View>
                    </View>
                </View>

                {/* Submit */}
                <Pressable
                    onPress={handleSubmit}
                    className="bg-blue-600 p-3 rounded items-center"
                >
                    <Text className="text-white">Submit</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}