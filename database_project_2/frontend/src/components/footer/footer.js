import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>We are a leading subway company dedicated to providing efficient and reliable transportation services.</p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>123 Subway Street<br />City, Country<br />Phone: 123-456-7890<br />Email: info@subwaycompany.com</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/lines">Lines</a></li>
              <li><a href="/stations">Stations</a></li>
              <li><a href="/schedule">Schedule</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Subway Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;