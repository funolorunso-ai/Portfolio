import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center animate-scale-in">
        <h1 className="text-5xl font-bold mb-4 text-orange-500 animate-fade-in-up animate-glow-pulse">Welcome to My Portfolio</h1>
        <p className="text-xl mb-8 animate-slide-in-left">Discover my work and get in touch!</p>
        <Link 
          to="/about" 
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 animate-slide-in-right hover:animate-bounce"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default Home;
