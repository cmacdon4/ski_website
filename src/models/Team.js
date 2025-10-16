import Parse from "../parseConfig.js";

// Example: Fetch all team members
export async function fetchTeamMembers() {
  const Team = Parse.Object.extend("Team");
  const query = new Parse.Query(Team);
  query.ascending("name");
  return await query.find();
}
