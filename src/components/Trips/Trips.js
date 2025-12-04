import React, { useEffect, useState } from "react";
import styles from "./Trips.module.css";
import TripsMap from "./TripsMap";
import { getAllLocations } from "../../models/Location";

import { fetchOpenMeteoWeather } from "../../services/fetchOpenMeteo";

export default function Trips() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [liveWeather, setLiveWeather] = useState(null);

  // Fetch live weather when selectedLocation changes
  useEffect(() => {
    if (!selectedLocation?.coords) return;

    (async () => {
      try {
        const { latitude, longitude } = selectedLocation.coords;
        const live = await fetchOpenMeteoWeather(latitude, longitude);
        setLiveWeather(live);
      } catch (e) {
        console.error("Live weather failed", e);
        setLiveWeather(null);
      }
    })();
  }, [selectedLocation]);

  // Load all resort locations
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
            {/* ----- Left Card: Location Info ----- */}
            <div className={styles.locationCard}>
              {selectedLocation.imageUrl && (
                <img
                  src={selectedLocation.imageUrl}
                  alt={selectedLocation.name}
                  className={styles.locationImage}
                />
              )}

              <h2>
                {selectedLocation.name} {selectedLocation.countryFlag}
              </h2>

              <p>{selectedLocation.region}</p>
              <p>{selectedLocation.description}</p>
              <p>
                Altitude: {selectedLocation.altitude} ft | Summit:{" "}
                {selectedLocation.summit} ft
              </p>

              <a
                href={selectedLocation.websiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit Website
              </a>
            </div>

            {/* ----- Right Card: Weather Info ----- */}
            <div className={styles.weatherCard}>
              <h3>Current Weather</h3>

              {liveWeather ? (
                <>
                <div className={styles.conditionRow}>
                  <span className={styles.weatherText}>
                    {liveWeather.condition}:
                  </span>
                  <img
                    src={liveWeather.iconURL}
                    alt={liveWeather.condition}
                    className={styles.weatherIcon}
                  />
                </div>

                <p className={styles.weatherText}>
                  Temperature: {liveWeather.temperature}°F
                </p>

                <p className={styles.weatherText}>
                  Wind: {liveWeather.windSpeed} mph
                </p>

                <p className={styles.weatherText}>
                  Humidity: {liveWeather.humidity}%
                </p>
                </>
              ) : selectedLocation.weather ? (
                <>
                  <img
                    src={selectedLocation.weather.iconURL}
                    alt={selectedLocation.weather.condition}
                    className={styles.weatherIcon}
                  />
                  <p>{selectedLocation.weather.condition}</p>
                  <p>
                    Temperature: {selectedLocation.weather.temperature}°F
                  </p>
                  <p>Wind: {selectedLocation.weather.windSpeed} mph</p>
                  <p>Humidity: {selectedLocation.weather.humidity}%</p>
                </>
              ) : (
                <p>No weather data available.</p>
              )}
            </div>
          </div>

          {/* ----- Map Below Cards ----- */}
          <TripsMap
            locations={locations}
            selectedLocation={selectedLocation}
            liveWeather={liveWeather}
          />

        </>
      )}
    </main>
  );
}
