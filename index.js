function playTicTacToe() {
  let currentPlayer = "X";
  // Array to hold all board moves
  let playedSquares = [];
  // tracks x
  let xMoves = [];
  // tracks o
  let oMoves = [];
  //defines the game over
  let gameOver = false;

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

  //NOTE - adding the turn indicator function
  

  function checkWinner(playerMoves) {
    return winningMoves.some((combination) =>
      combination.every((index) => playerMoves.includes(index))
    );
  }

  //SECTION - New functiomns for modal

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

  //adds click events to each square
  for (let i = 1; i <= 9; i++) {
    console.log(
      `
  What is i?`,
      i
    );

    let square = document.getElementById(i);
    console.log("This is my square:", square);

    square.addEventListener("click", function () {
      if (gameOver) return;

      console.log("Played Squares?", playedSquares);
      console.log("Before if statement:", !playedSquares.includes(i));

      if (!playedSquares.includes(i)) {
        console.log("This is the currentPlayer", currentPlayer);
        console.log("Played Square i", i, currentPlayer);

        playedSquares.push(i);
        square.innerHTML = currentPlayer;

        if (currentPlayer === "X") {
          xMoves.push(i);
          if (checkWinner(xMoves)) {
            gameOver = true;
            setTimeout(() => showModal("Player X wins!"), 100);
          }
        } else {
          oMoves.push(i);
          if (checkWinner(oMoves)) {
            gameOver = true;
            setTimeout(() => showModal("player O wins!"), 100);
          }
        }

        //check each turn for a winner
        console.log("Checking who winner is?", checkWinner);

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        console.log("This is now the currentPlayer", currentPlayer);

        if (playedSquares.length === 9) {
          gameOver = true;
          setTimeout(() => showModal("Its a draw!"), 100);
        }
      }
    });
  }

  let reset = document.getElementById("resetButton");
  reset.addEventListener("click", function () {
    resetGame();
  });

  //NOTE - had a helluva time trying to get the modal function to work,
  // but with a little bit of serching and figuring out why it wasn't woking,
  //ive decided to add on more function to this bottom to make sure this the modal will initialize.
  // document.addEventListener("DOMContentLoaded", function(){
}

//NOTE - needed one more function to reset game
function resetGame() {
  console.log("reset Triggered");
  playedSquares = [];
  xMoves = [];
  oMoves = [];
  currentPlayer = "X";
  gameOver = false; //resetting game over

  for (let i = 1; i <= 9; i++) {
    document.getElementById(i).innerHTML = "";
  }
  playTicTacToe();
}
//end of playTicTacToe function
//NOTE - adding header fucntion to show whose turn it is

let currentPlayer = "X";
  function updateTurnIndicator() {
    document.getElementById(
      "turn-indicator"
    ).textContent = `${currentPlayer}'s Turn`;
  }

  function handleClick(event) {
    const tile = event.tatget;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnIndicator();
  }

  function resetGame(){
    currentPlayer = 'X';
    updateTurnIndicator();

    document.querySelectorAll('.tile').forEach(tile => {
      tile.textContent = '';
    });

  }

  document.querySelectorAll('.tile').forEach((tile) => {
    tile.addEventListener('click', handleClick);
  });
  //NOTE - making sure to add on an event listener  
  //NOTE - for resetting the game to start off with X.
  document.getElementById('resetButton').addEventListener('click', resetGame);
  updateTurnIndicator();

playTicTacToe();

//display who won
//implement a reset button

// async function logMovies() {
// const response = await fetch("http://localhost:3000/users");
// const movies = await response.json();
// console.log(movies);
// }

// logMovies();
