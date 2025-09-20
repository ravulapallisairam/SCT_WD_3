const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const modeBtn = document.getElementById("modeBtn");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;
let vsComputer = false;

// Create board cells
function createBoard() {
  boardEl.innerHTML = "";
  board = Array(9).fill(null);
  gameOver = false;
  currentPlayer = "X";
  statusEl.textContent = "Player X's Turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => handleMove(i));
    boardEl.appendChild(cell);
  }
}

// Handle a move
function handleMove(index) {
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  document.querySelector(`[data-index='${index}']`).textContent = currentPlayer;
  document.querySelector(`[data-index='${index}']`).classList.add("taken");

  if (checkWinner()) {
    statusEl.textContent = `Player ${currentPlayer} Wins!`;
    gameOver = true;
    return;
  }

  if (!board.includes(null)) {
    statusEl.textContent = "It's a Draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer}'s Turn`;

  if (vsComputer && currentPlayer === "O") {
    setTimeout(computerMove, 500); // Small delay for realism
  }
}

// Computer AI move
function computerMove() {
  if (gameOver) return;
  const available = board.map((val, i) => val ? null : i).filter(v => v !== null);
  const move = available[Math.floor(Math.random() * available.length)];
  handleMove(move);
}

// Check for winner
function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Event Listeners
resetBtn.addEventListener("click", createBoard);
modeBtn.addEventListener("click", () => {
  vsComputer = !vsComputer;
  modeBtn.textContent = vsComputer ? "Mode: Vs Computer" : "Mode: 2 Players";
  createBoard();
});

// Init game
createBoard();
