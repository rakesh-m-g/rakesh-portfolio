import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import About from './components/About';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const location = useLocation();
  const isResumePage = location.pathname === '/resume';

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <CustomCursor />
      {!isResumePage && <Navbar />}
      <PageTransition>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <>
              <Hero />
              <Works />
              <About />
              <Contact />
            </>
          } />
          <Route path="/resume" element={<Resume />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageTransition>
      {!isResumePage && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
