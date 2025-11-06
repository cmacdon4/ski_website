import React from "react";
import styles from "./Footer.module.css";
import Logo from "../../img/No_text_logo.jpg";
import { Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* Left section with logo */}
        <div className={styles.leftSection}>
          <img src={Logo} alt="ND Ski Logo" className={styles.logo} />
          <span className={styles.brand}>ND Ski & Snowboard</span>
        </div>

        {/* Center icons */}
        <div className={styles.socials}>
          <a
            href="https://www.instagram.com/ndskiclub/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Instagram className={styles.icon} />
          </a>
          <a
            href="http://linkedin.com/company/notre-dame-ski-snowboard-club/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className={styles.icon} />
          </a>
          <a
            href="mailto:ndski@nd.edu"
            target="_blank"
            rel="noreferrer"
            aria-label="Email"
          >
            <Mail className={styles.icon} />
          </a>
        </div>

        {/* Right text section */}
        <div className={styles.rightSection}>
          <p>© {new Date().getFullYear()} ND Ski & Snowboard Team</p>
          <p className={styles.madeBy}>Built with ❤️ by the ND Ski Team</p>
        </div>
      </div>
    </footer>
  );
}
