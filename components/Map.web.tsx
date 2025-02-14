"use dom"

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css" 
import L from 'leaflet';
import { Sighting } from '@/types';

export default function Map({ markers } : { markers: Sighting[] }) {
    const iconX = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/similonap/public_icons/refs/heads/main/location-pin.png',
      iconSize: [48, 48],
      popupAnchor: [-3, 0],
    });
  
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
            
            {   markers && 
                markers.map((marker, index) => (
                    <Marker key={index} position={[marker.location.latitude, marker.location.longitude]} icon={iconX}>
                        <Popup >
                            <div style={{backgroundColor: 'white', padding: 10, width: 100}}>
                                <p>{marker.description}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))
            }
    
        </MapContainer>
    );
}