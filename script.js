const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");
const drawScoreText = document.getElementById("drawScore");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", cellClicked));

function cellClicked() {
  const index = this.getAttribute("data-index");

  if (board[index] !== "" || !running) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;

      // highlight winning cells
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    running = false;

    if (currentPlayer === "X") {
      xScore++;
      xScoreText.textContent = xScore;
    } else {
      oScore++;
      oScoreText.textContent = oScore;
    }

    setTimeout(() => {
      alert(`Player ${currentPlayer} Wins! 🎉`);
    }, 200);

    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "Draw!";
    drawScore++;
    drawScoreText.textContent = drawScore;
    running = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.textContent = "Player X's Turn";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
}

function resetScore() {
  xScore = 0;
  oScore = 0;
  drawScore = 0;

  xScoreText.textContent = "0";
  oScoreText.textContent = "0";
  drawScoreText.textContent = "0";
}