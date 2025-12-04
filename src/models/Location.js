import Parse from "../parseConfig";

const Location = Parse.Object.extend("Location");

export const parseLocation = (obj) => ({
  id: obj.id,
  name: obj.get("Name"),
  region: obj.get("Region"),
  description: obj.get("Description"),
  coords: obj.get("Cords"),
  altitude: obj.get("Altitude"),
  summit: obj.get("Summit"),
  countryFlag: obj.get("countryFlag"),
  websiteUrl: obj.get("websiteUrl"),
});

export async function getAllLocations() {
  const query = new Parse.Query(Location);
  query.include("Weather");
  query.ascending("Name");

  const results = await query.find();
  return results.map(parseLocation);
}

export default Location;
