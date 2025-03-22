import React from 'react'

const Footer = () => {
  return (
    <div className='container'>
    <div className='brand'>
        <img className='icon1' src="/icon.jpg" alt='icon' />
        <h1 className='heading'>Curevia</h1>
      </div>
      
      <div className='footer'>
          <p className='para'>
            At Curevia, we are committed to providing world-class healthcare with compassion and excellence. 
            Our team of experienced and trusted doctors ensures that you receive the best medical care tailored to your needs. 
            From general consultations to specialized treatments, we strive to make healthcare accessible, convenient, and hassle-free. 
            Your health is our priority. Book your appointment today and experience the Curevia difference.
          </p>
          <div className='get'>
              <h3>Get in Touch</h3>
              <p>+912298765432</p>
              <p>support@cureviahospital.com</p>
          </div>
      </div>
      
      <div className='font'>
        <a href='https://www.instagram.com/cure.via/' target='_blank' rel='noopener noreferrer'><i className="fa-brands fa-instagram"></i></a>
        <a href='https://www.facebook.com/profile.php?id=61573469151293' target='_blank' rel='noopener noreferrer'><i className="fa-brands fa-facebook"></i></a>
        <a href='https://www.youtube.com/channel/UC-uMkRk2mqxoHJMx9qxFSeg' target='_blank' rel='noopener noreferrer'><i className="fa-brands fa-youtube"></i></a>
      </div>
      <p>Copyright 2025 @chaitanya - All Rights Reserved.</p>
    </div>
  )
}

export default Footer