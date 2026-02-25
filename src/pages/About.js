import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function About() {
  const [visitorName, setVisitorName] = useState('');

  useEffect(() => {
    // Get visitor name from localStorage if previously set
    const storedName = localStorage.getItem('visitorName');
    if (storedName) {
      setVisitorName(storedName);
    }
  }, []);

  const handleNameChange = (e) => {
    const name = e.target.value;
    setVisitorName(name);
    // Save to localStorage so it persists across pages
    localStorage.setItem('visitorName', name);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-orange-500 text-center sm:text-left">
          About Me
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bio Section */}
          <div className="space-y-6">
            {/* Personalized Welcome */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-orange-500">
                {visitorName ? `Welcome, ${visitorName}!` : 'Welcome to My Portfolio'}
              </h2>
              <p className="text-gray-300 mb-4">
                I'm <span className="text-orange-500 font-semibold">Owotoki Ayomide</span>, a dedicated and detail-oriented Software Developer with a strong commitment to delivering high-quality client projects.
              </p>
              <p className="text-gray-300 mb-4">
                I take professional development work seriously and prioritize understanding client needs to provide tailored solutions that exceed expectations.
              </p>
              <p className="text-gray-300">
                Whether you need a stunning website, a powerful web application, or custom software solutions, I'm here to bring your vision to life with precision and creativity.
              </p>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-orange-500">My Expertise</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-300"><strong className="text-white">Software Development</strong> — Building custom web applications, responsive websites, and software solutions tailored to your business needs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-300"><strong className="text-white">Game Development</strong> — Creating engaging games and interactive experiences</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-300"><strong className="text-white">Pencil Art</strong> — Grid drawing, realistic portraits, and live picture painting</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-300"><strong className="text-white">Hardware Engineering</strong> — Professional phone and laptop repairs</span>
                </li>
              </ul>
            </div>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Me
            </Link>
          </div>

          {/* Personalize Welcome Section */}
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-orange-500">Personalize Your Visit</h2>
              <p className="text-gray-400 mb-6">
                Enter your name below to see a personalized welcome message tailored just for you!
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="visitorName" className="block text-sm font-medium mb-2 text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="visitorName"
                    name="visitorName"
                    value={visitorName}
                    onChange={handleNameChange}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500"
                  />
                </div>
                
                {visitorName && (
                  <div className="mt-6 p-4 bg-orange-500/20 rounded-lg border border-orange-500/30 animate-fade-in">
                    <p className="text-orange-500 font-semibold text-lg">
                      Welcome, {visitorName}! 👋
                    </p>
                    <p className="text-gray-300 mt-2">
                      Thank you for visiting my portfolio. I'm excited to connect with you and discuss how I can help bring your projects to life.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Ecommerce Link */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-orange-500">View My Full Profile</h3>
              <p className="text-gray-400 mb-4">
                (Enter your name above to see a personalized welcome message tailored just for you!)
              </p>
              <Link
                to="/ecommerce"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                View My Profile
              </Link>
              <p className="text-gray-500 text-sm mt-3 text-center">
                Learn more about my expertise and services
              </p>
            </div>

            {/* Why Choose Me */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-orange-500">Why Work With Me?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Client-Focused Approach</h4>
                    <p className="text-gray-400 text-sm">I listen to understand your unique needs and deliver solutions that truly address your requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Quality Assurance</h4>
                    <p className="text-gray-400 text-sm">Every project undergoes rigorous testing to ensure flawless performance and user experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Timely Delivery</h4>
                    <p className="text-gray-400 text-sm">I respect deadlines and deliver projects on time without compromising quality.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
