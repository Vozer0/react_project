import React, { useState, useEffect } from "react";
import moleImg from "./mole.png";
import goldenMoleImg from "./golden_mole.png";
import matthewLeeImg from "./MatthewLee.jpg";
import brianTanImg from "./BRIAN-TAN.jpg";
import jasonWanImg from "./Jason_Wan.jpg";
import jerardAgravanteImg from "./JerardAgravante.jpg";
import kevinBrownImg from "./Kevin-Brown.jpg";
import andrewLemusImg from "./Andrew-Lemus.jpg";
import "./App.css";
import missSoundFile from "./near-miss-swing-whoosh-2-233427.mp3";
import hitSoundFile from "./bonk-sound-effect-36055.mp3";

const missSound = new Audio(missSoundFile)
const hitSound = new Audio(hitSoundFile);
const playClickSound = () => {
  hitSound.currentTime = 0; // rewind if still playing
  hitSound.play();
};

// Title function for milestones (do not modify)
function getTitle(score) {
  if (score >= 40) return "The Verminator";
  if (score >= 30) return "Best exterminator in town";
  if (score >= 20) return "You've got a fridge \"magnet\"";
  if (score >= 50) return "EXTERMINATE!";
  if (score >= 0) return "Tree Hugger!";
  return "";
}

// Milestone array for display (all 5 titles)
const milestones = [
  { score: 0, title: "Tree Hugger!" },
  { score: 20, title: "You've got a fridge \"magnet\"" },
  { score: 30, title: "Best exterminator in town" },
  { score: 40, title: "The Verminator" },
  { score: 50, title: "EXTERMINATE!" }
];

// Bad images array
const badImages = [
  { src: matthewLeeImg, alt: "Matthew Lee" },
  { src: brianTanImg, alt: "Brian Tan" },
  { src: jasonWanImg, alt: "Jason Wan" },
  { src: jerardAgravanteImg, alt: "Jerard Agravante" },
  { src: kevinBrownImg, alt: "Kevin Brown" },
  { src: andrewLemusImg, alt: "Andrew Lemus" }
];
const badMoleCount = badImages.length;

