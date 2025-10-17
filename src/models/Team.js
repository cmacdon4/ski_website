// src/models/Team.js
export const parseTeamMember = (obj) => ({
  id: obj.id,
  name: obj.name,
  role: obj.role,
  image: obj.image,
});

// Load data asynchronously
export async function getTeamMembers() {
  try {
    const res = await fetch("/team.json");
    if (!res.ok) throw new Error("Failed to load team.json");

    const data = await res.json();
    return data.map(parseTeamMember);
  } catch (err) {
    console.error("Error loading team:", err);
    throw err;
  }
}
