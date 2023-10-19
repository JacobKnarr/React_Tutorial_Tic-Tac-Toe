import { useState } from "react";

export default function Game() {
  const [moves, setMoves] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
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

  function toggleSortOrder() {
    setIsAscending(!isAscending);
    moves.reverse();
  }

  const movesList = moves.map((_moves, move) => {
    const index = isAscending ? move : moves.length - 1 - move;
    const description =
      index === 0 ? "Go to game start" : "Go to move: " + index;

    return (
      <li key={index}>
        {index !== currentMove ? (
          <button onClick={() => setMove(index)}>{description}</button>
        ) : (
          "You are at move: " + index
        )}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} move={move} onMove={handleMove} />
      </div>
      <div className="game-info">
        <button onClick={toggleSortOrder}>
          Toggle Sorting Order: {isAscending ? "Ascending" : "Descending"}
        </button>
        <ul>{movesList}</ul>
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

  const board = [];
  for (let row = 0; row < 3; row++) {
    const rowSquares = [];
    for (let col = 0; col < 3; col++) {
      const index = 3 * row + col;
      rowSquares.push(
        <Square
          key={index}
          value={move[index]}
          onSquareClick={() => handleClick(index)}
        />,
      );
    }
    board.push(
      <div key={row} className="board-row">
        {rowSquares}
      </div>,
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
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
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (move[a] && move[a] === move[b] && move[a] === move[c]) {
      return move[a];
    }
  }

  return null;
}
