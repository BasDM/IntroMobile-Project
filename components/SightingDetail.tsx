import { Sighting } from "@/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { LoadImage } from "@/functions/Images";
import { formatDate } from "@/functions/Dates";

export default function SightingDetail(props: { sighting: Sighting }){
  const [imageUri, setImageUri] = useState<string>(props.sighting.picture);

  useEffect(() => {    
    LoadImage(props.sighting.picture).then(uri => {
      setImageUri(String(uri));
    });
  }, [props.sighting.picture]);

  return (
    <Link href={{pathname: "/detail", params: {id: props.sighting.id.toString()}}} asChild>
      <Pressable>
        <View style={{ borderWidth: 1, borderColor: "black", padding: 10, width: 400 }}>
          <Text>- {props.sighting.id}</Text>
          <Text>- {props.sighting.witnessName}</Text>
          <Text>- {props.sighting.location.latitude}</Text>
          <Text>- {props.sighting.location.longitude}</Text>
          <Text>- {props.sighting.description}</Text>
          <Text>- {props.sighting.status}</Text>
          <Text>- {formatDate(props.sighting.dateTime)}</Text>
          <Text>- {props.sighting.witnessContact}</Text>
          {props.sighting.picture && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 80, height: 80 }}
              resizeMode="cover"
            />
          )}
        </View>
      </Pressable>
    </Link>
  )
}