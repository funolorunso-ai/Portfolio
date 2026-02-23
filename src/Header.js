import React from 'react';

function Header() {
  return (
    <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
      <h1>Welcome to My React Webpage</h1>
      <nav>
        <a href="#" style={{ color: 'white', margin: '0 10px' }}>Home</a>
        <a href="#" style={{ color: 'white', margin: '0 10px' }}>About</a>
        <a href="#" style={{ color: 'white', margin: '0 10px' }}>Contact</a>
      </nav>
    </header>
  );
}

export default Header;
