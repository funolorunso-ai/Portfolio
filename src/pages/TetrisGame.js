import React, { useState, useEffect, useCallback, useRef } from 'react';

// Game constants
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 20;
const GAME_SPEED = 800;

// Tetromino definitions with colors
const TETROMINOS = {
  I: { 
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ], 
    color: '#00f5ff' 
  },
  O: { 
    shape: [
      [1, 1],
      [1, 1]
    ], 
    color: '#ffd700' 
  },
  T: { 
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ], 
    color: '#9b59b6' 
  },
  S: { 
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ], 
    color: '#2ecc71' 
  },
  Z: { 
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ], 
    color: '#e74c3c' 
  },
  J: { 
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ], 
    color: '#3498db' 
  },
  L: { 
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ], 
    color: '#e67e22' 
  },
};

// Local storage key
const HIGH_SCORES_KEY = 'tetrisHighScores';

// Create empty board
function createEmptyBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));
}

// Get random tetromino
function getRandomTetromino() {
  const keys = Object.keys(TETROMINOS);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return { ...TETROMINOS[randomKey], key: randomKey };
}

// Rotate matrix
function rotateMatrix(matrix) {
  return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse());
}

function TetrisGame() {
  // Game state
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [linesCleared, setLinesCleared] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highScores, setHighScores] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Refs
  const gameLoopRef = useRef(null);

  // Load high scores from localStorage
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

  // Save high scores
  const saveHighScores = useCallback((scores) => {
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
    setHighScores(scores);
  }, []);

  // Clear high scores
  const clearHighScores = useCallback(() => {
    saveHighScores([]);
  }, [saveHighScores]);

  // Spawn new piece
  const spawnPiece = useCallback(() => {
    const newPiece = getRandomTetromino();
    const startX = Math.floor((BOARD_WIDTH - newPiece.shape[0].length) / 2);
    
    // Check if game over - if new piece can't spawn
    for (let y = 0; y < newPiece.shape.length; y++) {
      for (let x = 0; x < newPiece.shape[y].length; x++) {
        if (newPiece.shape[y][x]) {
          const boardY = y;
          const boardX = startX + x;
          if (board[boardY] && board[boardY][boardX]) {
            setGameOver(true);
            // Save high score on game over
            if (linesCleared > 0) {
              const newHighScoreList = [
                ...highScores,
                { score: linesCleared, date: new Date().toLocaleDateString() }
              ]
                .sort((a, b) => b.score - a.score)
                .slice(0, 10);
              saveHighScores(newHighScoreList);
            }
            return;
          }
        }
      }
    }
    
    setCurrentPiece(newPiece);
    setPosition({ x: startX, y: 0 });
  }, [board, highScores, linesCleared, saveHighScores]);

  // Start game
  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLinesCleared(0);
    setGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
    
    // Spawn first piece after a small delay
    setTimeout(() => {
      const newPiece = getRandomTetromino();
      const startX = Math.floor((BOARD_WIDTH - newPiece.shape[0].length) / 2);
      setCurrentPiece(newPiece);
      setPosition({ x: startX, y: 0 });
    }, 100);
  }, []);

  // Check if move is valid
  const isValidMove = useCallback((piece, pos, currentBoard = board) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          
          // Check boundaries
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return false;
          }
          
          // Check collision with existing blocks
          if (newY >= 0 && currentBoard[newY][newX]) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  // Place piece on board
  const placePiece = useCallback(() => {
    if (!currentPiece) return;

    const newBoard = board.map(row => [...row]);
    
    // Add current piece to board
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }

    // Check for completed lines
    let completedLines = 0;
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== null)) {
        completedLines++;
        // Remove the completed line
        newBoard.splice(y, 1);
        // Add empty line at top
        newBoard.unshift(Array(BOARD_WIDTH).fill(null));
        // Adjust index since we removed a line
        y++;
      }
    }

    // Update score and lines
    if (completedLines > 0) {
      setLinesCleared(prev => prev + completedLines);
      setScore(prev => prev + completedLines * 100);
    }

    setBoard(newBoard);
    spawnPiece();
  }, [board, currentPiece, position, spawnPiece]);

  // Move piece down
  const moveDown = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    if (isValidMove(currentPiece, { ...position, y: position.y + 1 })) {
      setPosition(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      placePiece();
    }
  }, [currentPiece, gameOver, isPaused, isValidMove, placePiece, position]);

  // Move piece left
  const moveLeft = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    if (isValidMove(currentPiece, { ...position, x: position.x - 1 })) {
      setPosition(prev => ({ ...prev, x: prev.x - 1 }));
    }
  }, [currentPiece, gameOver, isPaused, isValidMove, position]);

  // Move piece right
  const moveRight = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    if (isValidMove(currentPiece, { ...position, x: position.x + 1 })) {
      setPosition(prev => ({ ...prev, x: prev.x + 1 }));
    }
  }, [currentPiece, gameOver, isPaused, isValidMove, position]);

  // Rotate piece
  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const rotatedShape = rotateMatrix(currentPiece.shape);
    const rotatedPiece = { ...currentPiece, shape: rotatedShape };
    
    // Try normal rotation first
    if (isValidMove(rotatedPiece, position)) {
      setCurrentPiece(rotatedPiece);
    } 
    // Try wall kick (move left if rotation hits wall)
    else if (isValidMove(rotatedPiece, { ...position, x: position.x - 1 })) {
      setCurrentPiece(rotatedPiece);
      setPosition(prev => ({ ...prev, x: prev.x - 1 }));
    }
    // Try wall kick (move right if rotation hits wall)
    else if (isValidMove(rotatedPiece, { ...position, x: position.x + 1 })) {
      setCurrentPiece(rotatedPiece);
      setPosition(prev => ({ ...prev, x: prev.x + 1 }));
    }
  }, [currentPiece, gameOver, isPaused, isValidMove, position]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || isPaused) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotatePiece();
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, isPaused, moveLeft, moveRight, moveDown, rotatePiece]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused || !isPlaying) return;

    gameLoopRef.current = setInterval(moveDown, GAME_SPEED);
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameOver, isPaused, isPlaying, moveDown]);

  // Reset game
  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLinesCleared(0);
    setGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
    setCurrentPiece(null);
    
    // Spawn first piece
    setTimeout(() => {
      const newPiece = getRandomTetromino();
      const startX = Math.floor((BOARD_WIDTH - newPiece.shape[0].length) / 2);
      setCurrentPiece(newPiece);
      setPosition({ x: startX, y: 0 });
    }, 100);
  }, []);

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
    gameContainer: {
      position: 'relative',
      background: '#0f0f23',
      borderRadius: '12px',
      padding: '10px',
      boxShadow: '0 0 30px rgba(255, 165, 0, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.5)',
      border: '2px solid #ffa500',
    },
    title: {
      color: '#ffa500',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '15px',
      textShadow: '0 0 10px rgba(255, 165, 0, 0.5)',
      letterSpacing: '3px',
    },
    gameBoard: {
      display: 'grid',
      gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
      gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
      gap: '1px',
      background: '#1a1a2e',
      borderRadius: '8px',
      overflow: 'hidden',
      width: 'min(70vw, 300px)',
      height: 'min(70vw, 600px)',
    },
    cell: {
      background: '#1a1a2e',
      borderRadius: '2px',
    },
    cellFilled: {
      borderRadius: '3px',
      boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.3)',
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
      color: '#ffa500',
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
      background: 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)',
      color: '#0f0f23',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(255, 165, 0, 0.3)',
    },
    controlRow: {
      display: 'flex',
      gap: '10px',
    },
    startButton: {
      padding: '20px 50px',
      background: 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)',
      color: '#0f0f23',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(255, 165, 0, 0.5)',
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
    },
    finalScore: {
      color: '#fff',
      fontSize: '1.5rem',
      marginBottom: '10px',
    },
    playAgainButton: {
      padding: '15px 40px',
      background: 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)',
      color: '#0f0f23',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(255, 165, 0, 0.5)',
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
    startScreen: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
    },
  };

  // CSS styles
  const cssStyles = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
    }
  `;

  // Render game board
  const renderBoard = () => {
    const cells = [];
    
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        const isCellFilled = board[y][x] !== null;
        let cellColor = null;
        
        // Check if current piece occupies this cell
        if (currentPiece && !gameOver) {
          const pieceY = y - position.y;
          const pieceX = x - position.x;
          if (
            pieceY >= 0 && 
            pieceY < currentPiece.shape.length &&
            pieceX >= 0 && 
            pieceX < currentPiece.shape[0].length &&
            currentPiece.shape[pieceY][pieceX]
          ) {
            cellColor = currentPiece.color;
          }
        }
        
        // Use board color if no piece color
        if (!cellColor && isCellFilled) {
          cellColor = board[y][x];
        }
        
        const cellStyle = {
          ...styles.cell,
          ...(cellColor ? { background: cellColor, ...styles.cellFilled } : {}),
        };
        
        cells.push(
          <div key={`${y}-${x}`} style={cellStyle} />
        );
      }
    }
    
    return cells;
  };

  return (
    <>
      <style>{cssStyles}</style>
      <div style={styles.container}>
        <h1 style={styles.title}>🎮 TETRIS</h1>
        
        {!isPlaying ? (
          // Start Screen
          <div style={styles.startScreen}>
            <div style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '20px' }}>
              Ready to Play?
            </div>
            <button 
              style={styles.startButton}
              onClick={startGame}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Start Game
            </button>
            <div style={styles.instructions}>
              <p>Use <strong>Arrow Keys</strong> to move and rotate</p>
              <p>Press <strong>SPACE</strong> to pause</p>
              <p>Clear lines to score points!</p>
            </div>
          </div>
        ) : (
          // Game Screen
          <div style={styles.gameWrapper}>
            {/* Game Board */}
            <div style={styles.gameContainer}>
              <div style={styles.gameBoard}>
                {renderBoard()}
              </div>

              {/* Game Over Overlay */}
              {gameOver && (
                <div style={styles.gameOverOverlay}>
                  <div style={styles.gameOverText}>GAME OVER</div>
                  <div style={styles.finalScore}>
                    Lines Cleared: <span style={{ color: '#ffa500', fontWeight: 'bold' }}>{linesCleared}</span>
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

            {/* Sidebar with Score and High Scores */}
            <div style={styles.sidebar}>
              <div style={styles.scoreDisplay}>
                <div style={styles.scoreLabel}>LINES CLEARED</div>
                <div style={styles.scoreValue}>{linesCleared}</div>
              </div>

              <div style={styles.scoreDisplay}>
                <div style={styles.scoreLabel}>SCORE</div>
                <div style={{ ...styles.scoreValue, fontSize: '1.5rem' }}>{score}</div>
              </div>

              {highScores.length > 0 && (
                <div style={styles.highScoreSection}>
                  <div style={styles.highScoreTitle}>🏆 HIGH SCORES</div>
                  <ul style={styles.highScoreList}>
                    {highScores.slice(0, 5).map((hs, index) => (
                      <li key={index} style={styles.highScoreItem}>
                        <span>
                          <span style={styles.highScoreRank}>#{index + 1}</span>
                          <span style={{ color: '#ffa500', fontWeight: 'bold' }}>{hs.score} lines</span>
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
        )}

        {/* Mobile Controls */}
        {isPlaying && !gameOver && (
          <div style={styles.controls}>
            <button 
              style={styles.controlButton}
              onClick={rotatePiece}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              ↻ ROTATE
            </button>
            <div style={styles.controlRow}>
              <button 
                style={styles.controlButton}
                onClick={moveLeft}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                ◀ LEFT
              </button>
              <button 
                style={styles.controlButton}
                onClick={moveRight}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                RIGHT ▶
              </button>
            </div>
            <button 
              style={styles.controlButton}
              onClick={moveDown}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              ▼ DOWN
            </button>
          </div>
        )}

        {isPlaying && (
          <div style={styles.instructions}>
            <p>Use <strong>Arrow Keys</strong> to move and rotate</p>
            <p>Press <strong>SPACE</strong> to pause</p>
          </div>
        )}
      </div>
    </>
  );
}

export default TetrisGame;
