import Parse from "../parseConfig";

// Fetch all weather objects
export async function getWeather() {
  const Weather = Parse.Object.extend("Weather");
  const query = new Parse.Query(Weather);
  query.descending("updatedAt");
  const results = await query.find();

  return results.map((obj) => ({
    id: obj.id,
    location: obj.get("Location"),
    condition: obj.get("Condition"),
    temperature: obj.get("Temperature"),
    windSpeed: obj.get("windSpeed"),
    humidity: obj.get("Humidity"),
    iconURL: obj.get("iconURL"),
    feelsLike: obj.get("feelsLike"),
    snowDepthFT: obj.get("snowDepthFT"),
    updatedAt: obj.get("updatedAt"),
  }));
}

// Fetch a single weather object by location name
export async function getWeatherByLocation(locationName) {
  const Weather = Parse.Object.extend("Weather");
  const query = new Parse.Query(Weather);
  query.equalTo("Location", locationName);
  query.descending("updatedAt");

  const obj = await query.first();
  if (!obj) return null;

  return {
    id: obj.id,
    location: obj.get("Location"),
    condition: obj.get("Condition"),
    temperature: obj.get("Temperature"),
    windSpeed: obj.get("windSpeed"),
    humidity: obj.get("Humidity"),
    iconURL: obj.get("iconURL"),
    feelsLike: obj.get("feelsLike"),
    snowDepthFT: obj.get("snowDepthFT"),
    updatedAt: obj.get("updatedAt"),
  };
}
