import { Text, View } from "react-native";
import { Platform } from "react-native";

// Note: this refers to an empty component to suppress the error. 
// The actual component is decided with an alias resolution in metro.config.js
import Map from "../../components/Map";
import { Sighting } from "@/types";
import { useEffect, useState } from "react";
import { getSightings } from "@/functions/Sightings";

export default function MapPage() {
  const [markers, setMarkers] = useState<Sighting[]>([]);

  useEffect(() => {
    getSightings().then((sightings) => {
      setMarkers(sightings);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Map markers={markers}></Map>
    </View>
  );
}