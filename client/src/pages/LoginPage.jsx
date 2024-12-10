import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Save token to localStorage
        navigate("/myprofile"); // Redirect to MyProfile after successful login
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/facebook";
  };

  return (
    <div id="login-page">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <div id="remember-me">
          <input type="checkbox" name="remember" />
          <label className="remember">Remember me</label>
        </div>
        <button className="login" type="submit">
          Log In
        </button>
      </form>
      <span>OR</span>

      <button onClick={handleGoogleLogin} className="google-login">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google Logo"
          className="button-logo"
        />
        Log in with Google
      </button>

      <button
        type="button"
        onClick={handleFacebookLogin}
        className="facebook-login"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
          alt="Facebook Logo"
          className="button-logo"
        />
        Log in with Facebook
      </button>
      <div id="signup-link">
        <p>Don't have an account?</p>
        <button type="button" onClick={() => navigate("/signupform")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
