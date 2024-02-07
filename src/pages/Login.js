import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../comp/UserContext";
import { serverUrl } from "../utils/env";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, UserInfo } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${serverUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (response.ok) {
        response.json().then((data) => {
          console.log("data", data);
          setUserInfo(data);
          setRedirect(true);
          // localStorage.setItem("userInfo", JSON.stringify(data)); // Store user info in local storage
        });
      } else {
        console.log("error");
        alert("Wrong username or password");
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
