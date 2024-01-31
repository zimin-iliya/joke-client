import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const regButton = document.querySelector(".register");
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });
      if (response.ok) {
        regButton.style.backgroundColor = "green";
        regButton.innerHTML = "Registered";
        await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
          window.location.replace("/login");
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <form className="register" onSubmit={handleSubmit}>
        <h1>Register</h1>
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
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="register" type="submit">
          Register
        </button>
      </form>
    </>
  );
}
