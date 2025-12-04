import React, { useEffect, useState } from "react";
import styles from "./About.module.css";

import pyramid from "../../img/Pyramid.png";

// Team imports
import { getTeamMembers } from "../../models/Team";
import TeamMemberCard from "../Team/TeamMemberCard";

export default function About() {
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
    <main>
      {/* ===== Hero Section ===== */}
      <section className={styles.aboutHero}>
        <img
          src={pyramid}
          alt="Ski Club Banner"
          className={styles.heroImage}
        />
        <h1>About the Notre Dame Ski & Snowboard Club</h1>
      </section>

      {/* ===== About Info Cards ===== */}
      <section className={styles.aboutCards}>
        <div className={styles.aboutCard}>
          <h2>Who We Are</h2>
          <p>
            We’re a student-run club creating affordable ski & ride opportunities
            for Notre Dame students—weekly trips, racing, social events, and more.
          </p>
        </div>

        <div className={styles.aboutCard}>
          <h2>Trips & Events</h2>
          <p>
            We organize day trips and weekenders throughout the season. Expect
            carpools, discounted lift tickets, and a friendly community.
          </p>
        </div>

        <div className={styles.aboutCard}>
          <h2>Inclusive Racing Program</h2>
          <p>
            Our alpine racing team competes across the Midwest. All levels welcome.
            Members also get access to partner gear discounts.
          </p>
        </div>
      </section>

      {/* ===== Team Section (Merged) ===== */}
      <section className={styles.teamSection}>
        <h2>Meet the Exec Team</h2>

        {loading && <p className={styles.loading}>Loading team…</p>}
        {err && <p className={styles.error}>{err}</p>}

        {!loading && !err && (
          <div className={styles.teamGrid}>
            {members.map((m) => (
              <TeamMemberCard key={m.id} member={m} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}