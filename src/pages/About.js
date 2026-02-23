import React, { useState } from 'react';

function About() {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    address: '',
  });

  const handleChange = (e) => {
    const newData = {
      ...userData,
      [e.target.name]: e.target.value,
    };
    setUserData(newData);
    localStorage.setItem('userData', JSON.stringify(newData));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-orange-500">About Me</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
            <p className="text-gray-400 mb-4">
              I'm a passionate developer with a love for creating beautiful and functional web applications.
              I specialize in React, JavaScript, and modern web technologies.
            </p>
            <p className="text-gray-400">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
              or enjoying a good cup of coffee.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={userData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </form>
            <button
              onClick={() => window.location.href = '/ecommerce'}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 animate-pulse"
            >
              View My Engineer Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
