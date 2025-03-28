import React, { useEffect, useRef, useState } from 'react';
import '../Styles/Home.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  let [doc,setDoc]=useState([])
  let navigate=useNavigate()
  useEffect(()=>{
    axios.get("http://localhost:5000/availabledoctors").then((res)=>{
      setDoc(res.data)
    })
  },[])
  let details=(id)=>{
    navigate(`/appointment/${id}`)
  }
  const imgRef = useRef(null); 

  const scrollToImages = () => {
    imgRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Book Appointment with Trusted Doctors</h1>
        <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <button className="btn" onClick={scrollToImages}>
          Book appointment <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <img className="back" src="/back.webp" alt="back" />

      <h1>Find By Speciality</h1>
      <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
      <div className="img" ref={imgRef}>
        <div className='speciality'>
        <Link to='/alldoctors/Dermatologist'><img src="/dermotologist.svg" alt="derm" /></Link>
          <p>Dermotologist</p>
        </div>
        <div className='speciality'>
        <Link to='/alldoctors/Gastroenterologist'><img src="/gastroenterologist.svg" alt="gas" /></Link>
          <p>Gastroenterologist</p>
        </div>
        <div className='speciality'>
         <Link to='/alldoctors/Gynecologist'><img src="/gynecologist.svg" alt="gtn" /></Link>
          <p>Gynecologist</p>
        </div>
        <div className='speciality'>
        <Link to='/alldoctors/Neurologist'><img src="/neurologist.svg" alt="neuro" /></Link>
          <p>Neurologist</p>
        </div>
        <div className='speciality'>
        <Link to='/alldoctors/Pediatricians'><img src="/pediatricians.svg" alt="pedia" /></Link>
          <p>Pediatricians</p>
        </div>
        <div className='speciality'>
        <Link to='/alldoctors/General physician'><img src="/physician.svg" alt="phy" /></Link>
          <p>General Physician</p>
        </div>
      </div>

      <div>
        <h1>Top Doctors to Book</h1>
        <p>Simply browse through our extensive list of trusted doctors.</p>
        <div className='doctors-containerh'>
          {doc.slice(0, 6).map((doctor) => (
            <div className='doctor-card' key={doctor._id} onClick={()=>details(doctor._id)}>
              <img src={`http://localhost:5000/pimgs/${doctor.image}`} alt='doctor' />
              <p className='available'><span className="dot">🟢</span> Available</p>
              <h4>{doctor.name}</h4>
              <p>{doctor.spc}</p>
            </div>
          ))}
        </div>
        <button className="more" onClick={()=>navigate('/alldoctors')}>more</button>
      </div>
      
      <div className="section2">
        <div className="content1">
          <h1>Book Appointment with 100+ Trusted Doctors</h1>
          <Link to='/reg'><button className="btn">Create Account</button></Link>
        </div>
        <img className="back1" src="/back1.webp" alt="back" />
      </div>
    </div>    
  )
}
export default Home