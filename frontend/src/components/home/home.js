import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Subway Company</h1>
        <p>Discover the convenience and efficiency of our subway system.</p>
        <a href="/lines" className="cta-button">Explore Lines</a>
      </section>

      <section className="features">
        <div className="feature">
          <img src="/path/to/feature1.png" alt="Feature 1" />
          <h2>Reliable Transportation</h2>
          <p>Our subway system offers reliable and timely transportation throughout the city.</p>
        </div>
        <div className="feature">
          <img src="/path/to/feature2.png" alt="Feature 2" />
          <h2>Easy Navigation</h2>
          <p>With clear maps and signage, navigating our subway network is a breeze.</p>
        </div>
        <div className="feature">
          <img src="/path/to/feature3.png" alt="Feature 3" />
          <h2>Safe and Secure</h2>
          <p>We prioritize the safety and security of our passengers at all times.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;