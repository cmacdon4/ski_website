import Parse from "../parseConfig";

const Weather = Parse.Object.extend("Weather");

export const parseWeather = (obj) => ({
  id: obj.id,
  locationName: obj.get("Location"),
  condition: obj.get("Condition"),
  temperature: obj.get("Temperature"),
  windSpeed: obj.get("windSpeed"),
  humidity: obj.get("Humidity"),
  iconURL: obj.get("iconURL"),
  feelsLike: obj.get("feelsLike"),
  snowDepthFT: obj.get("snowDepthFT"),
});

export async function getWeatherByLocation(locationName) {
  const query = new Parse.Query(Weather);
  query.equalTo("Location", locationName);
  const result = await query.first();
  return result ? parseWeather(result) : null;
}

export default Weather;
