import { Sighting } from "@/types";
import React, { createContext, useContext, useState, useEffect, ReactElement } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SightingsContextType {
    sightings: Sighting[];
    addSighting: (sighting: Sighting) => Promise<Sighting>;
}

const SightingsContext = createContext<SightingsContextType>({
    sightings: [],
    addSighting: async (sighting: Sighting) => sighting
});

export const SightingsProvider = ({ children } : { children: ReactElement }) => {
    const [sightings, setSightings] = useState<Sighting[]>([]);

    // Get sightings and store them in AsyncStorage
    function initSightings() {
        fetch("https://sampleapis.assimilate.be/ufo/sightings")
            .then((response) => response.json())
            .then(async (sightings) => {
                AsyncStorage.setItem(
                    '@app:sightings',
                    JSON.stringify(sightings)
                )
                    .then(() =>
                        setSightings(sightings)
                    )
                    .catch((error) => console.error('Error setting sightings:', error));
            });
    }

    // Add sighting
    async function addSighting(sighting: Sighting): Promise<Sighting> {
        AsyncStorage.getItem('@app:sightings')
            .then((storedData) => {
                const sightingsList: Sighting[] = storedData ? JSON.parse(storedData) : [];
                const updatedSightings = [...sightingsList, sighting];
                AsyncStorage.setItem('@app:sightings', JSON.stringify(updatedSightings))
                    .then(() => setSightings(updatedSightings))
                    .catch((error) => console.error('Error adding sighting:', error));
            })
            .catch((error) => console.error('Error adding sighting:', error));
        return sighting;
    }

    // Get sightings only initially
    useEffect(() => {
        AsyncStorage.getItem('@app:sightings')
            .then((storedData) => {
                if (storedData) {
                    setSightings(JSON.parse(storedData));
                } else {
                    initSightings();
                }
            })
    }, []);

    // Add Context Provider for all children
    return (
        <SightingsContext.Provider value={{ sightings, addSighting }}>
            {children}
        </SightingsContext.Provider>
    )
};

export const useSightings = () => useContext(SightingsContext);

