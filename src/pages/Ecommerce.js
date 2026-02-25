import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Ecommerce() {
  const [visitorName, setVisitorName] = useState('');

  useEffect(() => {
    // Get visitor name from localStorage if previously set
    const storedName = localStorage.getItem('visitorName');
    if (storedName) {
      setVisitorName(storedName);
    }
  }, []);

  const expertise = [
    {
      title: 'Software Development',
      description: 'Building custom web applications, responsive websites, and software solutions tailored to business needs. Specializing in React, JavaScript, and modern web technologies.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      title: 'Game Development',
      description: 'Creating engaging games and interactive experiences for various platforms. Building both 2D and 3D games with smooth gameplay mechanics.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      color: 'bg-purple-500'
    },
    {
      title: 'Pencil Art',
      description: 'Expert in grid drawing, realistic portraits, and painting live pictures. Creating stunning artwork with meticulous attention to detail.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      color: 'bg-yellow-500'
    },
    {
      title: 'Hardware Engineering',
      description: 'Professional phone and laptop repairs. Diagnosing and fixing hardware issues with precision and expertise.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: 'bg-green-500'
    }
  ];

  const services = [
    'Custom Web Application Development',
    'Responsive Website Design',
    'Mobile App Development',
    'Game Design & Development',
    'Pencil Portrait Commission',
    'Hardware Repair & Maintenance',
    'Technical Consultation',
    'Project Management'
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-orange-500 animate-bounce">
            Welcome to My Portfolio
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
            {visitorName ? `${visitorName}, meet` : "Meet"} <span className="text-orange-500 font-semibold">Owotoki Ayomide</span> — a talented Software Developer, Game Developer, Pencil Artist, and Hardware Engineer.
          </p>
        </div>

        {/* Personalized Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 sm:p-8 mb-8 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            {visitorName ? `Welcome, ${visitorName}!` : 'Welcome, Visitor!'}
          </h2>
          <p className="text-center text-lg max-w-2xl mx-auto">
            Thank you for exploring my portfolio. I'm excited to share my work and expertise with you. Feel free to browse through my projects and services.
          </p>
        </div>

        {/* About Section */}
        <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mb-8 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-500 text-center">
            About Me
          </h2>
          <div className="space-y-4 text-gray-300 max-w-3xl mx-auto">
            <p className="text-lg">
              I'm <strong className="text-white">Owotoki Ayomide</strong>, a dedicated and detail-oriented developer with a passion for creating exceptional digital experiences.
            </p>
            <p>
              As a <strong className="text-white">Software Developer</strong>, I specialize in building custom web applications and responsive websites that help businesses thrive in the digital landscape. My client-focused approach ensures that every solution is tailored to meet unique business requirements.
            </p>
            <p>
              In addition to software development, I'm an experienced <strong className="text-white">Game Developer</strong> creating engaging interactive experiences, a skilled <strong className="text-white">Pencil Artist</strong> specializing in grid drawing and realistic portraits, and a professional <strong className="text-white">Hardware Engineer</strong> offering expert phone and laptop repair services.
            </p>
            <p>
              I take pride in delivering high-quality work that exceeds client expectations. Let's collaborate to bring your vision to life!
            </p>
          </div>
          
          {/* Contact CTA */}
          <div className="text-center mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Expertise Cards */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-orange-500">
          My Expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {expertise.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg p-4 sm:p-6 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className={`${item.color} w-14 h-14 rounded-full flex items-center justify-center mb-4 text-white`}>
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Services List */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-orange-500">
          Services Offered
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3 hover:bg-gray-700 transition-colors duration-300"
            >
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-200">{service}</span>
            </div>
          ))}
        </div>

        {/* Why Choose Me Section */}
        <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mb-8 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-500 text-center">
            Why Work With Me?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-400">Every project undergoes rigorous testing to ensure flawless performance.</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a0 11-18 0 9 9 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Timely Delivery</h3>
              <p className="text-gray-400">Respecting deadlines and delivering projects on time, every time.</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Client-Focused</h3>
              <p className="text-gray-400">Your needs are my priority. I listen and deliver tailored solutions.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Whether you need a stunning website, custom software, a creative game, artwork, or hardware repair — I'm here to help!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
          >
            Contact Me Today
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Ecommerce;
