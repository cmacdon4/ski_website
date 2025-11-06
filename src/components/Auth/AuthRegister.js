import React, { useState, useEffect } from "react";
import { createUser, checkUser } from "../Auth/AuthService";
import { useNavigate, Link } from "react-router-dom";
import Parse from "../../parseConfig";
import styles from "./AuthRegister.module.css";

export default function AuthRegister() {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, go home immediately
  useEffect(() => {
    if (checkUser()) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate @nd.edu domain
    if (!newUser.email.toLowerCase().endsWith("@nd.edu")) {
      setMessage("❌ Please use your @nd.edu email address to register.");
      return;
    }
  
    // Validate password requirements
    const password = newUser.password;
    const hasMinLength = password.length >= 6;
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
  
    if (!hasMinLength || !hasCapital || !hasNumber) {
      setMessage(
        "❌ Password must be at least 6 characters long and include one capital letter and one number."
      );
      return;
    }
  
    // Confirm password
    if (newUser.password !== newUser.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }
  
    setIsLoading(true);
    try {
      const userCreated = await createUser(newUser);
  
      if (userCreated) {
        setMessage("✅ Account created! Logging you in...");
        const currentUser = Parse.User.current();
  
        if (currentUser) {
          setTimeout(() => navigate("/"), 1200);
        } else {
          setMessage("⚠️ Please log in manually.");
          setTimeout(() => navigate("/auth/login"), 1500);
        }
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h1 className={styles.authTitle}>Join the Club</h1>
        <p className={styles.authSubtitle}>
          Create your account to access ND Ski Team updates
        </p>

        {message && <p className={styles.feedback}>{message}</p>}

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={newUser.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={newUser.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={newUser.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Create a password"
            value={newUser.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={newUser.confirmPassword}
            onChange={handleChange}
            required
          />

          <ul className={styles.requirements}>
            <li>At least 6 characters long</li>
            <li>Contains at least one uppercase letter</li>
            <li>Contains at least one number</li>
          </ul>


          <button type="submit" className={styles.authButton} disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className={styles.registerPrompt}>
          Already have an account?
          <Link to="/auth/login" className={styles.registerLink}>
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
