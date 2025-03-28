import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/Nav.css';
import Ct from './Ct';
import { useContext, useState } from 'react';

const Nav = () => {
  let obj = useContext(Ct);
  let navigate = useNavigate();
  const userName = obj.state.name || "";
  const userImage = obj.state.uimage;
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    obj.updstate({ token: "", _id: "", name: "", role: "", uimage: "" });
    navigate("/");
  };

  return (
    <nav className='navbar'>
      <div className='brand-nav'>
        <img className='icon' src="/icon.jpg" alt='icon' />
        <h1 className='heading'>Curevia</h1>
      </div>
      <div className='nav-links'>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>HOME</NavLink>
        <NavLink to="/alldoctors" className={({ isActive }) => (isActive ? "active" : "")}>ALL DOCTORS</NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>ABOUT</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>CONTACT</NavLink>
        {  <a href="/adminpanel" target="_blank" rel="noopener noreferrer">ADMIN PANEL</a>}
        </div>
      <div>
        {obj.state.token === "" ? (
          <NavLink to="/reg" className={({ isActive }) => (isActive ? "active" : "")}>REGISTER</NavLink>
        ) : (
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
                <NavLink to="/profile" className="dropdown-item">My Profile</NavLink>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
