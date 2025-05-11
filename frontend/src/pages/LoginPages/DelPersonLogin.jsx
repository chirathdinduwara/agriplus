import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../css/DeliveryCss/Del_person/dp_login.css";
import img from "../../assets/images/graphics/delivery.jpg";

function DelPerLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/deliver-person/login`,
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
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await login(formData);
    if (data.success) {
      toast.success("Login Successful!");
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/dp-dashboard");
      }, 1000);
    } else {
      toast.error(data.message || "Login failed, please check your credentials.");
    }
  };

  return (
    <>
      <div className="delper-login">
        <img
          className="login-graphic"
          src={img}
          alt="Login Graphic"
        />
        <form className="delper-login-form" onSubmit={handleLogin}>
          <h1>Delivery Person Login</h1>
          <input
            type="email"
            className="delper-input"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="delper-input"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="delper-login-btn" type="submit">
            Login
          </button>
          <p className="delper-redirect">
            ⬅{" "}
            <Link className="delper-link" to="/">
              Home
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default DelPerLogin;
