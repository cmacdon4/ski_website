import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Parse from "../../parseConfig";
import styles from "./Navbar.module.css";
import Logo from "../../img/No_text_logo.jpg";
import { UserCircle } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(Parse.User.current());
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => {
      setUser(Parse.User.current());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = Parse.User.current();
      setUser(current);
    }, 1000); // check every second (lightweight)
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarInner}>
        <a className={styles.brand} href="/">
          <img src={Logo} alt="ND Ski" />
          <span>ND Ski & Snowboard</span>
        </a>
        <ul className={styles.nav}>
          <li><NavLink to="/" end className={({ isActive }) => isActive ? styles.active : undefined}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? styles.active : undefined}>About</NavLink></li>
          <li><NavLink to="/trips" className={({ isActive }) => isActive ? styles.active : undefined}>Our Trips</NavLink></li>
          <li><NavLink to="/calendar" className={({ isActive }) => (isActive ? styles.active : undefined)}>Calendar</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : undefined}>Contact</NavLink></li>

          {/* Profile Icon + Label */}
          <li className={styles.profileWrapper}>
            <button
              className={styles.profileButton}
              onClick={() => {
                if (!user) navigate("/auth/login");
                else handleLogout();
              }}
            >
              <UserCircle className={styles.profileIcon} />
              <span className={styles.profileLabel}>
                {user ? "Sign Out" : "Login / Register"}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
