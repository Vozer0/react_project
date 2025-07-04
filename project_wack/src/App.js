import React, { useState, useEffect } from "react";
import moleImg from "./mole.png";
import "./App.css";

function App() {
  const moleCount = 6;
  const [score, setScore] = useState(0);
  const [activeMoles, setActiveMoles] = useState([]);
  const [molePositions, setMolePositions] = useState({});
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      // Pick a random number of moles to show (1 to moleCount)
      const visibleMoleCount = Math.floor(Math.random() * moleCount) + 1;
      const indices = [];
      while (indices.length < visibleMoleCount) {
        const idx = Math.floor(Math.random() * moleCount);
        if (!indices.includes(idx)) {
          indices.push(idx);
        }
      }
      // Assign random positions for each active mole
      const newPositions = {};
      indices.forEach(idx => {
        newPositions[idx] = {
          top: Math.random() * 80 + 10,   // 10% to 90% vertically
          left: Math.random() * 80 + 10,  // 10% to 90% horizontally
        };
      });
      setActiveMoles(indices);
      setMolePositions(newPositions);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted]);

  const handleMoleClick = (idx) => {
    if (activeMoles.includes(idx)) {
      setScore((s) => s + 1);
      setActiveMoles((moles) => moles.filter((m) => m !== idx));
    }
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
          onClick={() => setGameStarted(true)}
        >
          Start Game
        </button>
      </div>
    );
  }

  // GAME PAGE
  return (
    <div className="App-header" style={{ position: "relative", minHeight: "100vh" }}>
      <div className="score-top-right">Score: {score}</div>
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