import { Sighting } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactElement,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SightingsContextType {
  sightings: Sighting[];
  addSighting: (sighting: Sighting) => Promise<Sighting>;
}

const SightingsContext = createContext<SightingsContextType>({
  sightings: [],
  addSighting: async (sighting: Sighting) => sighting,
});

export const SightingsProvider = ({ children }: { children: ReactElement }) => {
  const [sightings, setSightings] = useState<Sighting[]>([]);

  // Get sightings and store them in AsyncStorage
  async function initSightings() {
    try {
      const response = await fetch(
        "https://sampleapis.assimilate.be/ufo/sightings"
      );
      const sightings = await response.json();
      await AsyncStorage.setItem("@app:sightings", JSON.stringify(sightings));
      setSightings(sightings);
    } catch (error) {
      console.error("Error setting sightings:", error);
    }
  }

  // Add sighting
  async function addSighting(sighting: Sighting): Promise<Sighting> {
    try {
      const storedData = await AsyncStorage.getItem("@app:sightings");
      const sightingsList: Sighting[] = storedData
        ? JSON.parse(storedData)
        : [];
      const updatedSightings = [...sightingsList, sighting];
      await AsyncStorage.setItem(
        "@app:sightings",
        JSON.stringify(updatedSightings)
      );
      setSightings(updatedSightings);
    } catch (error) {
      console.error("Error adding sighting:", error);
    }
    return sighting;
  }

  // Get sightings only initially
  useEffect(() => {
    async function fetchSightings() {
      try {
        const storedData = await AsyncStorage.getItem("@app:sightings");
        if (storedData) {
          setSightings(JSON.parse(storedData));
        } else {
          await initSightings();
        }
      } catch (error) {
        console.error("Error fetching sightings:", error);
      }
    }
    fetchSightings();
  }, []);

  // Add Context Provider for all children
  return (
    <SightingsContext.Provider value={{ sightings, addSighting }}>
      {children}
    </SightingsContext.Provider>
  );
};

export const useSightings = () => useContext(SightingsContext);
