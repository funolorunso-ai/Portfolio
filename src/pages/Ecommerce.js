import React, { useState, useEffect } from 'react';

function Ecommerce() {
  const [userData, setUserData] = useState({ name: '', age: '', address: '' });

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-orange-500 animate-bounce">E-commerce Page</h1>
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-lg sm:text-2xl font-semibold mb-4 animate-pulse">Mobile Software and Hardware Engineer Profile</h2>
          <div className="space-y-4">
            <div className="animate-slide-in-left transform hover:scale-105 transition-transform duration-300">
              <p className="text-gray-400 text-sm sm:text-base">
                <strong>Name:</strong> {userData.name || 'Not provided'}
              </p>
            </div>
            <div className="animate-slide-in-right transform hover:scale-105 transition-transform duration-300">
              <p className="text-gray-400 text-sm sm:text-base">
                <strong>Age:</strong> {userData.age || 'Not provided'}
              </p>
            </div>
            <div className="animate-slide-in-left transform hover:scale-105 transition-transform duration-300">
              <p className="text-gray-400 text-sm sm:text-base">
                <strong>Address:</strong> {userData.address || 'Not provided'}
              </p>
            </div>
          </div>
          <div className="mt-6 animate-bounce">
            <p className="text-base sm:text-lg">
              {userData.name ? `${userData.name} is a skilled mobile software and hardware engineer with ${userData.age ? userData.age : 'extensive'} years of experience in developing innovative mobile solutions. Based in ${userData.address || 'various locations'}, they specialize in creating cutting-edge applications and hardware integrations that push the boundaries of mobile technology.` : 'Please provide your information in the About page to see your personalized description.'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 animate-fade-in-up hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Mobile Apps</h3>
            <p className="text-gray-400 text-sm sm:text-base">Custom mobile applications for iOS and Android platforms.</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 animate-fade-in-up animation-delay-200 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Hardware Integration</h3>
            <p className="text-gray-400 text-sm sm:text-base">Seamless integration of software with custom hardware solutions.</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 animate-fade-in-up animation-delay-400 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">IoT Solutions</h3>
            <p className="text-gray-400 text-sm sm:text-base">Internet of Things applications connecting devices and services.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ecommerce;
