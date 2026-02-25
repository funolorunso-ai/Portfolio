import React from 'react';

function Portfolio() {
  const projects = [
    {
      title: 'Snake Game',
      description: 'Play the classic Snake game built with React - use arrow keys to move, eat food to grow, and avoid hitting walls or yourself!',
      image: '/assets/snake.png',
      link: '/snake',
    },
    {
      title: 'Tetris Game',
      description: 'Experience the classic block-stacking Tetris game with modern styling - clear lines to score points and challenge yourself!',
      image: '/assets/tetris.png',
      link: '/tetris',
    },
    {
      title: 'My Portfolio Page',
      description: 'View my complete portfolio showcasing all expertise including Software Development, Game Development, Pencil Art, and Hardware Engineering.',
      image: '/assets/commerce.png',
      link: '/ecommerce',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-orange-500 animate-bounce">My Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
              <img src={project.image} alt={project.title} className="w-full h-32 sm:h-48 object-cover" />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm sm:text-base">{project.description}</p>
                <a
                  href={project.link}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-110 text-sm sm:text-base"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
