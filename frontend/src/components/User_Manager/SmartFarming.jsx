import axios from 'axios';
import React, { useEffect, useState} from 'react';
import '../../css/User_Manager/smartAssit.css';
import SmartItem from '../SpecialFunction/SmartItem';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


function SmartFarming() {

    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true); // User is logged in
    
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id);
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      }, []);


  // Fetch all details 
  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get('http://localhost:5000/api/getDetails'); // Get users from the backend
        setDetails(response.data.details);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchDetails();
  }, []); // runs once on mount

  // Filter details by userId
  const filteredDetails = details.filter(detail => detail.farmer_id === userId);

    function handleAddDetails() {
        navigate('/profile/addDetails')
      }

      const handleItemClick = (detail) => {
        console.log("Clicked:", detail); // Debugging
        navigate(`/assist/${detail._id}`, { state: detail });
    };
    
    
    return (
        <>
            <div className="smart-farming">
                <h1 className="smart-heading">Smart Farming Assistance</h1>
                <button className="add" onClick={handleAddDetails}>Add</button>
                <div className="smart-farming-list">
                    {filteredDetails.map((detail) => (
                        <div key={detail._id} onClick={() => handleItemClick(detail)}>
                            <SmartItem 
                                crop_name={detail.crop_name} 
                                area={detail.area} 
                                location={detail.location} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
  }    

export default SmartFarming;