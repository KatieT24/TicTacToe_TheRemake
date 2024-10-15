let currentPlayer = "X";
// Array to hold all board moves
let playedSquares = [];
// Tracks X
let xMoves = [];
// Tracks O
let oMoves = [];
// Defines the game over
let gameOver = false;

function playTicTacToe() {
  const winningMoves = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  // NOTE - adding the turn indicator function

  function checkWinner(playerMoves) {
    return winningMoves.some((combination) =>
      combination.every((index) => playerMoves.includes(index))
    );
  }

  // SECTION - New functions for modal
  function showModal(message) {
    console.log("showed Modal");
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
      backdrop: false,
    });

    document.getElementById("modalBody").innerText = message;
    myModal.show();

    document.querySelector(".btn-close").addEventListener("click", function () {
      myModal.hide();
      console.log("cleared backdrop");
    });

    document
      .getElementById("exampleModal")
      .addEventListener("hidden.bs.modal", function () {
        console.log("Need to clear backdrop.");
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        } else {
          console.log("no backdrop.");
        }
      });
  }

  //NOTE - Function to handle the player moves
  function handleMove(event) {
    const square = event.target;
    const squareId = parseInt(square.id); // Get the square's ID

    if (playedSquares.includes(squareId) || gameOver) return; // Prevent moves if the square has been played or game is over

    playedSquares.push(squareId); // Register the move
    square.innerHTML = currentPlayer; // Display X or O

    if (currentPlayer === "X") {
      xMoves.push(squareId);
      if (checkWinner(xMoves)) {
        gameOver = true;
        setTimeout(() => showModal("Player X wins!"), 100);
        return;
      }
    } else {
      oMoves.push(squareId);
      if (checkWinner(oMoves)) {
        gameOver = true;
        setTimeout(() => showModal("Player O wins!"), 100);
        return;
      }
    }

    // Check for draw
    if (playedSquares.length === 9) {
      gameOver = true;
      setTimeout(() => showModal("It's a draw!"), 100);
      return;
    }

    // Swap current player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnIndicator();
  }

  //NOTE - Attach click event listeners to each square
  document.querySelectorAll(".tile").forEach((square) => {
    square.innerHTML = ""; // Clear the square
    square.removeEventListener("click", handleMove); // Clear old event listeners
    square.addEventListener("click", handleMove); // Add new event listener
  });
}

// Function to reset the game and clear the board
function resetGame() {
  console.log("reset Triggered");

  playedSquares = [];
  xMoves = [];
  oMoves = [];
  currentPlayer = "X";
  gameOver = false; // resetting game over

  // Clear the game board
  for (let i = 1; i <= 9; i++) {
    document.getElementById(i).innerHTML = "";
  }

  playTicTacToe(); // Reinitialize the game
  updateTurnIndicator(); // Update the turn indicator
}

// NOTE - adding header function to show whose turn it is
function updateTurnIndicator() {
  document.getElementById(
    "turn-indicator"
  ).textContent = `${currentPlayer}'s Turn`;
}

// Attach event listener to the reset button
document.getElementById("resetButton").addEventListener("click", resetGame);

// Initialize the game with the turn indicator
playTicTacToe();
updateTurnIndicator();

// NOTE - making sure to add on an event listener
// NOTE - for resetting the game to start off with X.
