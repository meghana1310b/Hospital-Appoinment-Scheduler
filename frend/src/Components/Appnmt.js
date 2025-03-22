import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/Appnmt.css";
import Ct from "./Ct";
const Appnmt = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { state } = useContext(Ct); 

  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 

  useEffect(() => {
    axios
      .get(`http://localhost:5000/appointment/${id}`)
      .then((res) => setDoctor(res.data))
      .catch(() => setError("Error fetching doctor details"));
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!doctor) return <h2>Loading...</h2>;
  const handleBookClick = () => {
    if (!state.token) {
      navigate("/login");
      return;
    }
    if (!selectedSlot || !selectedTime) {
      alert("Please select a slot and time before booking.");
      return;
    }
    setShowPopup(true);
  }
  const confirmBooking = () => {
    setShowPopup(false);
    alert("Appointment booked successfully!");
    navigate("/alldoctors");
  };

  return (
    <div className="appointment-container">
      <img src={`http://localhost:5000/pimgs/${doctor.image}`} alt={doctor.name} />
      <div className="details">
        <h2>{doctor.name}</h2>
        <div className="p">
          <p>MBBS - {doctor.spc}</p>
          <p className="exp">{doctor.experience} Years</p>
        </div>
        <p><strong>About</strong> <i className="fa-solid fa-circle-info"></i></p>
        <p className="txt">{doctor.about}</p>
        <p><strong>Contact:</strong> +91 {doctor.phno}</p>
        <p className="fee"><strong>Appointment fee: </strong> ₹{doctor.appnmtfee}</p>
        <p><strong>Booking slots</strong></p>
        <div className="slots">
          {doctor.slots.map((s, index) => (
            <button
              key={index}
              className={`slot-btn ${selectedSlot === s ? "selected" : ""}`}
              onClick={() => setSelectedSlot(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <p><strong>Availability:</strong></p>
        <div className="availability">
          {doctor.time.map((t, index) => (
            <button
              key={index}
              className={`time-btn ${selectedTime === t ? "selected" : ""}`}
              onClick={() => setSelectedTime(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <button type="button" className="book-btn" onClick={handleBookClick}>
          Book Appointment
        </button>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Confirm Appointment</h3>
            <p><strong>Doctor:</strong> {doctor.name}</p>
            <p><strong>Slot:</strong> {selectedSlot}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <div className="popup-actions">
              <button className="confirm-btn" onClick={confirmBooking}>Confirm</button>
              <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appnmt
