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
    <main className={styles.teamSection}>
      <h1>Meet the Team</h1>
      <h2>The Exec Board</h2>

      {loading && <p className="container">Loading team…</p>}
      {err && (
        <p className="container" style={{ color: "#b00020" }}>
          {err}
        </p>
      )}

      {!loading && !err && (
        <div className={styles.teamGrid}>
          {members.map((m) => (
            <TeamMemberCard key={m.id ?? `${m.name}-${m.role}`} member={m} />
          ))}
        </div>
      )}
    </main>
  );
}
