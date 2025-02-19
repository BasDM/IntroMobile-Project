import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Platform, Text, TouchableOpacity, View } from 'react-native';

export default function Camera({ onPictureTaken, onClose }: { onPictureTaken: (picture: string) => void, onClose: () => void }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<String>("back");
    const cameraRef = useRef<CameraView>(null);

    function flipCamera() {
        setFacing(facing === "back" ? "front" : "back");
    }

    // Camera permissions are still loading.
    if (!permission) {
        return <View />;
    }

    // Camera permissions are not granted yet.
    if (!permission.granted) {
        return (
        <View className='flex-1 justify-center items-center'>
            <Text className='p-4'>We need your permission to show the camera</Text>
            <View className='flex-row gap-2'>
                <Button onPress={onClose} title="close" />
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        </View>
        );
    }

    // Open camera
    return (
        <View className='flex-1 '>
            <CameraView
                facing={facing === "back" ? "back" : "front"}
                className='flex-1'
                ref={cameraRef}
            >
                <View className='flex-1'>
                    <View className='absolute top-5 left-5 z-20'>
                        {/* Close button */}
                        <TouchableOpacity onPress={onClose} className='bg-white p-4 rounded-full z-20'>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex-1 flex flex-row justify-center items-end'>
                        {/* Flip camera button if not on web */}
                        {Platform.OS !== 'web' && 
                            <TouchableOpacity onPress={flipCamera} className='bg-white p-4 m-5 rounded-full'>
                                <Text>Flip Camera</Text>
                            </TouchableOpacity>
                        }
                        
                        {/* Take picture button */}
                        <TouchableOpacity 
                            onPress={async () => {
                                if (cameraRef.current) {
                                    cameraRef.current.takePictureAsync()
                                        .then(picture => {
                                            if (picture) onPictureTaken(picture.uri);
                                        });
                                }
                            }}
                            className='bg-white p-4 m-5 rounded-full'
                        >
                            <Text>Take Picture</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </CameraView>
        </View>
    );
}