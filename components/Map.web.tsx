"use dom"

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css" 
import L from 'leaflet';
import { Sighting } from '@/types';
import { useRouter } from 'expo-router';

export default function Map({ markers } : { markers: Sighting[] }) {
    const router = useRouter();
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
                        <Popup>
                            <div 
                                style={{backgroundColor: 'white', padding: 10, width: 100}}
                                onClick={() => router.push({pathname: '/detail', params: { id: marker.id.toString() }})} >
                                <img src={marker.picture} alt="ufo image" />
                                <p>
                                    {marker.description.length > 30 
                                        ? `${marker.description.substring(0, 30)}...` 
                                        : marker.description}
                                    <a href="#" onClick={() => router.push({pathname: '/detail', params: { id: marker.id.toString() }})}> view more</a>
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))
            }
    
        </MapContainer>
    );
}