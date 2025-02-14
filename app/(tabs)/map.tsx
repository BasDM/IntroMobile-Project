import { Text, View } from "react-native";
import { Platform } from "react-native";

// Note: this refers to an empty component to suppress the error. 
// The actual component is decided with an alias resolution in metro.config.js
import Map from "../../components/Map";

export default function MapPage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Map></Map>
    </View>
  );
}