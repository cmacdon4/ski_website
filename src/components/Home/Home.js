import React from "react";
import styles from "./Home.module.css"; // CSS modules for component styling

// Import images as modules for webpack bundling
import logo from "../../img/No_text_logo.jpg" // Club logo
import trip1 from "../../img/sam.png"; // my friend sam
import trip2 from "../../img/mountain_top.JPG"; // Mountain summit photo
import trip3 from "../../img/night.jpg" // Night skiing photo

export default function Home() {
  return (
    <main>
      <section className={styles.hero}> {/* Hero section with logo and CTA */}
        <img
          src={logo}
          alt="Club Logo"
          className={styles.heroLogo}
        />
        <h1>Notre Dame Club Ski Team</h1> {/* Main heading */}
        <p>Re-established 2023</p> {/* Subtitle */}
        <a
          href="https://groupme.com/join_group/96582520/YCi5xE1y"
          target="_blank"
          rel="noreferrer"
          className={styles.ctaButton}
        >
          Join Our GroupMe
        </a>
      </section>

      <section className={styles.highlights}> {/* Statistics highlights section */}
        <div className={styles.highlightCard}> {/* Member count card */}
          <h2>100+</h2>
          <p>Active Members</p>
        </div>
        <div className={styles.highlightCard}> {/* Racing program card */}
          <h2>Racing</h2>
          <p>Alpine Events</p>
        </div>
        <div className={styles.highlightCard}> {/* Trip destinations card */}
          <h2>Trips</h2>
          <p>Midwest &amp; West Coast</p>
        </div>
      </section>

      <section className={styles.carousel}> {/* Photo gallery section */}
        <img src={trip1} alt="Ski Trip 1" /> {/* Ski lift photo */}
        <img src={trip2} alt="Ski Trip 2" /> {/* Mountain summit photo */}
        <img src={trip3} alt="Ski Trip 3" /> {/* Night skiing photo */}
      </section>
    </main>
  );
}
