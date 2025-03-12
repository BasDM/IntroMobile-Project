import { Sighting } from "@/types";
import MapView, { Marker } from "react-native-maps";

export default function LocationPicker({ sighting, setSighting }: { sighting: Sighting, setSighting: Function }) {
    return (
        <MapView
            style={{ height: 200, width: '100%' }}
            initialRegion={{
              latitude: 50,
              longitude: 4,
              latitudeDelta: 20,
              longitudeDelta: 10,
            }}
            onPress={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setSighting((prev: Sighting) => ({
                    ...prev,
                    location: { latitude, longitude }
                }));
            }}
        >
            <Marker
                coordinate={{
                    latitude: sighting.location.latitude,
                    longitude: sighting.location.longitude,
                }}
            />
        </MapView>
    )
}