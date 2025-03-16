import React, { useState } from "react";
import "../../css/SignupPages/user_signup.css";
import logo from "../../assets/Graphics/logo.png"

function user_signup() {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    address: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Farmer Registered:", formData);
  };

  return (
    <>
      <div id="farmer-signup-container">
        <div id="left-section">
          <img src={logo} alt="Farm Logo" id="logo" />
        </div>

        <div id="right-section">
          <h2 id="signup-title">🌿 Farmer Registration 🌾</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              id="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" id="signup-button">
              Register Farmer
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default user_signup;
