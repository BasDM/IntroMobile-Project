import { Sighting } from "@/types";

// Get sightings
export function getSightings() : Promise<Sighting[]> {
    return fetch("https://sampleapis.assimilate.be/ufo/sightings")
        .then(response => response.json())
        .then(data => {
            return data as Sighting[];
        });   
}