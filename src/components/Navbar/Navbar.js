import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

import Logo from "../../img/No_text_logo.jpg"

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarInner}>
        <a className={styles.brand} href="/">
          <img
            src={Logo}
            alt="ND Ski"
          />
          <span>ND Ski & Snowboard</span>
        </a>
        <ul className={styles.nav}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
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
