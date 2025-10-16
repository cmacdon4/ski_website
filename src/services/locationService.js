import Parse from "../parseConfig";

export async function getLocations() {
  const Location = Parse.Object.extend("Location");
  const query = new Parse.Query(Location);
  query.include("Weather"); // include the pointer object
  query.ascending("Name");

  const results = await query.find();

  return results.map((obj) => {
    const w = obj.get("Weather"); // pointer field name

    return {
      id: obj.id,
      name: obj.get("Name"),
      region: obj.get("Region"),
      coords: obj.get("Cords"),
      description: obj.get("Description"),
      altitude: obj.get("Altitude"), 
      summit: obj.get("Summit"),    
      countryFlag: obj.get("countryFlag"),
      websiteUrl: obj.get("websiteUrl"),

      weather: w
        ? {
            condition: w.get("Condition"),
            temperature: w.get("Temperature"),
            windSpeed: w.get("windSpeed"),
            humidity: w.get("Humidity"),
            iconURL: w.get("iconURL"),
            feelsLike: w.get("feelsLike"),
            snowDepthFT: w.get("snowDepthFT"),
          }
        : null,
    };
  });
}
