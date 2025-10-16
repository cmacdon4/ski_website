// Team service for fetching team member data from JSON file
import axios from "axios"; // HTTP client for API requests

// Async function to fetch team data from public JSON file
export const getTeam = async () => {
  // Fetch team.json from public folder (served as static file)
  const res = await axios.get("/team.json");
  return res.data; // Return the parsed JSON data
};
