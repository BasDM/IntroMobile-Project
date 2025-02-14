"use dom"

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css" 
import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import L from 'leaflet';

interface PointOfInterest {
    name: string;
    location: {
      latitude: number;
      longitude: number;
    };
}


const POINTS_OF_INTEREST : PointOfInterest[] = [
    {
    name: "AP Hogeschool",
    location: {
        latitude: 51.2243,
        longitude: 4.3852
    },
    },
    {
    name: "London Bridge",
    location: {
        latitude: 51.5055,
        longitude: -0.0754
    }
    },
    {
    name: "Eiffel Tower",
    location: {
        latitude: 48.8584,
        longitude: 2.2945
    }
    },
    {
    name: "Statue of Liberty",
    location: {
        latitude: 40.6892,
        longitude: -74.0445
    }
    }
];

interface LocationHandlerProps {
    addMarker: (lat: number, lng: number) => void;
}

const LocationHandler = ({addMarker} : LocationHandlerProps) => {
    const map = useMapEvents({
        dragend: () => {
            console.log(map.getCenter());
        },
        click: (e: any) => {
            addMarker(e.latlng.lat, e.latlng.lng);
        }
    });

    return null;
}

export default function Map() {
    const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>(POINTS_OF_INTEREST);

    const iconX = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/similonap/public_icons/refs/heads/main/location-pin.png',
      iconSize: [48, 48],
      popupAnchor: [-3, 0],
    });
  
    const addPointOfInterest = (lat: number, lng: number) => {
      setPointsOfInterest([...pointsOfInterest, {name: "New Point", location: {latitude: lat, longitude: lng}}]);
    }
  
    return (
        <MapContainer
            center={[50, 4] as [number, number]}
            zoom={4}
            scrollWheelZoom={false}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            attributionControl={false}
        >
    
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <LocationHandler addMarker={(lat, lng) => addPointOfInterest(lat,lng)} />

            {pointsOfInterest.map((point, index) => (
                <Marker key={index} position={[point.location.latitude, point.location.longitude]} icon={iconX}>
                    <Popup >
                        <div style={{backgroundColor: 'white', padding: 10, width: 100}}>
                            <p>{point.name}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
    
        </MapContainer>
    );
}