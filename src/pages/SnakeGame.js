import React, { useState, useEffect, useCallback } from 'react';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const generateFood = useCallback(() => {
    const newFood = () => ({
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    });
    let food;
    do {
      food = newFood();
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
    setFood(food);
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE ||
          newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return currentSnake;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore(prev => {
          const newScore = prev + 1;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snakeHighScore', newScore.toString());
          }
          return newScore;
        });
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, generateFood]);

  const handleKeyPress = useCallback((e) => {
    if (DIRECTIONS[e.key]) {
      setDirection(DIRECTIONS[e.key]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(DIRECTIONS.ArrowRight);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-none text-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-orange-500 animate-bounce">Snake Game</h1>
        <div className="mb-4">
          <p className="text-lg sm:text-xl animate-pulse">Score: {score} | High Score: {highScore}</p>
          <p className="text-gray-400 text-sm sm:text-base">Use arrow keys or on-screen buttons to move the snake. Eat the food to grow!</p>
        </div>
        <div className="inline-block border-4 border-orange-500 rounded-lg p-1 sm:p-2 bg-gray-800 animate-fade-in max-w-full overflow-auto">
          <div className="grid grid-cols-20 gap-0" style={{ width: 'min(90vw, 90vh)', height: 'min(90vw, 90vh)' }}>
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
              const x = index % BOARD_SIZE;
              const y = Math.floor(index / BOARD_SIZE);
              const isSnakeHead = snake[0] && snake[0].x === x && snake[0].y === y;
              const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={index}
                  className={`w-5 h-5 ${
                    isSnakeHead ? 'bg-green-500' :
                    isSnakeBody ? 'bg-green-400' :
                    isFood ? 'bg-red-500' :
                    'bg-gray-700'
                  }`}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={() => setDirection(DIRECTIONS.ArrowUp)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mb-2 transition duration-300"
          >
            ↑ Up
          </button>
          <div className="flex space-x-4">
            <button
              onClick={() => setDirection(DIRECTIONS.ArrowLeft)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              ← Left
            </button>
            <button
              onClick={() => setDirection(DIRECTIONS.ArrowRight)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              → Right
            </button>
          </div>
          <button
            onClick={() => setDirection(DIRECTIONS.ArrowDown)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-2 transition duration-300"
          >
            ↓ Down
          </button>
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

export default SnakeGame;
