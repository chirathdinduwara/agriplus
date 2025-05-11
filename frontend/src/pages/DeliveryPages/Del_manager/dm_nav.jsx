import React, { useEffect, useState } from "react";
import "../../../css/DeliveryCss/Del_manager/dm_nav.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Graphics/logo.png";
import { jwtDecode } from "jwt-decode";
function DmNav() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

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
      setUserName(decodedToken.email);
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  return (
    <div id="sidebar">
      <div id="sidebar-header">
        <h1>
          <img src={Logo} alt="Logo" />
        </h1>
      </div>
      <nav id="nav">
        <ul>
          <li>
            <Link to="dm_overview">Dashboard</Link>
          </li>
          <li>
            <Link to="dm_orders">Orders</Link>
          </li>
          <li>
            <Link to="dm_tracking">Tracking</Link>
          </li>
          <li>
            <Link to="dm_person_details">Delivery persons</Link>
          </li>
          <li>
            <div id="name-box">
              <h3>{userName}</h3>
            </div>
            <button id="logout-btn" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DmNav;
