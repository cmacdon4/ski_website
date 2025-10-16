import axios from "axios";

export const getWeather = async () => {
  try {
    // Files inside /public are served at the root
    const res = await axios.get("/weather.json");
    return res.data;
  } catch {
    // Return the same shape so the UI never breaks
    return {
      location: { name: "Unknown" },
      current: { temp_c: null, condition: { text: "" } },
    };
  }
};
