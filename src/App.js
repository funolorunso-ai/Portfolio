import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import SnakeGame from './pages/SnakeGame';
import TetrisGame from './pages/TetrisGame';
import Ecommerce from './pages/Ecommerce';
import Reviews from './pages/Reviews';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/snake" element={<SnakeGame />} />
          <Route path="/tetris" element={<TetrisGame />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
