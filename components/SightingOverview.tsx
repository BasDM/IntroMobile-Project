import { Sighting } from "@/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { LoadImage } from "@/functions/Images";
import { formatDate } from "@/functions/Dates";

export default function SightingOverview(props: { sighting: Sighting }) {
  const [imageUri, setImageUri] = useState<string>(props.sighting.picture);

  useEffect(() => {
    LoadImage(props.sighting.picture)
      .then((uri) => {
        setImageUri(uri);
      })
      .catch(error => console.error('Error loading image:', error));
  }, [props.sighting.picture]);

  return (
    <Link
      href={{
        pathname: "/detail",
        params: { id: props.sighting.id.toString() },
      }}
      asChild
    >
      <Pressable>
        <View className="shadow-lg border border-gray w-auto flex rounded-xl mt-6 flex-row justify-between overflow-hidden">
          <View className="p-5">
            <Text className="text-2xs underline md:font-bold mb-2">{props.sighting.description}</Text>
            <Text>{props.sighting.witnessName}</Text>
            <Text>{formatDate(props.sighting.dateTime)}</Text>
          </View>
          {props.sighting.picture && (
            <Image
              source={{ uri: imageUri }}
              className="w-40 h-40"
              resizeMode="cover"
            />
          )}
        </View>
      </Pressable>
    </Link>
  );
}
