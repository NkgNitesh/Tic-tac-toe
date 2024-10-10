// Select all cells and reset button
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');

// Initialize game state
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Create and display status message
const statusDisplay = document.createElement('div');
statusDisplay.classList.add('status');
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
document.body.insertBefore(statusDisplay, document.querySelector('.board'));

// Function to handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Ignore click if cell is already filled or game is inactive
    if (board[cellIndex] !== null || !gameActive) {
        return;
    }

    // Update the board state and UI
    board[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for a win
    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        highlightWinningCells();
        return;
    }

    // Check for a draw
    if (checkDraw()) {
        statusDisplay.textContent = `It's a draw!`;
        gameActive = false;
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check for a win
function checkWin() {
    return winConditions.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

// Function to check for a draw
function checkDraw() {
    return board.every(cell => cell !== null);
}

// Function to highlight winning cells
function highlightWinningCells() {
    winConditions.forEach(combination => {
        if (combination.every(index => board[index] === currentPlayer)) {
            combination.forEach(index => {
                cells[index].classList.add('winner');
            });
        }
    });
}

// Function to reset the game
function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
}

// Add event listeners to cells and reset button
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
