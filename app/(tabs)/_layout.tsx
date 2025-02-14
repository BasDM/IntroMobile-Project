import { Tabs } from "expo-router";
import "../../global.css"; 

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="map" options={{ title: "Map" }} />
      <Tabs.Screen name="add" options={{ title: "Add" }} />
    </Tabs>
  );
}
