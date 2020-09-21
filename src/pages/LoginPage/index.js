import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Context } from "../../store";
import "./login-page.scss";

const LoginPage = () => {
  const history = useHistory();
  const [isChangePassword, setChangePassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (state.isLoggedIn) {
      setUsername(state.username);
      setPassword(state.password);
    }
  }, []);

  const savePass = () => {
    if (password.length < 8) {
      setError("Password must be minimum 8 character long.");
    } else {
      setChangePassword(false);
      setError("");
      localStorage.setItem('newPass', password)
      dispatch({ type: "UPDATE_PASS", password });
    }
  };

  const handleLogout = () => {
    setUsername("");
    setPassword("");
    localStorage.removeItem('user')
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  const handleSubmit = () => {
    if (username && password) {
      if (username === state.username && password === state.password) {
        setError("");
        localStorage.setItem('user', username)
        dispatch({ type: "LOGIN" });
      } else {
        if (username !== "mukesh" && !isChangePassword) {
          setError("Invalid username!");
        } else if (password !== "12345678" && password.length < 8) {
          setError(
            isChangePassword
              ? "Password must be minimum 8 character long."
              : "Invalid password!"
          );
        }else{
          setError("Username and Password does not match!")
        }
      }
    } else {
      setError("Please enter username and password!");
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="form">
          <div className="inline-form">
            <p>Username: </p>
            <input
              className={state.isLoggedIn ? "only-text" : ""}
              type="text"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              disabled={state.isLoggedIn}
            />
          </div>
          <div className="inline-form">
            <p>{`${isChangePassword ? "New " : ""}Password`}</p>
            <input
              className={
                state.isLoggedIn && !isChangePassword ? "only-text" : ""
              }
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={state.isLoggedIn && !isChangePassword}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="btn-container">
          {state.isLoggedIn && (
            <div
              className="btn"
              onClick={() => {
                if (isChangePassword) {
                  savePass();
                } else {
                  setChangePassword(true);
                  setError("");
                }
              }}
            >
              {`${isChangePassword ? "Save" : "Change"} Password`}
            </div>
          )}

          <div
            className="btn"
            onClick={() => (state.isLoggedIn ? handleLogout() : handleSubmit())}
          >
            {state.isLoggedIn ? "Logout" : "Login"}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