function App() {
  const moleCount = 6;
  const [score, setScore] = useState(0);
  const [activeMoles, setActiveMoles] = useState([]);
  const [molePositions, setMolePositions] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds
  const [gameOver, setGameOver] = useState(false);
  const [commentary, setCommentary] = useState("");
  const [commentaryColor, setCommentaryColor] = useState("yellow");
  const [commentaryPos, setCommentaryPos] = useState({ top: 0, left: 0, visible: false });



  // Golden mole state
  const [goldenMoleVisible, setGoldenMoleVisible] = useState(false);
  const [goldenMoleHit, setGoldenMoleHit] = useState(false);
  const [goldenMolePosition, setGoldenMolePosition] = useState({ top: 50, left: 50 });

  // Bad items state
  const [badItems, setBadItems] = useState([]); // array of {top, left, imgIdx, id}

  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      setActiveMoles([]);
      setGoldenMoleVisible(false);
      setBadItems([]);
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

  // Bad items logic
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const interval = setInterval(() => {
      const visibleBadCount = Math.floor(Math.random() * badMoleCount) + 1;
      const usedIndices = [];
      const badArr = [];
      for (let i = 0; i < visibleBadCount; i++) {
        let imgIdx;
        do {
          imgIdx = Math.floor(Math.random() * badMoleCount);
        } while (usedIndices.includes(imgIdx));
        usedIndices.push(imgIdx);
        badArr.push({
          id: i + "-" + Date.now(),
          imgIdx,
          top: Math.random() * 80 + 10,
          left: Math.random() * 80 + 10,
        });
      }
      setBadItems(badArr);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Golden mole logic: appears once per game, for 2 seconds, at a random interval
  useEffect(() => {
    if (!gameStarted || goldenMoleHit) return;
    const appearTime = Math.random() * 15000 + 5000;
    let appearTimer, disappearTimer;

    appearTimer = setTimeout(() => {
      setGoldenMoleVisible(true);
      setGoldenMolePosition({
        top: Math.random() * 80 + 10,
        left: Math.random() * 80 + 10,
      });
      // Golden mole disappears after 2 seconds if not hit
      disappearTimer = setTimeout(() => {
        setGoldenMoleVisible(false);
      }, 2000);
    }, appearTime);

    return () => {
      clearTimeout(appearTimer);
      clearTimeout(disappearTimer);
    };
  }, [gameStarted, goldenMoleHit]);

  const handleMoleClick = (idx) => {
    playClickSound();
    if (activeMoles.includes(idx)) {
      setScore((s) => s + 1);
      setActiveMoles((moles) => moles.filter((m) => m !== idx));

      const hitMessages = [
        "Nice hit!",
        "Whacked it!",
        "Boom!", 
        "Gotcha!",
        "Mole down!",
        "Direct hit!"
      ];
      const randomMessage = hitMessages[Math.floor(Math.random() * hitMessages.length)];

      setCommentary(randomMessage);
      setCommentaryColor("yellow");  
      setTimeout(() => setCommentary(""), 1000);
    }
  };

  const handleGoldenMoleClick = () => {
    playClickSound();
    setScore((s) => s + 10);
    setGoldenMoleVisible(false);
    setGoldenMoleHit(true);
  };

  const handleBadItemClick = (id, event) => {
    playClickSound();
    setScore((s) => Math.max(0, s - 2));
    setBadItems((items) => items.filter((item) => item.id !== id));

    const rect = event.currentTarget.parentNode.getBoundingClientRect();
    const top = event.clientY - rect.top;
    const left = event.clientX - rect.left;

    setCommentary("Oops! Wrong target!");
    setCommentaryColor("red");  // 👈 make it red
    setCommentaryPos({ top, left, visible: true });

    setTimeout(() => {
      setCommentary("");
      setCommentaryPos((pos) => ({ ...pos, visible: false }));
    }, 1000);

  };

  const handleStart = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setGameStarted(true);
    setGoldenMoleVisible(false);
    setGoldenMoleHit(false);
    setBadItems([]);
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
        <div style={{ marginTop: "2rem" }}>
          <h3>Milestone Titles:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {milestones.map(m => (
              <li key={m.score} style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>
                {score >= m.score ? m.title : "???"}
              </li>
            ))}
          </ul>
        </div>
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
  const handleMissClick = (e) => {
    const isMole = e.target.tagName === "IMG" && e.target.alt === "Mole";
    const isGolden = e.target.tagName === "IMG" && e.target.alt === "Golden Mole";
    const isBad = badImages.some(img => img.alt === e.target.alt);
  
    if (!isMole && !isGolden && !isBad) {
      missSound.play();
    }
  };
  
  return (
    <div className="App-header" onClick = {handleMissClick} style={{ position: "relative", minHeight: "100vh" }}>
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
      <h2 style={{ 
        position: "absolute", 
        top: commentaryPos.top, 
        left: commentaryPos.left, 
        transform: "translateX(-50%)", 
        color: commentaryColor,
        fontSize: "1.5rem", fontWeight: "bold",
        pointerEvents: "none",
        userSelect: "none",
        transform: "translate(-50%, -100%)",
        textShadow: "1px 1px 3px black",
        zIndex: 1000,
      }}>
        {commentary}
      </h2>
      
        Time: {timeLeft}
      </div>
      {/* Golden Mole */}
      {goldenMoleVisible && !goldenMoleHit && (
        <button
          style={{
            position: "absolute",
            top: `${goldenMolePosition.top}%`,
            left: `${goldenMolePosition.left}%`,
            transform: "translate(-50%, -50%)",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            zIndex: 20,
          }}
          onClick={handleGoldenMoleClick}
        >
          <img src={goldenMoleImg} alt="Golden Mole" style={{ width: 100, height: 100 }} />
        </button>
      )}
      {/* Bad Images */}
      {badItems.map((item) => (
        <button
          key={item.id}
          style={{
            position: "absolute",
            top: `${item.top}%`,
            left: `${item.left}%`,
            transform: "translate(-50%, -50%)",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            zIndex: 15,
          }}
          onClick={(event) => handleBadItemClick(item.id, event)}
        >
          <img src={badImages[item.imgIdx].src} alt={badImages[item.imgIdx].alt} style={{ width: 100, height: 100 }} />
        </button>
      ))}
      {/* Regular Moles */}
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