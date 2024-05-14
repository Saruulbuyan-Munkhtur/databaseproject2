import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import LinesPage from './pages/LinesPage';
import StationsPage from './pages/StationsPage';
// import SchedulePage from './pages/SchedulePage';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lines" element={<LinesPage />} />
            <Route path="/stations" element={<StationsPage />} />
            {/* <Route path="/schedule" element={<SchedulePage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;