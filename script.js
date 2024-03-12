function startGame() {
  window.location.href = 'game.html'; // Redirect to the Tic-Tac-Toe game page
}

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let winner = false;

const statusElement = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');

board.addEventListener('click', handleCellClick);

function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (gameBoard[index] === '' && gameActive && !winner) {
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWinner()) {
      winner = true;
      statusElement.textContent = `Player ${currentPlayer} wins!`;
    } else if (checkTie()) {
      statusElement.textContent = "It's a tie!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkTie() {
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === '') {
      return false;
    }
  }
  gameActive = false;
  return true;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinningCells(combination);
            return true;
        }
    }
    return false;
}

function highlightWinningCells(combination) {
    for (const index of combination) {
        cells[index].style.background = '#9effa7';
    }
}
