import React from "react";
import styles from "./Auth.module.css";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={styles.authForm}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={user.email || ""}
        onChange={onChange}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={user.password || ""}
        onChange={onChange}
        required
      />

      <button type="submit" className={styles.authButton}>
        {isLogin ? "Log In" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
