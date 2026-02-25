import React from 'react';

function Header() {
  return (
    <header style={{
      backgroundColor: '#0d0d0d',
      color: '#ff4500',
      padding: '20px',
      textAlign: 'center',
      borderBottom: '2px solid #ff4500',
      boxShadow: '0 0 10px rgba(255, 69, 0, 0.5)'
    }}>
      <h1 style={{
        fontSize: '2.5em',
        margin: '0',
        textShadow: '0 0 15px rgba(255, 69, 0, 0.8)',
        animation: 'glow 2s ease-in-out infinite alternate'
      }}>
        Bigtokz
      </h1>
      <style>
        {`
          @keyframes glow {
            from { text-shadow: 0 0 10px rgba(255, 69, 0, 0.8); }
            to { text-shadow: 0 0 20px rgba(255, 69, 0, 1), 0 0 30px rgba(255, 69, 0, 0.5); }
          }
        `}
      </style>
    </header>
  );
}

export default Header;
