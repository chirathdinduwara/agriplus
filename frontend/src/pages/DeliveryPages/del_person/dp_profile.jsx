import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Logo from "../../../assets/images/graphics/delivery.jpg";
import "../../../css/DeliveryCss/Del_person/dp_profile.css";

function DpProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwtDecode(token);
      setUserDetails(decoded); // assuming token contains all fields
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-image-container">
        <div className="profile-icon">
          <img className="profile-icon" src={Logo} alt="" />
        </div>
      </div>
      <h2 className="profile-title">Profile</h2>
      <div className="profile-detail">
        <strong className="profile-label">Name:</strong>
        <span className="profile-info">{userDetails.name}</span>
      </div>
      <div className="profile-detail">
        <strong className="profile-label">Email:</strong>
        <span className="profile-info">{userDetails.email}</span>
      </div>
      <div className="profile-detail">
        <strong className="profile-label">Phone:</strong>
        <span className="profile-info">{userDetails.phone}</span>
      </div>
      <div className="profile-detail">
        <strong className="profile-label">Address:</strong>
        <span className="profile-info">{userDetails.address}</span>
      </div>
      <div className="profile-detail">
        <strong className="profile-label">Vehicle Number:</strong>
        <span className="profile-info">{userDetails.vehicleNumber}</span>
      </div>
    </div>
  );
}

export default DpProfile;
