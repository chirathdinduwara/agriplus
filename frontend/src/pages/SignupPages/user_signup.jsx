import React, { useState } from "react";
import "../../css/SignupPages/user_signup.css";
import logo from "../../assets/Graphics/logo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function UserSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // Clear error as user types
  };

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (formData.full_name.trim().length < 3) {
      tempErrors.full_name = "Full name must be at least 3 characters.";
    }

    if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.address.trim()) {
      tempErrors.address = "Address is required.";
    }

    if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the highlighted errors.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sign-up",
        formData
      );
      if (response.data.success) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(response.data.message || "Error in User Creation");
      }
    } catch (error) {
      console.error(error);
      toast.error("Account creation failed! Please try again.");
    }
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
            />
            {errors.full_name && (
              <span className="error">{errors.full_name}</span>
            )}

            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <input
              type="text"
              id="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span className="error">{errors.address}</span>}

            <input
              type="text"
              id="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                id="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}

            <button type="submit" id="signup-button">
              Register
            </button>

            <p id="login-p">
              Already have an account?{" "}
              <Link to="/login" id="p-link">
                Login Here
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default UserSignup;
