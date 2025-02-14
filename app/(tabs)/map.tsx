import { Text, View } from "react-native";
import { Platform } from "react-native";

// Note: this refers to an alias and gives an erorr for some reason
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