import React from "react";
import { NavLink } from "react-router-dom"; // React Router component for navigation links
import styles from "./Navbar.module.css"; // CSS modules for component-specific styling

import Logo from "../../img/No_text_logo.jpg" // Club logo image

/**
 * Navigation component that appears on all pages
 * Provides consistent navigation across the entire application
 * Uses React Router's NavLink for active state management
 */
export default function Navbar() {
  return (
    <nav className={styles.navbar}> {/* Main navigation container */}
      <div className={styles.navbarInner}> {/* Inner container for flexbox layout */}
        {/* Brand/logo section with club name */}
        <a className={styles.brand} href="/">
          <img
            src={Logo}
            alt="ND Ski"
          />
          <span>ND Ski & Snowboard</span>
        </a>
        {/* Navigation menu list */}
        <ul className={styles.nav}>
          <li>
            {/* Home page link with exact path matching */}
            <NavLink
              to="/"
              end // Only matches exact path, not sub-paths
              className={({ isActive }) =>
                isActive ? styles.active : undefined // Apply active styles when current page
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            {/* About page link */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              About
            </NavLink>
          </li>
          <li>
            {/* Team page link */}
            <NavLink
              to="/team"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              The Team
            </NavLink>
          </li>
          <li>
            {/* Contact page link */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
