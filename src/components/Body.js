import React, { useState } from 'react';

function Body() {
  const [count, setCount] = useState(0);

  return (
    <main style={{
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#0d0d0d',
      minHeight: '60vh',
      color: '#ff4500'
    }}>
      <h2 style={{
        fontSize: '2.5em',
        marginBottom: '20px',
        textShadow: '0 0 15px rgba(255, 69, 0, 0.8)',
        animation: 'glow 2s ease-in-out infinite alternate'
      }}>
        Welcome to the Fiery Realm
      </h2>
      <p style={{
        fontSize: '1.2em',
        marginBottom: '30px',
        color: '#ffa500'
      }}>
        This is the body of the webpage, filled with dark fiery energy.
      </p>
      <div style={{
        margin: '30px 0',
        padding: '20px',
        border: '2px solid #ff4500',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 69, 0, 0.1)',
        boxShadow: '0 0 20px rgba(255, 69, 0, 0.3)',
        animation: 'pulse 3s ease-in-out infinite'
      }}>
        <p style={{
          fontSize: '1.5em',
          marginBottom: '20px',
          color: '#ff6347'
        }}>
          You clicked {count} times
        </p>
        <button onClick={() => setCount(count + 1)} style={{
          padding: '15px 30px',
          fontSize: '1.2em',
          backgroundColor: '#ff4500',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 0 10px rgba(255, 69, 0, 0.5)',
          fontWeight: 'bold'
        }} onMouseOver={(e) => {
          e.target.style.backgroundColor = '#ff6347';
          e.target.style.boxShadow = '0 0 20px rgba(255, 99, 71, 0.8)';
          e.target.style.transform = 'scale(1.05)';
        }} onMouseOut={(e) => {
          e.target.style.backgroundColor = '#ff4500';
          e.target.style.boxShadow = '0 0 10px rgba(255, 69, 0, 0.5)';
          e.target.style.transform = 'scale(1)';
        }}>
          Welcome to my portfolio!
        </button>
      </div>
      <style>
        {`
          @keyframes glow {
            from { text-shadow: 0 0 10px rgba(255, 69, 0, 0.8); }
            to { text-shadow: 0 0 20px rgba(255, 69, 0, 1), 0 0 30px rgba(255, 69, 0, 0.5); }
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 20px rgba(255, 69, 0, 0.3); }
            50% { box-shadow: 0 0 30px rgba(255, 69, 0, 0.6); }
            100% { box-shadow: 0 0 20px rgba(255, 69, 0, 0.3); }
          }
        `}
      </style>
    </main>
  );
}

export default Body;
