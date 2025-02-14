import { View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css"; 
import SightingDetail from "@/components/SightingDetail";
import { useSightings } from "@/Providers/Sightings";

export default function Index() {
  const { sightings } = useSightings();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 20
        }}
      >
        <FlatList
          className="self-center"
          data={sightings}
          renderItem={({ item }) => (
        <SightingDetail sighting={item} />
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
}
