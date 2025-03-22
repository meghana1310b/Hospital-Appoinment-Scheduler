import React from 'react'
import '../Styles/About.css'
const About = () => {
  return (
      <div className='whole'>
        <h2>About Us</h2>
        <div className='about'>
          <img src="/about.webp" alt="about"/>
          <div className='paragraph'>
            <p>Welcome to CureVia, your trusted partner in managing your healthcare needs conveniently and efficiently. At CureVia, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
            <p>CureVia is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
            <h4>Our Vision</h4>
            <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          </div>

        </div>
        
        <h2>WHY CHOOSE US</h2>
        <div className='why'>
          <div className='eff'>
            <h4>EFFICIENCY</h4>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='conven'>
            <h4>CONVENIENCE</h4>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className='person'>
            <h4>PERSONALIZATION</h4>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>  
        </div>
      </div>
  )
}

export default About