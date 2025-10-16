import React, { useEffect, useState } from "react";
import { getWeather } from "../../services/weatherService.js";
import styles from "./WeatherWidget.module.css"; // Import CSS module for styling



// Safe initial shape so first render never crashes
const INITIAL = {
  location: { name: "Loading..." },
  current: { temp_c: null, condition: { text: "" } },
};

export default function WeatherWidget() {
  const [data, setData] = useState(INITIAL);
  const [error, setError] = useState("");
  const [useF, setUseF] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const w = await getWeather();
        // Validate shape defensively
        if (
          w &&
          w.location &&
          typeof w.location.name === "string" &&
          w.current &&
          "temp_c" in w.current &&
          w.current.condition &&
          typeof w.current.condition.text === "string"
        ) {
          if (mounted) setData(w);
        } else {
          if (mounted) setError("Weather data is missing required fields.");
        }
      } catch {
        if (mounted) setError("Could not load /weather.json.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const name = data?.location?.name ?? "Unknown";
  const tempC = data?.current?.temp_c;
  const tempF =
    typeof tempC === "number" ? Math.round((tempC * 9) / 5 + 32) : null;
  const cond = data?.current?.condition?.text || "—";
  const tempDisplay =
    typeof tempC === "number"
      ? useF
        ? `${tempF}\u00B0F`
        : `${tempC}\u00B0C`
      : "—";

  return (
    <div className={styles.weatherWidget}>
      <h2 className={styles.weatherTitle}>Weather</h2>
      {error ? (
        <p className={styles.weatherError}>{error}</p>
      ) : (
        <>
          <p className={styles.weatherInfo}>
            {name}: {tempDisplay} {"\u2014"} {cond}
          </p>
          <button
            type="button"
            onClick={() => setUseF((v) => !v)}
            aria-pressed={useF}
            className={styles.toggleButton}
          >
            Show in °{useF ? "C" : "F"}
          </button>
        </>
      )}
    </div>
  );
}
