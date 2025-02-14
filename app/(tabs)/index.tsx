import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css"; 
import { Sighting } from "@/types";
import SightingDetail from "@/components/SightingDetail";

export default function Index() {
  const[sightings,setSightings] = useState<Sighting[]>([]);

  async function loadSightings(){
    const response = await fetch("https://sampleapis.assimilate.be/ufo/sightings");
    const sightings:Sighting[] = await response.json();
    setSightings(sightings);
  }

  useEffect(() =>{
    loadSightings();
  }, [])

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
