import { Tabs } from "expo-router";
import "../../global.css"; 
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
        )}} 
      />
      <Tabs.Screen name="map" options={{ title: "Home", tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
        )}} 
      />
      <Tabs.Screen name="add" options={{ title: "Home", tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
        )}} 
      />
    </Tabs>
  );
}
