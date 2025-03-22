import React, { useContext, useState } from 'react';
import '../Styles/Admin.css';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Ct from './Ct';

const Admin = () => {
let obj=useContext(Ct)
  const [doc, setDoc] = useState([]);
  let [doctor, setDoctor] = useState({ _id: '', name: '', phno: '', about: '', spc: '', experience: '', appnmtfee: '' });
  const [activeButton, setActiveButton] = useState(null);
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const { specialization } = useParams();
  const [image, setImage] = useState(null);
  let [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const userName = obj.state.name || "";
  const userImage = obj.state.uimage; 
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  console.log({"image":userImage})
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };

  const fetchDoctors = () => {
    axios.get("http://localhost:5000/availabledoctors")
      .then((res) => setDoc(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));

    setActiveButton('doctorsList');
    setShowAddDoctorForm(false);
  };

  const handleAddDoctor = () => {
    setActiveButton('addDoctor');
    setShowAddDoctorForm(true);
  };

  const details = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  let collectdata = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  let fun = (e) => {
    e.preventDefault();

    let formData = new FormData();
    Object.keys(doctor).forEach((key) => formData.append(key, doctor[key]));
    if (image) formData.append("image", image);

    axios.post("http://localhost:5000/adddoc", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then((res) => {
      setMsg(res.data.msg);
      setDoctor({ _id: '', name: '', phno: '', about: '', spc: '', experience: '', appnmtfee: '' });
      setImage(null);
    })
    .catch((err) => {
      console.error("Error adding doctor:", err);
    });
  };
  const handleLogout = () => {
    obj.updstate({ token: "", _id: "", name: "", role: "", uimage: "" });
    navigate("/");
  };

  const filteredDoctors = specialization
    ? doc.filter((doctor) => doctor.spc?.toLowerCase() === specialization.toLowerCase())
    : doc;

  return (
    <div>
      <div className='brand-admin'>
        <div className='xyz'>
          <img className='icon' src="/icon.jpg" alt='icon' />
          <div>
            <h1 className='heading'>Curevia</h1>
            <p>Dashboard Panel</p>
          </div>
          <p className='ytre'>Admin</p>
        </div>
          <div className="user-dropdown-container">
            <div className="user-icon" onClick={toggleDropdown}>
              {userImage ? (
                <img src={`http://localhost:5000/uimgs/${userImage}`} alt="User Avatar" className="user-avatar" />
              ) : (
                <div className="user-initial">{firstLetter}</div>
              )}
              <i className="fa-solid fa-angle-down"></i>
            </div>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
        </div>
      </div>
      <hr />
      <div className='admin-container1'>
        <div className='dashboard'>
          <button
            type='button'
            onClick={fetchDoctors}
            className={activeButton === 'doctorsList' ? 'active' : ''}
          >
            <i className="fa-solid fa-users" style={{ marginRight: '8px' }}></i>Doctors List
          </button>

          <button
            type='button'
            onClick={handleAddDoctor}
            className={activeButton === 'addDoctor' ? 'active' : ''}
          >
            <i className="fa-solid fa-user-plus" style={{ marginRight: '8px' }}></i>Add Doctor
          </button>
        </div>
        {activeButton === 'doctorsList' && (
          <div className='show' style={{ background: 'none', boxShadow: 'none', padding: '0' }}>
            <div className='doctors-container'>
              {filteredDoctors.length > 0 &&
                filteredDoctors.map((doctor) => (
                  <div className='doctor-card' key={doctor._id} onClick={() => details(doctor._id)}>
                    <img src={`http://localhost:5000/pimgs/${doctor.image}`} alt='doctor' />
                    <p className='available'><span className="dot">🟢</span> Available</p>
                    <h4>{doctor.name}</h4>
                    <p>{doctor.spc}</p>
                  </div>
                ))
              }
            </div>
          </div>
        )}
        {showAddDoctorForm && (
          <div className='add-doctor-form'>
            <h2>Add Doctor</h2>
            <form onSubmit={fun}>
              <div>{msg}</div>
              
              <label>Doctor Image</label>
              <input type="file" accept="image/*" name='image' onChange={handleFileChange} style={{ marginBottom: '16px' }}/>

              <label>Doctor Name</label>
              <input type="text" placeholder="Enter doctor's name" name='name' required onChange={collectdata} value={doctor.name}/>

              <label>Doctor Email</label>
              <input type="email" placeholder="Enter doctor's email" name='_id' required onChange={collectdata} value={doctor._id}/>
              
              <label>Contact</label>
              <input type="text" placeholder="Phone Number" name='phno' required onChange={collectdata} value={doctor.phno}/>
              
              <label>About</label>
              <input type="text" placeholder="About" name='about' required onChange={collectdata} value={doctor.about}/>

              <label>Specialization</label>
              <select name='spc' onChange={collectdata} value={doctor.spc} required>
                <option value="" disabled>Specialization</option>
                <option value="General">General Physician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Pediatricians">Pediatricians</option>
              </select>

              <label>Experience</label>
              <input type="number" name='experience' placeholder="Years of experience" required onChange={collectdata} value={doctor.experience}/>

              <label>Fees</label>
              <input type="text" placeholder="Consultation fee" name='appnmtfee' required onChange={collectdata} value={doctor.appnmtfee}/>

              <button type="submit" className="submit-btn">Add Doctor</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
