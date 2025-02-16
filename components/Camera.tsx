import { CameraView, CameraViewRef, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

export default function Camera({ onPictureTaken, onClose }: { onPictureTaken: (picture: string) => void, onClose: () => void }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<String>("back");
    const cameraRef = useRef<CameraView>(null);

    function flipCamera() {
        setFacing(facing === "back" ? "front" : "back");
    }

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
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

    return (
        <View className='flex-1 '>
            <CameraView
                facing={facing === "back" ? "back" : "front"}
                style={{ flex: 1 }}
                ref={cameraRef}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ position: 'absolute', top: 12, left: 12 }}>
                        <TouchableOpacity onPress={onClose} style={{ backgroundColor: 'white', padding: 10 }}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={flipCamera} style={{ backgroundColor: 'white', padding: 10, margin: 12 }}>
                            <Text>Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={async () => {
                                if (cameraRef.current) {
                                    const picture = await cameraRef.current.takePictureAsync();
                                    if (picture) onPictureTaken(picture.uri);
                                }
                            }}
                            style={{ backgroundColor: 'white', padding: 10, margin: 12 }}
                        >
                            <Text>Take Picture</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </CameraView>
        </View>
    );
}