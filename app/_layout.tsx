import { Stack } from "expo-router";
import "../global.css"; 
import { SightingsProvider } from "@/Providers/Sightings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SightingsProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SightingsProvider>
    </GestureHandlerRootView>
  );
}
