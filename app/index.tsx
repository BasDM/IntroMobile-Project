import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList, Pressable, ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import "../global.css"; 
import { Sighting } from "@/types";
import SightingDetail from "@/components/SightingDetail";

const styles = StyleSheet.create({
  listItem:{
    borderWidth:1,
    borderColor:"black",
    padding:10,
    width:400
  }
})

export default function Index() {
  const[sightings,setSightings] = useState<Sighting[]>([]);

  async function loadSightings(){
    const response = await fetch("https://sampleapis.assimilate.be/ufo/sightings");
    const sightings:Sighting[] = await response.json();
    setSightings(sightings);
  }

  useEffect(() =>{
    loadSightings();
  })

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        padding:20
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
  );
}
