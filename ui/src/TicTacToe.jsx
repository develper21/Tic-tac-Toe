import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle from './Assets/circle.png';
import cross from './Assets/cross.png';

const TicTacToe = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || board[index] !== "") {
      return;
    }
    const newBoard = [...board];
    const currentSymbol = count % 2 === 0 ? "x" : "o";
    newBoard[index] = currentSymbol;
    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard, currentSymbol);
  };

  const checkWin = (board, currentSymbol) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === currentSymbol && board[b] === currentSymbol && board[c] === currentSymbol) {
        won(currentSymbol);
        return;
      }
    }

    if (!board.includes("")) {
      gameOver(); // Trigger game over if all cells are filled and no winner
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: <img src='${winner === "x" ? cross : circle}' alt='winner' />`;
    setTimeout(reset, 3000); // Automatically reset the game after 3 seconds
  };

  const gameOver = () => {
    setLock(true);
    titleRef.current.innerHTML = `Game Over! No Winner`;
    setTimeout(reset, 3000); // Automatically reset the game after 3 seconds
  };

  const reset = () => {
    setLock(false);
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    titleRef.current.innerHTML = 'Tic Tac Toe Game In <span>React</span>';
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game In
        <span>React</span>
      </h1>
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="boxes"
            onClick={() => toggle(index)}
          >
            {value === "x" && <img src={cross} alt="X" />}
            {value === "o" && <img src={circle} alt="O" />}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
