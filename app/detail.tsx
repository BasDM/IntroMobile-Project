import SightingDetail from "@/components/SightingOverview";
import { useSightings } from "@/Providers/Sightings";
import { useLocalSearchParams } from "expo-router";
import { View,Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function Index() {
  const {sightings} = useSightings();
  const params = useLocalSearchParams<{ id:string }>();
  const numericId = parseInt(params.id,10);
  const details = sightings.filter(sighting => sighting.id === numericId)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <FlatList
                  className="self-center"
                  data={details}
                  renderItem={({ item }) => (
                <SightingDetail sighting={item} />
                  )}
                />
    </View>
  );
}