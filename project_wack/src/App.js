import React, { useState } from "react";
import moleImg from "./mole.png";
import "./App.css";

function App() {
  const [visible, setVisible] = useState(true);
  const [score, setScore] = useState(0);

  const toggleMole = () => setVisible((v) => !v);
  const handleMoleClick = () => setScore((s) => s + 1);

  // Create an array for multiple mole buttons
  const moleButtons = Array.from({ length: 6 });

  return (
    <div className="App-header">
      <h2>Score: {score}</h2>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {visible &&
          moleButtons.map((_, idx) => (
            <button
              key={idx}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
              onClick={handleMoleClick}
            >
              <img src={moleImg} alt="Mole" style={{ width: 100, height: 100 }} />
            </button>
          ))}
      </div>
      <br />
      <button onClick={toggleMole}>Show/Hide Moles</button>
    </div>
  );
}

export default App;