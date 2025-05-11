import React, { useEffect, useState } from "react";
import "../../../css/DeliveryCss/Del_person/dp_nav.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Logo from "../../../assets/Graphics/logo.png";

function dp_nav() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [useremmail, setUserEmail] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/dm-login");
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in

      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
      setUserEmail(decodedToken.email);
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);
  return (
    <>
      <div id="sidebar">
        <div id="sidebar-header">
          <h1>
            <img src={Logo} alt="Logo" />
          </h1>
        </div>

        <div id="nav">
          <ul>
            <li>
            <Link to="my-deliveries">My Deliveries</Link>
            </li>
            <li>
              <Link to="my-deliveries">My Deliveries</Link>
            </li>
            <li>
              <Link to="dp-profile">Profile</Link>
            </li>
            <li></li>
          </ul>
        </div>

        <div id="sidebar-bottom">
          <div id="name-box">
            <h3 id="user-name">{userName}</h3>
            <h3 id="user-email">{useremmail}</h3>
          </div>
          <button id="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default dp_nav;
