import React from "react";
import styles from "./About.module.css"; // CSS modules for component-specific styling

import pyramid from "../../img/Pyramid.png" // Hero banner image for about page

/**
 * About page component that provides information about the ski club
 * Displays club mission, activities, and racing program details
 * Uses card-based layout for easy reading and visual appeal
 */
export default function About() {
  return (
    <main>
      {/* Hero section with banner image and main heading */}
      <section className={styles.aboutHero}>
        <img
          src={pyramid}
          alt="Ski Club Banner"
          className={styles.heroImage}
        />
        <h1>About the Notre Dame Ski & Snowboard Club</h1>
      </section>

      {/* Information cards section with key club details */}
      <section className={styles.aboutCards}>
        {/* Club identity and mission card */}
        <div className={styles.aboutCard}>
          <h2>Who We Are</h2>
          <p>
            We're a student-run club creating affordable ski & ride
            opportunities for Notre Dame students—weekly trips, racing, social
            events, and more.
          </p>
        </div>

        {/* Trip and event information card */}
        <div className={styles.aboutCard}>
          <h2>Trips & Events</h2>
          <p>
            We organize day trips and weekenders throughout the season. Expect
            carpools, discounted lift tickets, and a friendly community.
          </p>
        </div>

        {/* Racing program information card */}
        <div className={styles.aboutCard}>
          <h2>Inclusive Racing Program</h2>
          <p>
            Our alpine racing team competes across the Midwest. All levels
            welcome. Members also get access to partner gear discounts.
          </p>
        </div>
      </section>
    </main>
  );
}
