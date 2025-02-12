import { Sighting } from "@/types";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function SightingDetail(props: { sighting: Sighting }){
  return (
    <Link href={{pathname: "/detail", params: {id: props.sighting.id.toString()}}} asChild>
      <Pressable>
        <View style={{ borderWidth:1, borderColor:"black", padding:10, width:400 }}>
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
      </Pressable>
    </Link>
  )
}