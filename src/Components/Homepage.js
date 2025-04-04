
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import logout from '../icons/logout.png';
import img1 from '../images/image1.jpg.jpg';
import img2 from '../images/image2.jpg.jpg';
import img3 from '../images/image3.jpg.jpg';
import '../Styles/Carousel.css'; 
import Buypage from './Buypage';

function Homepage() {
  const [name, setname] = useState("");
  const [dropdown, setdropdown] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [img1, img2, img3];
  
  useEffect(() => {
    const usersname = sessionStorage.getItem('username');
    if (usersname) {
      setname(usersname.toUpperCase());
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  
    return () => clearInterval(interval); // ✅ correct
  }, [images.length]);
  

  const handleLogout = (event) => {
    console.log("logout button clicked");
    event.stopPropagation();
    sessionStorage.clear();
  };

  

  return (
    <div className='colorify'>
      <nav className='navbar'>
        <div className='nav_logo'>Auric </div>
        <ul className='nav_link'>
          <li><Link to='/form' className='scroll_link'>Form</Link></li>
          <li><Link to='/buy' className='scroll_link'>Buy</Link></li>
          <li><Link to='' className='scroll_link'>About Us</Link></li>
          <li><Link to='' className='scroll_link'>Contact Us</Link></li>
        </ul>
        {name ? (
          <div className="nav-username">
            <h1 className="navhead" onClick={() => setdropdown(!dropdown)} style={{ cursor: "pointer" }}>
              Welcome, {name}
            </h1>
            {dropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleLogout}>
                  <img className="logout" src={logout} alt="logout" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav_btns">
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/signup"><button className="login-btn">Sign Up</button></Link>
          </div>
        )}
      </nav>

      <div classname='carousel-container'>
      <div className="carousel_div">
        <img src={images[currentImage]} alt={`carousel-${currentImage}`} className="carousel-image" />
      </div>
      </div>
<div><Buypage /></div>
    </div>
  );
}

export default Homepage;
