import { useState } from "react";

export default function Game() {
  const [moves, setMoves] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const move = moves[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handleMove(nextMove) {
    const nextMoves = [...moves.slice(0, currentMove + 1), nextMove];
    setMoves(nextMoves);
    setCurrentMove(nextMoves.length - 1);
  }

  function setMove(nextMove) {
    setCurrentMove(nextMove);
  }

  const movesList = moves.map((moves, move) => {
    let description = move === 0 ? "Go to game start" : "Go to move " + move;

    return (
      <li key={move}>
        <button onClick={() => setMove(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} move={move} onMove={handleMove} />
      </div>
      <div className="game-info">
        <ol>{movesList}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, move, onMove }) {
  const winner = calculateWinner(move);
  let status = winner
    ? "Winner: " + winner
    : "Next Player: " + (xIsNext ? "X" : "O");

  function handleClick(i) {
    if (calculateWinner(move) || move[i]) return;

    const nextMove = move.slice();
    nextMove[i] = xIsNext ? "X" : "O";
    onMove(nextMove);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={move[0]} onSquareClick={() => handleClick(0)} />
        <Square value={move[1]} onSquareClick={() => handleClick(1)} />
        <Square value={move[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={move[3]} onSquareClick={() => handleClick(3)} />
        <Square value={move[4]} onSquareClick={() => handleClick(4)} />
        <Square value={move[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={move[6]} onSquareClick={() => handleClick(6)} />
        <Square value={move[7]} onSquareClick={() => handleClick(7)} />
        <Square value={move[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(move) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (move[a] && move[a] === move[b] && move[a] === move[c]) {
      return move[a];
    }
  }

  return null;
}
