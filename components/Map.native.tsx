import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { Sighting } from '@/types';

export default function Map({ markers } : { markers: Sighting[] }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50,
          longitude: 4,
          latitudeDelta: 20,
          longitudeDelta: 10,
        }}
      >
        { markers && 
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.location}
              title={"Sighting: " + marker.id}
              description={marker.description}
            />
          ))
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
