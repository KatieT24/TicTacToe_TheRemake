function playTicTacToe() {
  let currentPlayer = "X";
  // Array to hold all board moves
  let playedSquares = [];
  // tracks x
  let xMoves = [];
  // tracks o
  let oMoves = [];

  const winningMoves = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  function checkWinner(playerMoves) {
    return winningMoves.some(combination => 
      combination.every(index => playerMoves.includes(index))
    );
  }

//SECTION - New functiomns for modal

function showModal(message){
  document.getElementById('modalBody').innerText = message;
  $('.bd-example-modal-sm').modal('show');
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

      console.log("Played Squares?", playedSquares);
      console.log("Before if statement:", !playedSquares.includes(i));

      if (!playedSquares.includes(i)) {

        console.log("This is the currentPlayer", currentPlayer);
        console.log("Played Square i", i, currentPlayer);

        playedSquares.push(i);
        square.innerHTML = currentPlayer;

        if (currentPlayer === 'X') {
          xMoves.push(i);
          if (checkWinner(xMoves)) {
            setTimeout(() => showModal("Player X wins!"), 100); 
          }
        } else {
          oMoves.push(i);
          if (checkWinner(oMoves)){
            setTimeout(() => showModal("player O wins!"), 100); 
            
          }
        } 
        
        //check each turn for a winner
        console.log("Checking who winner is?", checkWinner);

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        console.log("This is now the currentPlayer", currentPlayer);

        if (playedSquares.length ===9){
          setTimeout(() => showModal("Its a draw!"), 100);
        }
      }
    });
  }
  
  let reset = document.getElementById("resetButton");
  reset.addEventListener('click', function() {
  resetGame();
   });
   
   //NOTE - had a helluva time trying to get the modal function to work,
   // but with a little bit of serching and figuring out why it wasn't woking,
   //ive decided to add on more function to this bottom to make sure this the modal will initialize.
document.addEventListener("DOMContentLoaded", function(){
  $('.bd-example-modal-sm').modal({
    backdrop: 'static',
    keyboard: false,
    show: false
  });
});
}

//NOTE - needed one more function to reset game
function resetGame() {
  playedSquares =[];
  xMoves = [];
  oMoves = [];
  currentPlayer = "X"

  for (let i = 1; i <= 9; i++){
    document.getElementById(i).innerHTML = "";
  } 
}
  //end of playTicTacToe function





playTicTacToe();

//display who won
//implement a reset button

// async function logMovies() {
  // const response = await fetch("http://localhost:3000/users");
  // const movies = await response.json();
  // console.log(movies);
// }

// logMovies();
