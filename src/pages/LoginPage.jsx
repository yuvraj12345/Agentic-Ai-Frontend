import React, { useState } from "react";
import SpeechChatPage from "./SpeechChatPage";

const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const HARDCODED_USERNAME = "admin";
  const HARDCODED_PASSWORD = "metastore123";

  const handleLogin = () => {

    if (
      username === HARDCODED_USERNAME &&
      password === HARDCODED_PASSWORD
    ) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  if (loggedIn) {
    return <SpeechChatPage />;
  }

  return (
    <div style={styles.container}>

      <div style={styles.loginBox}>
        <h2>Metastore Companion</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </div>

    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },

  loginBox: {
    background: "#1e293b",
    padding: "40px",
    borderRadius: "10px",
    width: "320px",
    textAlign: "center",
    color: "white",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "none",
  },

  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  error: {
    color: "#f87171",
    marginTop: "10px",
  },
};

export default LoginPage;