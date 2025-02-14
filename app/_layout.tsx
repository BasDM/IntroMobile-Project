import { Stack } from "expo-router";
import "../global.css"; 
import { SightingsProvider } from "@/Providers/Sightings";

export default function RootLayout() {
  return (
    <SightingsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SightingsProvider>
  );
}
