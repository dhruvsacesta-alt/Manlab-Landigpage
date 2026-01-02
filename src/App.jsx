import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import ComingSoon from './pages/ComingSoon';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Assessment from './pages/Assessment';
import ScrollToTop from './components/ScrollToTop'; // Assuming ScrollToTop is a new component to be imported


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--background)] text-[var(--text-dark)] font-body selection:bg-[var(--primary)] selection:text-white">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />


          {/* Catch-all Coming Soon Routes */}
          <Route path="/solutions" element={<ComingSoon />} />
          <Route path="/hair-loss" element={<ComingSoon />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/how-it-works" element={<ComingSoon />} />

          <Route path="/clinical-trials" element={<ComingSoon />} />
          <Route path="/doctor-network" element={<ComingSoon />} />
          <Route path="/terms" element={<ComingSoon />} />
          <Route path="/privacy" element={<ComingSoon />} />
          <Route path="/medical-disclaimer" element={<ComingSoon />} />
          <Route path="/post" element={<ComingSoon />} />

          {/* 404 handler */}
          <Route path="*" element={<ComingSoon />} />
        </Routes>

        <Footer />
      </div >
    </Router >
  );
};

export default App;
