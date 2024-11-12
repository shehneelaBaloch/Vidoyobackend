import React from 'react'
import './about.css'
import myImage from '../../assets/logo/card.jpeg'


const About = () => {
  return (
    <div className='about'>
      <h1 className='title'>About</h1>
      <div className='about-wrapper'>
        <div className='about-image'>
          <img className='juan-pic' src={myImage} alt="" />
        </div>
        <div className='about-text'>
          <h2 className='h2-title'>Welcome  to  vidoyo</h2>
          <h3 className='h3-explain'>
          At Vidoyo, we believe in harnessing the power of nature to nurture your well-being. Our mission is to craft high-quality, natural products that promote healthy living, sustainability, and harmony with the environment.
</h3>
        </div>
      </div>
    </div>

  )
}

export default About
