import React, { useEffect, useState } from "react";
import { checkUser, loginUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Auth.module.css";

const AuthLogin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (checkUser()) {
      navigate("/");
    }
  }, [navigate]);  

  useEffect(() => {
    if (currentUser && add) {
      loginUser(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          navigate("/");
        }
        setAdd(false);
      });
    }
  }, [navigate, currentUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h1 className={styles.authTitle}>Welcome Back</h1>
        <p className={styles.authSubtitle}>
          Log in to access your ski team dashboard
        </p>

        <AuthForm
          user={currentUser}
          isLogin={true}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
        />

        <p className={styles.registerPrompt}>
          Don’t have an account?
          <Link to="/auth/register" className={styles.registerLink}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLogin;
