import React, { useState } from "react";
import { supabase } from "./supabaseClient";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      onLogin(data.user);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Check your email to confirm signup!");
    }
  }

  return (
    <div>
      <h2>Login / Signup</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
}

export default Login;
