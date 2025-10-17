import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Trips.module.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function TripsMap({ locations, selectedLocation }) {
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
                    <br />
                    {loc.weather
                      ? `${loc.weather.condition} — ${loc.weather.temperature}°F`
                      : "No weather data"}
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      );      
}
