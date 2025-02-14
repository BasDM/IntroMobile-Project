import MapView, { Marker, Callout } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';

const POINTS_OF_INTEREST = [
  {
    name: "AP Hogeschool",
    location: {
      latitude: 51.2243,
      longitude: 4.3852
    },
  },
  {
    name: "London Bridge",
    location: {
      latitude: 51.5055,
      longitude: -0.0754
    }
  },
  {
    name: "Eiffel Tower",
    location: {
      latitude: 48.8584,
      longitude: 2.2945
    }
  },
  {
    name: "Statue of Liberty",
    location: {
      latitude: 40.6892,
      longitude: -74.0445
    }
  }
];

export default function Map() {
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
        {POINTS_OF_INTEREST.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.location}
            title={marker.name}
            description={marker.name}
          />
        ))}
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
