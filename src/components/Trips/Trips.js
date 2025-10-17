import React, { useEffect, useState } from "react";
import styles from "./Trips.module.css";
import TripsMap from "./TripsMap";
import { getAllLocations } from "../../models/Location";


export default function Trips() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllLocations();
        setLocations(data);
        if (data.length > 0) setSelectedLocation(data[0]);
      } catch (e) {
        console.error(e);
        setErr("Could not load trip data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading trips...</p>;
  if (err) return <p style={{ color: "#b00020" }}>{err}</p>;

  return (
    <main className={styles.tripsSection}>
      <h1>Our Trips</h1>
      <p>Explore our favorite destinations and current conditions!</p>

      {/* Dropdown */}
      <div className={styles.dropdownWrapper}>
        <label htmlFor="tripSelect">Select Location: </label>
        <select
          id="tripSelect"
          onChange={(e) => {
            const loc = locations.find((l) => l.id === e.target.value);
            setSelectedLocation(loc);
          }}
          value={selectedLocation?.id || ""}
        >
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      {selectedLocation && (
        <>
          <div className={styles.cardContainer}>
            {/* Left Card: Location Info */}
            <div className={styles.locationCard}>
              {selectedLocation.imageUrl && (
                <img
                  src={selectedLocation.imageUrl}
                  alt={selectedLocation.name}
                  className={styles.locationImage}
                />
              )}
              <h2>{selectedLocation.name} {selectedLocation.countryFlag}</h2>
              <p>{selectedLocation.region}</p>
              <p>{selectedLocation.description}</p>
              <p>
                Altitude: {selectedLocation.altitude} m | Summit:{" "}
                {selectedLocation.summit} m
              </p>
              <a
                href={selectedLocation.websiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit Resort Website
              </a>
            </div>

            {/* Right Card: Weather Info */}
            <div className={styles.weatherCard}>
              <h3>Current Weather</h3>
              {selectedLocation.weather ? (
                <>
                  <img
                    src={selectedLocation.weather.iconURL}
                    alt={selectedLocation.weather.condition}
                    className={styles.weatherIcon}
                  />
                  <p className={styles.weatherCondition}>
                    {selectedLocation.weather.condition}
                  </p>
                  <p>
                    Temperature: {selectedLocation.weather.temperature}°F
                    <br />
                    Feels like: {selectedLocation.weather.feelsLike}°F
                  </p>
                  <p>
                    Snow depth: {selectedLocation.weather.snowDepthFT} ft
                    <br />
                    Wind: {selectedLocation.weather.windSpeed} mph
                    <br />
                    Humidity: {selectedLocation.weather.humidity}%
                  </p>
                </>
              ) : (
                <p>No weather data available.</p>
              )}
            </div>
          </div>

          {/* Map (placed below cards) */}
          <TripsMap
            locations={locations}
            selectedLocation={selectedLocation}
          />
        </>
      )}
    </main>
  );
}
