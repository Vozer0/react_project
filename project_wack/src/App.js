import React, { useState, useEffect } from "react";
import moleImg from "./mole.png";
import "./App.css";

function App() {
  const moleCount = 6;
  const [score, setScore] = useState(0);
  const [activeMoles, setActiveMoles] = useState([]);

  // Number of moles to show at once
  const visibleMoleCount = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      // Pick unique random indices for visible moles
      const indices = [];
      while (indices.length < visibleMoleCount) {
        const idx = Math.floor(Math.random() * moleCount);
        if (!indices.includes(idx)) {
          indices.push(idx);
        }
      }
      setActiveMoles(indices);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMoleClick = (idx) => {
    if (activeMoles.includes(idx)) {
      setScore((s) => s + 1);
      // Remove the clicked mole from active moles
      setActiveMoles((moles) => moles.filter((m) => m !== idx));
    }
  };

  return (
    <div className="App-header">
      <h2>Score: {score}</h2>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {Array.from({ length: moleCount }).map((_, idx) => (
          <button
            key={idx}
            style={{
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
    </div>
  );
}

export default App;