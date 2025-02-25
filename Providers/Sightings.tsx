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
  addSighting: (sighting: Sighting) => Promise.resolve(sighting),
});

export const SightingsProvider = ({ children }: { children: ReactElement }) => {
  const [sightings, setSightings] = useState<Sighting[]>([]);

  // Get sightings and store them in AsyncStorage
  function initSightings() {
    fetch("https://sampleapis.assimilate.be/ufo/sightings")
      .then((response) => response.json())
      .then((sightings) => {
        AsyncStorage.setItem("@app:sightings", JSON.stringify(sightings))
          .then(() => setSightings(sightings))
          .catch((error) => console.error("Error setting sightings:", error));
      })
      .catch((error) => console.error("Error fetching sightings:", error));
  }

  // Add sighting
  function addSighting(sighting: Sighting): Promise<Sighting> {
    return AsyncStorage.getItem("@app:sightings")
      .then((storedData) => {
        const sightingsList: Sighting[] = storedData
          ? JSON.parse(storedData)
          : [];
        const updatedSightings = [...sightingsList, sighting];
        return AsyncStorage.setItem(
          "@app:sightings",
          JSON.stringify(updatedSightings)
        ).then(() => {
          setSightings(updatedSightings);
          return sighting;
        });
      })
      .catch((error) => {
        console.error("Error adding sighting:", error);
        return sighting;
      });
  }

  // Get sightings only initially
  useEffect(() => {
    function fetchSightings() {
      AsyncStorage.getItem("@app:sightings")
        .then((storedData) => {
          if (storedData) {
            setSightings(JSON.parse(storedData));
          } else {
            initSightings();
          }
        })
        .catch((error) => console.error("Error fetching sightings:", error));
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
