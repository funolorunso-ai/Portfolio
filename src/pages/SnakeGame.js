import React, { useState, useEffect, useCallback, useRef } from 'react';

// Game constants
const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

// Direction mapping
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

// Local storage keys
const HIGH_SCORES_KEY = 'snakeHighScores';

// Helper function to check if position is occupied
const isPositionOccupied = (pos, snake) => {
  return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
};

// Generate food at random unoccupied position
const generateFood = (currentSnake) => {
  let newFood;
  let isValidPosition = false;
  
  while (!isValidPosition) {
    newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
    
    isValidPosition = !isPositionOccupied(newFood, currentSnake);
  }
  
  return newFood;
};

function SnakeGame() {
  // Game state
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  
  // Refs for game loop
  const gameLoopRef = useRef(null);
  const directionChangedRef = useRef(false);
  const highScoresRef = useRef(highScores);

  // Keep ref updated with latest highScores
  useEffect(() => {
    highScoresRef.current = highScores;
  }, [highScores]);

  // Load high scores from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem(HIGH_SCORES_KEY);
    if (savedScores) {
      try {
        const parsed = JSON.parse(savedScores);
        setHighScores(parsed);
      } catch (e) {
        console.error('Failed to parse high scores:', e);
        setHighScores([]);
      }
    }
  }, []);

  // Save high scores to localStorage
  const saveHighScores = useCallback((scores) => {
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
    setHighScores(scores);
  }, []);

  // Handle high score update
  const updateHighScore = useCallback((newScore) => {
    if (newScore > 0) {
      const currentHighScores = highScoresRef.current;
      const newHighScoreList = [
        ...currentHighScores,
        { score: newScore, date: new Date().toLocaleDateString() }
      ]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // Keep top 10
      
      saveHighScores(newHighScoreList);
    }
  }, [saveHighScores]);

  // Clear all high scores
  const clearHighScores = useCallback(() => {
    saveHighScores([]);
  }, [saveHighScores]);

  // Reset game
  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setIsPaused(false);
    setScore(0);
    directionChangedRef.current = false;
  }, []);

  // Game move logic
  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      // Apply direction change (only once per move)
      if (!directionChangedRef.current) {
        directionChangedRef.current = true;
      }
      
      head.x += nextDirection.x;
      head.y += nextDirection.y;

      // Check boundary collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true);
        setScore(currentScore => {
          updateHighScore(currentScore);
          return currentScore;
        });
        return currentSnake;
      }

      // Check self collision (excluding tail which will move)
      if (newSnake.slice(0, -1).some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setScore(currentScore => {
          updateHighScore(currentScore);
          return currentScore;
        });
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        const newFood = generateFood(newSnake);
        setFood(newFood);
        // Don't pop - snake grows
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameOver, isPaused, nextDirection, food, updateHighScore]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      
      // Prevent default for arrow keys
      if (DIRECTIONS[e.key]) {
        e.preventDefault();
        
        // Prevent reversing direction
        const newDir = DIRECTIONS[e.key];
        const isOpposite = (
          (newDir.x === -direction.x && newDir.x !== 0) ||
          (newDir.y === -direction.y && newDir.y !== 0)
        );
        
        if (!isOpposite) {
          setNextDirection(newDir);
          directionChangedRef.current = false;
        }
      }
      
      // Pause/Resume with Space
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, direction]);

  // Game loop
  useEffect(() => {
    if (!gameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameOver, isPaused, moveSnake]);

  // Sync direction with nextDirection after each move
  useEffect(() => {
    if (!gameOver) {
      setDirection(nextDirection);
    }
  }, [nextDirection, gameOver]);

  // Mobile/tablet detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile direction controls
  const handleDirectionChange = (newDir) => {
    if (gameOver) return;
    
    const isOpposite = (
      (newDir.x === -direction.x && newDir.x !== 0) ||
      (newDir.y === -direction.y && newDir.y !== 0)
    );
    
    if (!isOpposite) {
      setNextDirection(newDir);
      directionChangedRef.current = false;
    }
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gameWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'flex-start',
      maxWidth: '1200px',
      width: '100%',
    },
    gameSection: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      gap: '15px',
    },
    gameContainer: {
      position: 'relative',
      background: '#0f0f23',
      borderRadius: '12px',
      padding: '10px',
      boxShadow: '0 0 30px rgba(0, 255, 136, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.5)',
      border: '2px solid #00ff88',
    },
    title: {
      color: '#00ff88',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '15px',
      textShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
      letterSpacing: '3px',
    },
    gameBoard: {
      display: 'grid',
      gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
      gap: '1px',
      background: '#1a1a2e',
      borderRadius: '8px',
      overflow: 'hidden',
      width: 'min(80vw, 400px)',
      height: 'min(80vw, 400px)',
    },
    cell: {
      background: '#1a1a2e',
      aspectRatio: '1',
      borderRadius: '2px',
    },
    snakeHead: {
      background: '#00ff88',
      borderRadius: '4px',
      boxShadow: '0 0 10px rgba(0, 255, 136, 0.8)',
    },
    snakeBody: {
      background: '#00cc6a',
      borderRadius: '3px',
    },
    food: {
      background: '#ff4757',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(255, 71, 87, 0.8)',
      animation: 'pulse 1s infinite',
    },
    sidebar: {
      background: '#0f0f23',
      borderRadius: '12px',
      padding: '20px',
      minWidth: '200px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
      border: '1px solid #2d2d4a',
    },
    scoreDisplay: {
      color: '#fff',
      fontSize: '1.5rem',
      marginBottom: '20px',
      padding: '15px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)',
      borderRadius: '8px',
      textAlign: 'center',
    },
    scoreLabel: {
      color: '#888',
      fontSize: '0.9rem',
      marginBottom: '5px',
    },
    scoreValue: {
      color: '#00ff88',
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    highScoreSection: {
      marginTop: '20px',
    },
    highScoreTitle: {
      color: '#ffd700',
      fontSize: '1.2rem',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    highScoreList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      maxHeight: '200px',
      overflowY: 'auto',
    },
    highScoreItem: {
      color: '#fff',
      padding: '8px 12px',
      marginBottom: '5px',
      background: '#1a1a2e',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    highScoreRank: {
      color: '#ffd700',
      marginRight: '10px',
      fontWeight: 'bold',
    },
    highScoreDate: {
      color: '#666',
      fontSize: '0.8rem',
    },
    clearButton: {
      width: '100%',
      padding: '10px',
      marginTop: '15px',
      background: '#ff4757',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
    },
    controls: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
    },
    controlButton: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
      color: '#0f0f23',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)',
    },
    controlRow: {
      display: 'flex',
      gap: '10px',
    },
    mobileControlsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '400px',
      marginTop: '15px',
      marginBottom: '15px',
    },
    mobileControlsInline: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
    },
    gameOverOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
      zIndex: 10,
    },
    gameOverText: {
      color: '#ff4757',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      textShadow: '0 0 20px rgba(255, 71, 87, 0.8)',
      animation: 'shake 0.5s ease-in-out',
    },
    playAgainButton: {
      padding: '15px 40px',
      background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
      color: '#0f0f23',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(0, 255, 136, 0.5)',
    },
    pauseOverlay: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '20px 40px',
      borderRadius: '10px',
      color: '#fff',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      zIndex: 5,
    },
    instructions: {
      color: '#666',
      textAlign: 'center',
      marginTop: '15px',
      fontSize: '0.85rem',
      lineHeight: '1.6',
    },
  };

  // CSS for animations (injected into the component)
  const cssStyles = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      <div style={styles.container}>
        <h1 style={styles.title}>🐍 SNAKE GAME</h1>
        
        <div style={styles.gameWrapper}>
          {/* Game Section - Board + Controls on mobile */}
          <div style={styles.gameSection}>
            {/* Game Board */}
            <div style={styles.gameContainer}>
              <div style={styles.gameBoard}>
                {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
                  const x = index % BOARD_SIZE;
                  const y = Math.floor(index / BOARD_SIZE);
                  const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
                  const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
                  const isFood = food.x === x && food.y === y;

                  let cellStyle = { ...styles.cell };
                  if (isSnakeHead) {
                    cellStyle = { ...cellStyle, ...styles.snakeHead };
                  } else if (isSnakeBody) {
                    cellStyle = { ...cellStyle, ...styles.snakeBody };
                  } else if (isFood) {
                    cellStyle = { ...cellStyle, ...styles.food };
                  }

                  return (
                    <div key={index} style={cellStyle} />
                  );
                })}
              </div>

              {/* Game Over Overlay */}
              {gameOver && (
                <div style={styles.gameOverOverlay}>
                  <div style={styles.gameOverText}>GAME OVER</div>
                  <div style={{ color: '#fff', marginBottom: '20px', fontSize: '1.2rem' }}>
                    Final Score: <span style={{ color: '#00ff88', fontWeight: 'bold' }}>{score}</span>
                  </div>
                  <button 
                    style={styles.playAgainButton}
                    onClick={resetGame}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    Play Again
                  </button>
                </div>
              )}

              {/* Pause Overlay */}
              {isPaused && !gameOver && (
                <div style={styles.pauseOverlay}>
                  PAUSED
                  <div style={{ fontSize: '0.9rem', marginTop: '10px', color: '#888' }}>
                    Press SPACE to resume
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Controls - Beside game board on mobile */}
            {isMobile && (
              <div style={styles.mobileControlsInline}>
                <button 
                  style={styles.controlButton}
                  onClick={() => handleDirectionChange(DIRECTIONS.ArrowUp)}
                >
                  ▲ UP
                </button>
                <div style={styles.controlRow}>
                  <button 
                    style={styles.controlButton}
                    onClick={() => handleDirectionChange(DIRECTIONS.ArrowLeft)}
                  >
                    ◀ LEFT
                  </button>
                  <button 
                    style={styles.controlButton}
                    onClick={() => handleDirectionChange(DIRECTIONS.ArrowRight)}
                  >
                    RIGHT ▶
                  </button>
                </div>
                <button 
                  style={styles.controlButton}
                  onClick={() => handleDirectionChange(DIRECTIONS.ArrowDown)}
                >
                  ▼ DOWN
                </button>
              </div>
            )}
          </div>

          {/* Sidebar with Score and High Scores */}
          <div style={styles.sidebar}>
            <div style={styles.scoreDisplay}>
              <div style={styles.scoreLabel}>CURRENT SCORE</div>
              <div style={styles.scoreValue}>{score}</div>
            </div>

            {highScores.length > 0 && (
              <div style={styles.highScoreSection}>
                <div style={styles.highScoreTitle}>🏆 HIGH SCORES</div>
                <ul style={styles.highScoreList}>
                  {highScores.slice(0, 5).map((hs, index) => (
                    <li key={index} style={styles.highScoreItem}>
                      <span>
                        <span style={styles.highScoreRank}>#{index + 1}</span>
                        <span style={{ color: '#00ff88', fontWeight: 'bold' }}>{hs.score}</span>
                      </span>
                      <span style={styles.highScoreDate}>{hs.date}</span>
                    </li>
                  ))}
                </ul>
                {highScores.length > 5 && (
                  <div style={{ color: '#666', textAlign: 'center', marginTop: '10px', fontSize: '0.8rem' }}>
                    +{highScores.length - 5} more scores
                  </div>
                )}
                <button 
                  style={styles.clearButton}
                  onClick={clearHighScores}
                  onMouseOver={(e) => e.target.style.background = '#ff6b7a'}
                  onMouseOut={(e) => e.target.style.background = '#ff4757'}
                >
                  Clear All Scores
                </button>
              </div>
            )}

            {highScores.length === 0 && (
              <div style={{ ...styles.highScoreSection, textAlign: 'center' }}>
                <div style={{ color: '#666', marginBottom: '15px' }}>
                  No high scores yet!
                </div>
                <div style={{ ...styles.clearButton, background: '#2d2d4a', cursor: 'default', opacity: 0.5 }}>
                  No scores to clear
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Controls - Show below on desktop */}
        {!isMobile && (
        <div style={styles.controls}>
          <button 
            style={styles.controlButton}
            onClick={() => handleDirectionChange(DIRECTIONS.ArrowUp)}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            ▲ UP
          </button>
          <div style={styles.controlRow}>
            <button 
              style={styles.controlButton}
              onClick={() => handleDirectionChange(DIRECTIONS.ArrowLeft)}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              ◀ LEFT
            </button>
            <button 
              style={styles.controlButton}
              onClick={() => handleDirectionChange(DIRECTIONS.ArrowRight)}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              RIGHT ▶
            </button>
          </div>
          <button 
            style={styles.controlButton}
            onClick={() => handleDirectionChange(DIRECTIONS.ArrowDown)}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            ▼ DOWN
          </button>
        </div>
        )}

        <div style={styles.instructions}>
          <p>Use <strong>Arrow Keys</strong> to move the snake</p>
          <p>Press <strong>SPACE</strong> to pause/resume</p>
          <p>Eat the red food to grow and earn points!</p>
        </div>
      </div>
    </>
  );
}

export default SnakeGame;
