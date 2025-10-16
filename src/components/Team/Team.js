import React, { useEffect, useState } from "react";
import styles from "./Team.module.css";

import { getTeam } from "../../services/teamService";
import TeamMemberCard from "./TeamMemberCard";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getTeam();
        if (!Array.isArray(data)) throw new Error("Bad team.json shape");
        if (mounted) setMembers(data);
      } catch (e) {
        if (mounted) setErr("Could not load team.json.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    // Map "team-section" to styles.teamSection. 'main' likely comes from global CSS.
    <main className={styles.teamSection}>
      <h1>Meet the Team</h1>
      <h2>The Exec Board</h2>

      {/* 'container' is likely a global utility class, so we leave it as a string */}
      {loading && <p className="container">Loading team…</p>}
      {err && (
        // 'container' is likely global. Note: Inline styles are fine, but
        // a scoped error class in the module is a cleaner solution.
        <p className="container" style={{ color: "#b00020" }}>
          {err}
        </p>
      )}

      {!loading && !err && (
        // Map "team-grid" to styles.teamGrid
        <div className={styles.teamGrid}>
          {members.map((m) => (
            <TeamMemberCard key={m.id ?? `${m.name}-${m.role}`} member={m} />
          ))}
        </div>
      )}
    </main>
  );
}
