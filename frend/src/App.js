import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'; 
import Nav from './Components/Nav';
import Home from './Components/Home';
import Alldoc from './Components/Alldoc';
import Cont from './Components/Cont';
import About from './Components/About';
import AdminPanel from './Components/AdminPanel';
import Register from './Components/Register';
import './App.css';
import { useState } from 'react';
import Ct from './Components/Ct';
import Login from './Components/Login';
import Footer from './Components/Footer';
import Appnmt from './Components/Appnmt';
import Admin from './Components/Admin';
import Myprof from './Components/Myprof';

const AppContent = () => {
  const location = useLocation();
  let [state, setState] = useState({ token: "", _id: "", name: "", role: "",uimage:"" });

  let updstate = (obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  };

  let obj = { state, updstate };
  const hideLayout = ["/adminpanel", "/admin"].includes(location.pathname);

  return (
    <Ct.Provider value={obj}>
      {!hideLayout && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alldoctors" element={<Alldoc />}>
          <Route path=":specialization" element={<Alldoc />} />
        </Route>
        <Route path="/contact" element={<Cont />} />
        <Route path="/about" element={<About />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointment/:id" element={<Appnmt />} /> 
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Myprof />} />
      </Routes>
      {!hideLayout && <Footer />} 
    </Ct.Provider>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
