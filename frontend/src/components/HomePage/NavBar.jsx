import { Link, useNavigate } from "react-router-dom";
import "../../css/HomePage/navbar.css";
import logo from "../../assets/Graphics/logo.png";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function NavBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const logout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:5000/api/logout", // Must be PUT
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Logout success");
    } catch (err) {
      console.error(
        "Logout tracking failed:",
        err.response?.data?.message || err.message
      );
    }

    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  function handleLogIn() {
    navigate("/login");
  }

  function handleSignUp() {
    navigate("/sign_up");
  }

  function goHome() {
    navigate("/");
  }

  const goProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="home-nav">
      <img
        onClick={goHome}
        src={logo}
        alt="logo"
        className="logo"
        style={{ cursor: "pointer" }}
      />
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/store" className="nav-link">
            Shop
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link">
            Contacts
          </Link>
        </li>
      </ul>
      <div>
        {isLoggedIn ? (
          <div className="nav-c">
            <h3 onClick={goProfile} style={{ cursor: "pointer" }}>
              Hi! {userName}
            </h3>
            <button className="log-out" onClick={logout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="nav-actions">
            <button className="log-in" onClick={handleLogIn}>
              Log In
            </button>
            <button className="log-in" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
