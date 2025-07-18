import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const speed = 1500;

  // Start game
  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameStarted(true);
    setGameOver(false);
  };

  // Move target every 500ms
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveInterval = setInterval(() => {
      const top = Math.floor(Math.random() * 80) + '%';
      const left = Math.floor(Math.random() * 80) + '%';
      setPosition({ top, left });
    }, speed);

    return () => clearInterval(moveInterval);
  }, [gameStarted, gameOver]);

  // Countdown timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    if (timeLeft === 0) {
      setGameOver(true);
      setGameStarted(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameOver]);

  const handleTargetClick = () => {
    if (!gameOver) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div className="game-area">
      {!gameStarted && !gameOver && (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      )}

      {gameStarted && (
        <>
          <div className="score">Score: {score}</div>
          <div className="timer">Time left: {timeLeft}s</div>
          <button
            className="target-button"
            style={{ top: position.top, left: position.left }}
            onClick={handleTargetClick}
          >
            🎯
          </button>
        </>
      )}

      {gameOver && (
        <>
          <h2>Game Over!</h2>
          <h3>Your score: {score}</h3>
          <button className="start-button" onClick={startGame}>
            Play Again
          </button>
        </>
      )}
    </div>
  );
}

export default App;
