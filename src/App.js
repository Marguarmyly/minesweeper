import "./assets/styles/App.css";
import shuffleArray from "./helpers/shuffle";
import boardSize from "./helpers/boardsize";
import numMinesOnLevel from "./helpers/mines";
import { React, useState } from "react";
import { GamePanel, ControlPanel, Header, Footer } from "./components";
import shuffleArray from "../../helpers/mines";
import boardSize from "../../helpers/boardsize";
import numMinesOnLevel from "../../helpers/shuffle";


function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [mineCount, setMineCount] = useState(0);
  const [grid, setGrid] = useState([]);

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
    handleGrid(selectedLevel);
    setMineCount(numMinesOnLevel(selectedLevel));
  };

  const handleGameOver = () => {
    setGameStarted(false);
  };

  const handleLevelChange = (ele) => {
    let value = ele.currentTarget.value;
    setSelectedLevel(value);
    handleGrid(value);
    setMineCount(numMinesOnLevel(value));
  };

  const handleMineCount = (isToRemoveMine) =>
    setMineCount((previousValue) =>
      isToRemoveMine ? previousValue - 1 : previousValue + 1
    );

  const handleGrid = (level) => {
    const newGrid = [];
    let maxMinas = numMinesOnLevel(level);
    let [width, height] = boardSize(level);

    for (let i = 0, currentMinas = 0; i < height * width; i++, currentMinas++)
      newGrid.push(new BoardCell(currentMinas <= maxMinas));

    setGrid(shuffleArray(newGrid));
  };

  return (
    <div id="container">
      <Header />
      <ControlPanel
        gameStarted={gameStarted}
        onGameStart={handleGameStart}
        selectedLevel={selectedLevel}
        onSelectedLevel={handleLevelChange}
      />
      <GamePanel
        selectedLevel={selectedLevel}
        gameStarted={gameStarted}
        grid={grid}
        onGameOver={handleGameOver}
        mineCount={mineCount}
        onMineCount={handleMineCount}
      />
      <Footer />
    </div>
  );
}

class BoardCell {
  constructor(mined) {
    this.isMined = mined;
    this.isFlagged = false;
  }
}

export default App;
