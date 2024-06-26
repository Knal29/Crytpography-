let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerXTimerElement = document.querySelector("#player-x-timer");
let playerOTimerElement = document.querySelector("#player-o-timer");
let startGameBtn = document.querySelector("#start-game-btn");
let playerXTimer = 60;
let playerOTimer = 60;
let timerInterval;
let turnO = true; 
let count = 0; 

startGameBtn.style.display = "block";
resetBtn.style.display = "none";

//winning pattern
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//reset game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  playerXTimer = 60;
  playerOTimer = 60;
  playerXTimerElement.innerText = `Player X: 60 seconds`;
  playerOTimerElement.innerText = `Player O: 60 seconds`;
  clearInterval(timerInterval);
  
};

//for strting timer(Timed move_bonus)
const startTimer = () => {
    timerInterval = setInterval(() => {
      if (turnO) {
        playerOTimer--;
        playerOTimerElement.innerText = `Player O: ${playerOTimer} seconds`;
      } else {
        playerXTimer--;
        playerXTimerElement.innerText = `Player X: ${playerXTimer} seconds`;
      }

      if (playerXTimer === 0) {
        // If Player X's timer reaches 0, Player O wins
        disableBoxes();
        msgContainer.classList.remove("hide");
        msg.innerText = "Player O wins!";
        clearInterval(timerInterval);
      } else if (playerOTimer === 0) {
        // If Player O's timer reaches 0, Player X wins
        disableBoxes();
        msgContainer.classList.remove("hide");
        msg.innerText = "Player X wins!";
        clearInterval(timerInterval);
      }
    }, 1000);
  };


const turnElement = document.querySelector("#turn"); //for changing turn 
  

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    
    if (turnO) {
      
      box.innerText = "O";
      turnElement.innerText = "Current turn: Player X";
    } else {
      
      box.innerText = "X";
      turnElement.innerText = "Current turn: Player O";
    }
    
    turnO = !turnO; 
    
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    
    if (count === 9 && !isWinner) {
      gameDraw();
    }
    
  });
});

//game draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

//for disabling box after clicking one tym
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

//for winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};



newGameBtn.addEventListener("click", () => {
  resetGame();
  startGameBtn.style.display = "block";
  resetBtn.style.display = "none";
  msgContainer.classList.add("hide"); 
});
resetBtn.addEventListener("click", () => {
  resetGame();
  startGameBtn.style.display = "block";
  resetBtn.style.display = "none";
});
startGameBtn.addEventListener("click", () => {
  startTimer();
  startGameBtn.style.display = "none";
  resetBtn.style.display = "block";
});