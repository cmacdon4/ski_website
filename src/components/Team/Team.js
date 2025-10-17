import React, { useEffect, useState } from "react";
import styles from "./Team.module.css";
import { getTeamMembers } from "../../models/Team";
import TeamMemberCard from "./TeamMemberCard";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getTeamMembers();
        setMembers(data);
      } catch (e) {
        setErr("Could not load team data.");
      } finally {
        setLoading(false);
      }
    })();
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
            <TeamMemberCard key={m.id} member={m} />
          ))}
        </div>
      )}
    </main>
  );
}
