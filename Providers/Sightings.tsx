import { Sighting } from "@/types";
import React, { createContext, useContext, useState, useEffect, ReactElement } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SightingsContextType {
    sightings: Sighting[];
    getSightings: () => Promise<Sighting[]>;
    addSighting: (sighting: Sighting) => Promise<Sighting>;
}

const SightingsContext = createContext<SightingsContextType>({
    sightings: [],
    getSightings: async () => [],
    addSighting: async (sighting: Sighting) => sighting
});

export const SightingsProvider = ({ children } : { children: ReactElement }) => {
    const [sightings, setSightings] = useState<Sighting[]>([]);

    // Get sightings and store them in AsyncStorage
    function initSightings() {
        fetch("https://sampleapis.assimilate.be/ufo/sightings")
            .then((response) => response.json())
            .then(async (sightings) => {
                try {
                    await AsyncStorage.setItem(
                        '@app:sightings',
                        JSON.stringify(sightings)
                    );
                    setSightings(sightings);
                } catch (e) { 
                    console.error(e);
                }
            });
    }

    // Get sightings
    async function getSightings(): Promise<Sighting[]> {
        try {
            const storedData = await AsyncStorage.getItem('@app:sightings');
            return storedData ? JSON.parse(storedData) : [];
        } catch (error) {
            console.error('Error getting sightings:', error);
            return [];
        }
    }

    // Add sighting
    async function addSighting(sighting: Sighting): Promise<Sighting> {
        try {
            const storedData = await AsyncStorage.getItem('@app:sightings');
            const sightingsList: Sighting[] = storedData ? JSON.parse(storedData) : [];
            const updatedSightings = [...sightingsList, sighting];
            
            await AsyncStorage.setItem('@app:sightings', JSON.stringify(updatedSightings));
            setSightings(updatedSightings);
        } catch (error) {
            console.error('Error adding sighting:', error);
        }
        return sighting;
    }

    // Get sightings only initially
    useEffect(() => {
        initSightings()
    }, []);

    return (
        <SightingsContext.Provider value={{ sightings, getSightings, addSighting }}>
            {children}
        </SightingsContext.Provider>
    )
};

export const useSightings = () => useContext(SightingsContext);

