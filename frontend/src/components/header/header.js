import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/path/to/logo.png" alt="Subway Company Logo" />
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/lines">Lines</a></li>
          <li><a href="/stations">Stations</a></li>
          <li><a href="/rides">Rides</a></li>
          <li><a href="/schedule">Schedule</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;