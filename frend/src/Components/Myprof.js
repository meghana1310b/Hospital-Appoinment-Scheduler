import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Ct from "./Ct";
import "../Styles/Myprof.css"; // Import styles

const Myprof = () => {
  const obj = useContext(Ct); 
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!obj.state._id) {  
        setError("User email is missing!");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/user/${obj.state._id}`);
        setUser(response.data);
      } catch (err) {
        setError("Failed to load user profile.");
      }
    }
    fetchUserProfile();
  }, [obj.state._id]);

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {user ? (
        <div className="profile-details">
          <img src={`http://localhost:5000/uimgs/${user.uimage}`} alt="Profile" className="profile-pic" />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user._id}</p> 
          <p><strong>Phone:</strong> {user.phno}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        !error && <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Myprof;
