import { View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css"; 
import { useSightings } from "@/Providers/Sightings";
import SightingOverview from "@/components/SightingOverview";

export default function Index() {
  const { sightings } = useSightings();

  return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 20
        }}
      >
        <FlatList
          className="self-center w-full"
          data={sightings}
          renderItem={({ item }) => (
        <SightingOverview sighting={item} />
          )}
        />
      </View>
  );
}
