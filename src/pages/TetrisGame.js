import React, { useState, useEffect, useCallback } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: 'bg-cyan-500' },
  O: { shape: [[1, 1], [1, 1]], color: 'bg-yellow-500' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-purple-500' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-green-500' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-red-500' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'bg-blue-500' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'bg-orange-500' },
};

function createEmptyBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));
}

function getRandomTetromino() {
  const keys = Object.keys(TETROMINOS);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOS[randomKey];
}

function TetrisGame() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(getRandomTetromino());
  const [position, setPosition] = useState({ x: 3, y: 0 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('tetrisHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameOver, setGameOver] = useState(false);

  const isValidMove = useCallback((piece, pos) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT || (newY >= 0 && board[newY][newX])) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  const placePiece = useCallback(() => {
    const newBoard = board.map(row => [...row]);
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }

    // Check for completed lines
    const completedLines = [];
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== 0)) {
        completedLines.push(y);
      }
    }

    // Remove completed lines and add new empty lines at the top
    completedLines.forEach(lineIndex => {
      newBoard.splice(lineIndex, 1);
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    });

    // Update score
    const linesCleared = completedLines.length;
    const points = linesCleared * 100;
    setScore(prev => {
      const newScore = prev + points;
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('tetrisHighScore', newScore.toString());
      }
      return newScore;
    });

    setBoard(newBoard);
    setCurrentPiece(getRandomTetromino());
    setPosition({ x: 3, y: 0 });
  }, [board, currentPiece, position, highScore]);

  const moveDown = useCallback(() => {
    if (isValidMove(currentPiece, { ...position, y: position.y + 1 })) {
      setPosition(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      placePiece();
    }
  }, [currentPiece, position, isValidMove, placePiece]);

  const moveLeft = useCallback(() => {
    if (isValidMove(currentPiece, { ...position, x: position.x - 1 })) {
      setPosition(prev => ({ ...prev, x: prev.x - 1 }));
    }
  }, [currentPiece, position, isValidMove]);

  const moveRight = useCallback(() => {
    if (isValidMove(currentPiece, { ...position, x: position.x + 1 })) {
      setPosition(prev => ({ ...prev, x: prev.x + 1 }));
    }
  }, [currentPiece, position, isValidMove]);

  const rotate = useCallback(() => {
    const rotated = currentPiece.shape[0].map((_, index) =>
      currentPiece.shape.map(row => row[index]).reverse()
    );
    const rotatedPiece = { ...currentPiece, shape: rotated };
    if (isValidMove(rotatedPiece, position)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, position, isValidMove]);

  const handleKeyPress = useCallback((e) => {
    if (gameOver) return;
    switch (e.key) {
      case 'ArrowLeft':
        moveLeft();
        break;
      case 'ArrowRight':
        moveRight();
        break;
      case 'ArrowDown':
        moveDown();
        break;
      case 'ArrowUp':
        rotate();
        break;
      default:
        break;
    }
  }, [gameOver, moveLeft, moveRight, moveDown, rotate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(moveDown, 500);
    return () => clearInterval(interval);
  }, [moveDown, gameOver]);

  useEffect(() => {
    if (position.y === 0 && !isValidMove(currentPiece, position)) {
      setGameOver(true);
    }
  }, [currentPiece, position, isValidMove]);

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPiece(getRandomTetromino());
    setPosition({ x: 3, y: 0 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center w-full">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-orange-500 animate-bounce">Tetris Game</h1>
        <div className="mb-4">
          <p className="text-lg sm:text-xl animate-pulse">Score: {score} | High Score: {highScore}</p>
          <p className="text-gray-400 text-sm sm:text-base">Use arrow keys or on-screen buttons to move and rotate pieces!</p>
        </div>
        <div className="inline-block border-4 border-orange-500 rounded-lg p-1 sm:p-2 bg-gray-800 animate-fade-in max-w-full overflow-auto">
          <div className="grid grid-cols-10 gap-0" style={{ width: '90vw', height: '90vh' }}>
            {board.map((row, y) =>
              row.map((cell, x) => {
                let cellClass = 'bg-gray-700';
                if (cell) {
                  cellClass = cell;
                } else if (
                  y >= position.y &&
                  y < position.y + currentPiece.shape.length &&
                  x >= position.x &&
                  x < position.x + currentPiece.shape[0].length &&
                  currentPiece.shape[y - position.y][x - position.x]
                ) {
                  cellClass = currentPiece.color;
                }
                return <div key={`${y}-${x}`} className={`w-5 h-5 ${cellClass}`} />;
              })
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <div className="flex space-x-4 mb-2">
            <button
              onClick={moveLeft}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              ← Left
            </button>
            <button
              onClick={moveRight}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              → Right
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={moveDown}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              ↓ Down
            </button>
            <button
              onClick={rotate}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              ↻ Rotate
            </button>
          </div>
        </div>
        {gameOver && (
          <div className="mb-4">
            <p className="text-red-500 text-xl">Game Over!</p>
            <button
              onClick={resetGame}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TetrisGame;
