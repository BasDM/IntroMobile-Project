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
                className="flex-1"
                ref={cameraRef}
            >
                <View className="flex-1 flex flex-col">
                    <View className="absolute top-3 left-3">
                        <TouchableOpacity onPress={onClose} className="bg-white p-2.5">
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-1 flex-row justify-center items-end">
                        <TouchableOpacity onPress={flipCamera} className="bg-white p-2.5 m-3 roundeed">
                            <Text>Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={async () => {
                                if (cameraRef.current) {
                                    const picture = await cameraRef.current.takePictureAsync();
                                    if (picture) onPictureTaken(picture.uri);
                                }
                            }}
                            className="bg-white p-2.5 m-3 rounded"
                        >
                            <Text>Take Picture</Text>
                        </TouchableOpacity>                        
                    </View>
                </View>
            </CameraView>
        </View>
    );
}