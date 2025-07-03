
import React, { useState } from "react";
import moleImg from "./mole.png"; // Ensure you have a mole image in the src directory
import "./App.css"; // Import the CSS file

function App() {
  const [visible, setVisible] = useState(true);

  // Toggle visibility for demonstration (you can change this logic later)
  const toggleMole = () => setVisible((v) => !v);

  return (
    <div className="App-header">
      {visible && (
        <button
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img src={moleImg} alt="Mole" style={{ width: 100, height: 100 }} />
        </button>
      )}
      <br />
      <button onClick={toggleMole}>Show/Hide Mole</button>
    </div>
  );
}

export default App;