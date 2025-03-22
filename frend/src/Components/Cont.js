import React from 'react'
import '../Styles/Cont.css';
const Cont = () => {
  return (
    <div className='contact'>
      <h2>CONTACT US</h2>
      <div className='imgcontent'>
        <img src="/image.png" alt="contact"/>
        <div className='text'>
          <h3>OUR OFFICE</h3>
          <p>00000 Willms Station
          Suite 000, Washington, USA</p>
          <p>Tel: +912298765432
          Email: support@cureviahospital.com</p>
          <h3>CAREERS AT CureVia</h3>
          <p>Learn more about our teams and job openings.</p>
          <button onClick={() => window.open("https://www.linkedin.com/jobs/", "_blank")}>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Cont