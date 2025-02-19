import { Sighting } from "@/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { LoadImage } from "@/functions/Images";
import { formatDate } from "@/functions/Dates";

export default function SightingDetail(props: { sighting: Sighting }){
  const [imageUri, setImageUri] = useState<string>(props.sighting.picture);

  useEffect(() => {    
    LoadImage(props.sighting.picture)
      .then(uri => {
        setImageUri(uri);
      })
      .catch(error => console.error('Error loading image:', error));
  }, [props.sighting.picture]);

  return (
    <Link href={{pathname: "/detail", params: {id: props.sighting.id.toString()}}} asChild>
        <View className="shadow-lg border border-gray p-10 w-auto h-auto flex rounded-xl mt-6">
          {props.sighting.picture && (
            <Image
              source={{ uri: imageUri }}
              className="w-80 h-80 m-auto"
              resizeMode="cover"
            />
          )}
          <Text className="text-2xl underline">{props.sighting.id}. {props.sighting.description}</Text>
          <Text className="md:font-bold underline">Name:</Text>
          <Text>{props.sighting.witnessName}</Text>
          <Text className="md:font-bold underline">Latitude:</Text>
          <Text>Latitude: {props.sighting.location.latitude}</Text>
          <Text className="md:font-bold underline">Longitude:</Text>
          <Text>{props.sighting.location.longitude}</Text>
          <Text className="md:font-bold underline">Status:</Text>
          <Text>{props.sighting.status}</Text>
          <Text className="md:font-bold underline">Date:</Text>
          <Text>{formatDate(props.sighting.dateTime)}</Text>
          <Text className="md:font-bold underline">Contact:</Text>
          <Text>{props.sighting.witnessContact}</Text>
        </View>
    </Link>
  )
}