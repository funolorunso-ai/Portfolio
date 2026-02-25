import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-orange-500 mb-4">My Portfolio</h3>
            <p className="text-gray-400">
              Passionate developer creating amazing web experiences.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-500 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-orange-500 transition duration-300">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-orange-500 transition duration-300">About</a></li>
              <li><a href="/skills" className="text-gray-400 hover:text-orange-500 transition duration-300">Skills</a></li>
              <li><a href="/portfolio" className="text-gray-400 hover:text-orange-500 transition duration-300">My Projects</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-orange-500 transition duration-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-500 mb-4">Contact Info</h3>
            <p className="text-gray-400">Email: funolorunso@gmail.com</p>
            <p className="text-gray-400">Phone: (+234) 813-368-6472</p>
            <p className="text-gray-400">Location: Lagos, Nigeria</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2026 Owotoki Ayomide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
