import { View } from "react-native";

// Note: this refers to an empty component to suppress the error. 
// The actual component is decided with an alias resolution in metro.config.js
import Map from "../../components/Map";
import { useSightings } from "@/Providers/Sightings";

export default function MapPage() {
  const { sightings } = useSightings();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Map markers={sightings}></Map>
    </View>
  );
}