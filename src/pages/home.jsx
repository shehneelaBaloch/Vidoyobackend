import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home.css';
import About from './about/about';
import homePageImage1 from '../assets/productImg/10.jpg';
import homePageImage2 from '../assets/productImg/11.jpg';
import homePageImage3 from '../assets/productImg/15.jpg';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='home'>
      <div className='carousel-wrapper'>
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={3000}
          transitionTime={600}
          showStatus={false}
          onChange={handleSlideChange}
          className='home-carousel'
        >
          <div className='carousel-slide'>
            <img src={homePageImage1} alt="Our Brand Identity" />
            <div className="carousel-caption">
              <h2>Welcome to Our Store</h2>
              <p>Discover a unique blend of elegance and nature-inspired products.</p>
              {currentSlide === 0 && (
                <Link to="/shop" className='exploreBttn-carousel'>
                  Explore Page
                </Link>
              )}
            </div>
          </div>
          <div className='carousel-slide'>
            <img src={homePageImage2} alt="Premium Products" />
            <div className="carousel-caption">
              <h2>Premium Products</h2>
              <p>Crafted with care, perfect for nature lovers.</p>
            </div>
          </div>
          <div className='carousel-slide'>
            <img src={homePageImage3} alt="Explore Our Collections" />
            <div className="carousel-caption">
              <h2>Explore Our Collections</h2>
              <p>Experience the beauty of nature-inspired designs.</p>
            </div>
          </div>
        </Carousel>
      </div>
      <About />
    </div>
  );
}

export default Home;
