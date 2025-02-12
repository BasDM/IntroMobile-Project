import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  listItem:{
    borderWidth:1,
    borderColor:"black",
    padding:10,
    width:400
  }
})

export interface Sighting {
  id:             number;
  witnessName:    string;
  location:       Location;
  description:    string;
  picture:        string;
  status:         string;
  dateTime:       Date;
  witnessContact: string;
}

export interface Location {
  latitude:  number;
  longitude: number;
}

export interface SightingProps{
  sighting: Sighting
}

function FormatData(props:SightingProps){
  return (
    <View style={styles.listItem}>
      <Text>- {props.sighting.id}</Text>
      <Text>- {props.sighting.witnessName}</Text>
      <Text>- {props.sighting.location.latitude}</Text>
      <Text>- {props.sighting.location.longitude}</Text>
      <Text>- {props.sighting.description}</Text>
      <Text>- {props.sighting.picture}</Text>
      <Text>- {props.sighting.status}</Text>
      <Text>- {props.sighting.dateTime.toString()}</Text>
      <Text>- {props.sighting.witnessContact}</Text>
    </View>
  )
}

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
        alignItems: "center",
      }}
    >
  <ScrollView>
      <FlatList
        data={sightings}
        renderItem={({ item }) => (
          <FormatData sighting={item} />
        )}
      />
    </ScrollView>
    </View>
  );
}
