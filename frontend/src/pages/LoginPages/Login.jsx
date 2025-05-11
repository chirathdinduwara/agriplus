import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import logo from "../../assets/Graphics/logo.png";
import "../../css/Login/user_login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let tempErrors = {};

    if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password || formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const login = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/login`,
        userData
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        toast.error("Network error, please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the highlighted errors.");
      return;
    }

    const data = await login(formData);
    if (data?.success) {
      toast.success("Login Successful!");
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error(
        data?.message || "Login failed, please check your credentials."
      );
    }
  };

  return (
    <>
      <div id="farmer-login-container">
        <div id="left-section">
          <img src={logo} alt="Farm Logo" id="logo" />
        </div>

        <div id="right-section">
          <h2 id="login-title">🌿 Farmer Login 🌾</h2>
          <form onSubmit={handleLogin}>
            <input
              name="email"
              type="text"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <button
                type="button"
                id="toggle-btnn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <button type="submit" id="login-button">
              Login
            </button>
            <p id="login-p">
              Don't have an account?{" "}
              <Link to="/sign_up" id="p-link">
                Register Here
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default UserLogin;
