import React, { useState } from 'react';

function Body() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Main Content</h2>
      <p>This is the body of the webpage.</p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Click me
      </button>
    </main>
  );
}

export default Body;
