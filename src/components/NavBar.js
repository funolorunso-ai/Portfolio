import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          My Portfolio
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-orange-500 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-orange-500 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/skills" className="hover:text-orange-500 transition duration-300">
              Skills
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className="hover:text-orange-500 transition duration-300">
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-500 transition duration-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
