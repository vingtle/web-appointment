import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signupform.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone_number: "",
    name: "",
  });
  const [error, setError] = useState("");

  // Update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Input change detected: ", { name, value }); // Log input changes
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("Current location after submit:", window.location.pathname);
  };  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post("/auth/signup", formData);

      if (response.status === 201) {
        alert("Signup successful! You can now log in.");
        navigate("/loginpage"); // Redirect to login page after signup
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("An error occurred during signup. Please try again.");
    }
    console.log("Current location:", window.location.pathname);
    navigate("/loginpage"); 
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange} // Update state when typing
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange} // Update state when typing
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange} // Update state when typing
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange} // Update state when typing
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
