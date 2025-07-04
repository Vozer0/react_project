import React, { useState, useEffect } from "react";
import moleImg from "./mole.png";
import "./App.css";

function App() {
  const moleCount = 6;
  const [score, setScore] = useState(0);
  const [activeMoles, setActiveMoles] = useState([]);
  const [molePositions, setMolePositions] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds
  const [gameOver, setGameOver] = useState(false);

  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      setActiveMoles([]);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [gameStarted, timeLeft, gameOver]);

  // Mole logic
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const interval = setInterval(() => {
      const visibleMoleCount = Math.floor(Math.random() * moleCount) + 1;
      const indices = [];
      while (indices.length < visibleMoleCount) {
        const idx = Math.floor(Math.random() * moleCount);
        if (!indices.includes(idx)) {
          indices.push(idx);
        }
      }
      const newPositions = {};
      indices.forEach(idx => {
        newPositions[idx] = {
          top: Math.random() * 80 + 10,
          left: Math.random() * 80 + 10,
        };
      });
      setActiveMoles(indices);
      setMolePositions(newPositions);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  const handleMoleClick = (idx) => {
    if (activeMoles.includes(idx)) {
      setScore((s) => s + 1);
      setActiveMoles((moles) => moles.filter((m) => m !== idx));
    }
  };

  const handleStart = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setGameStarted(true);
  };

  if (!gameStarted) {
    // COVER PAGE
    return (
      <div className="App-header" style={{ justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <h1>WACK-A-MOLE!</h1>
        <button
          style={{
            fontSize: "2rem",
            padding: "1rem 2rem",
            marginTop: "2rem",
            cursor: "pointer",
            borderRadius: "10px",
            border: "none",
            background: "#61dafb",
            color: "#222",
            fontWeight: "bold"
          }}
          onClick={handleStart}
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameOver) {
    // GAME OVER PAGE
    return (
      <div className="App-header" style={{ justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <h1>Time's Up!</h1>
        <h2>Your Score: {score}</h2>
        <button
          style={{
            fontSize: "2rem",
            padding: "1rem 2rem",
            marginTop: "2rem",
            cursor: "pointer",
            borderRadius: "10px",
            border: "none",
            background: "#61dafb",
            color: "#222",
            fontWeight: "bold"
          }}
          onClick={handleStart}
        >
          Play Again
        </button>
      </div>
    );
  }

  // GAME PAGE
  return (
    <div className="App-header" style={{ position: "relative", minHeight: "100vh" }}>
      <div className="score-top-right">Score: {score}</div>
      <div style={{
        position: "absolute",
        top: 20,
        left: 40,
        fontSize: "2rem",
        fontWeight: "bold",
        color: "white",
        zIndex: 10
      }}>
        Time: {timeLeft}
      </div>
      {Array.from({ length: moleCount }).map((_, idx) => (
        <button
          key={idx}
          style={{
            position: "absolute",
            top: `${molePositions[idx]?.top || 50}%`,
            left: `${molePositions[idx]?.left || 50}%`,
            transform: "translate(-50%, -50%)",
            background: "none",
            border: "none",
            padding: 0,
            cursor: activeMoles.includes(idx) ? "pointer" : "default",
            visibility: activeMoles.includes(idx) ? "visible" : "hidden",
          }}
          onClick={() => handleMoleClick(idx)}
          disabled={!activeMoles.includes(idx)}
        >
          <img src={moleImg} alt="Mole" style={{ width: 100, height: 100 }} />
        </button>
      ))}
    </div>
  );
}

export default App;