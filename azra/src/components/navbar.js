import React from 'react';
import './navbar.css';
import aaLogo from '../assets/aalogo.jpg';

function Navbar() {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <img src={aaLogo} alt="AA Logo" className="navbar-logo" />
          </div>
          <div className="navbar-right">
            <ul className="navbar-menu">
              <li><a href="#">GÜNDEM</a></li>
              <li><a href="#">DÜNYA</a></li>
              <li><a href="#">EKONOMİ</a></li>
              <li><a href="#">SPOR</a></li>
              <li><a href="#">ANALİZ</a></li>
              <li><a href="#">KÜLTÜR</a></li>
              <li><a href="#">İNFOGRAFİK</a></li>
              <li><a href="#">PODCAST</a></li>
              <li><a href="#">VİDEO</a></li>
              <li><a href="#">FOTOĞRAF</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;