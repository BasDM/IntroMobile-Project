"use dom"

import { Sighting } from "@/types";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css" 
import L from 'leaflet';
import { useEffect } from "react";

export default function LocationPicker({ sighting, setSighting }: { sighting: Sighting, setSighting: Function }) {
    const iconX = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/similonap/public_icons/refs/heads/main/location-pin.png',
      iconSize: [48, 48],
      popupAnchor: [-3, 0],
    });

    const MapClickEvent = () => {
        useMapEvents({
          click(e) {
            setSighting((prev: Sighting) => ({
                ...prev,
                location: {
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng,
                },
            }));
          },
        });
        return false;
    }

    return (
        <MapContainer
            id="map"
            center={[50, 4]}
            zoom={4}
            scrollWheelZoom={true}
            style={{ width: '100%', height: '500px' }}
            attributionControl={false}
        >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickEvent />
            <Marker position={[sighting.location.latitude, sighting.location.longitude]} icon={iconX} />
        </MapContainer>
    )
}