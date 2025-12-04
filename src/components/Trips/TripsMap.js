import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Trips.module.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useMap } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});



function RecenterMap({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom);
  return null;
}


export default function TripsMap({ locations, selectedLocation, liveWeather }) {
  const defaultCenter = [51.0, -115.5];
  const center =
    selectedLocation && selectedLocation.coords
      ? [selectedLocation.coords.latitude, selectedLocation.coords.longitude]
      : defaultCenter;

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={center}
        zoom={6}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        {/* Automatically recenter + zoom on location change */}
        {selectedLocation?.coords && (
          <RecenterMap
            coords={[
              selectedLocation.coords.latitude,
              selectedLocation.coords.longitude
            ]}
            zoom={8}  // ← Set your desired zoom level here
          />
        )}

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {locations
          .filter((loc) => loc.coords)
          .map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.coords.latitude, loc.coords.longitude]}
            >
              <Popup>
                <b>{loc.name}</b>
                <br />
                {loc.region}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
