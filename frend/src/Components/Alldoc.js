import React, { useEffect, useState } from 'react';
import '../Styles/Alldoc.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Alldoc = () => {
  const {specialization } = useParams();
  const [doc, setDoc] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/availabledoctors")
      .then((res) => {
        setDoc(res.data);
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);
  const details = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
  };
  const filteredDoctors = specialization
    ? doc.filter((doctor) => doctor.spc?.toLowerCase() === specialization.toLowerCase())
    : doc;

  return (
    <div className='hcon'>
      <div className='alldoc'>
        <p>Browse through the doctors specialist.</p>
        <Link to='/alldoctors/Dermatologist'>Dermatologist</Link>
        <Link to='/alldoctors/Gastroenterologist'>Gastroenterologist</Link>
        <Link to='/alldoctors/Gynecologist'>Gynecologist</Link>
        <Link to='/alldoctors/Neurologist'>Neurologist</Link>
        <Link to='/alldoctors/Pediatricians'>Pediatricians</Link>
        <Link to='/alldoctors/General Physician'>General Physician</Link>
      </div>
      <div className='show'>
        <div className='doctors-container'>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div className='doctor-card' key={doctor._id} onClick={() => details(doctor._id)}>
                <img src={`http://localhost:5000/pimgs/${doctor.image}`} alt='doctor' />
                <p className='available'><span className="dot">🟢</span> Available</p>
                <h4>{doctor.name}</h4>
                <p>{doctor.spc}</p>
              </div>
            ))
          ) : (
            <p>No doctors available in this category.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Alldoc;
