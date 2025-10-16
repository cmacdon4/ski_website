import React, { useEffect, useState } from "react";
import { getWeather } from "../../services/weatherService.js"; // Service for fetching weather data
import styles from "./WeatherWidget.module.css"; // Import CSS module for styling

/**
 * WeatherWidget component displays current weather conditions
 * Features temperature conversion between Celsius and Fahrenheit
 * Handles loading states and error conditions gracefully
 * Uses defensive programming to prevent crashes from malformed data
 */

// Safe initial shape so first render never crashes
const INITIAL = {
  location: { name: "Loading..." },
  current: { temp_c: null, condition: { text: "" } },
};

export default function WeatherWidget() {
  // State management for weather data, errors, and temperature unit preference
  const [data, setData] = useState(INITIAL);
  const [error, setError] = useState("");
  const [useF, setUseF] = useState(false); // Temperature unit toggle (Celsius/Fahrenheit)

  // Effect hook to fetch weather data on component mount
  useEffect(() => {
    let mounted = true; // Flag to prevent state updates after component unmount
    (async () => {
      try {
        const w = await getWeather(); // Fetch weather data from service
        // Validate shape defensively to prevent crashes from malformed API responses
        if (
          w &&
          w.location &&
          typeof w.location.name === "string" &&
          w.current &&
          "temp_c" in w.current &&
          w.current.condition &&
          typeof w.current.condition.text === "string"
        ) {
          if (mounted) setData(w); // Update state only if component is still mounted
        } else {
          if (mounted) setError("Weather data is missing required fields.");
        }
      } catch {
        if (mounted) setError("Could not load /weather.json."); // Handle fetch errors
      }
    })();
    return () => {
      mounted = false; // Cleanup function to prevent memory leaks
    };
  }, []); // Empty dependency array means this runs only once on mount

  // Extract and process weather data with safe fallbacks
  const name = data?.location?.name ?? "Unknown";
  const tempC = data?.current?.temp_c;
  const tempF =
    typeof tempC === "number" ? Math.round((tempC * 9) / 5 + 32) : null; // Convert C to F
  const cond = data?.current?.condition?.text || "—";
  const tempDisplay =
    typeof tempC === "number"
      ? useF
        ? `${tempF}\u00B0F` // Display Fahrenheit
        : `${tempC}\u00B0C` // Display Celsius
      : "—"; // Fallback for missing temperature data

  return (
    <div className={styles.weatherWidget}>
      <h2 className={styles.weatherTitle}>Weather</h2>
      {error ? (
        // Error state display
        <p className={styles.weatherError}>{error}</p>
      ) : (
        <>
          {/* Weather information display */}
          <p className={styles.weatherInfo}>
            {name}: {tempDisplay} {"\u2014"} {cond}
          </p>
          {/* Temperature unit toggle button */}
          <button
            type="button"
            onClick={() => setUseF((v) => !v)} // Toggle between C and F
            aria-pressed={useF} // Accessibility attribute for screen readers
            className={styles.toggleButton}
          >
            Show in °{useF ? "C" : "F"}
          </button>
        </>
      )}
    </div>
  );
}
