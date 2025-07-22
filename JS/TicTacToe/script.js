// DOM consts
const cells = document.querySelectorAll(".cell-action");
const restartBtn = document.getElementById("restartBtn");
const gameAlert = document.getElementById("alert");
const playerForm = document.getElementById("playerForm");
const playerOneName = document.getElementById("player1").value;
const playerTwoName = document.getElementById("player2").value;
const playerAlert = document.getElementById("namesAlert");

let game = null;

//functionality
function createGameboard() {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  const placeMark = (row, col, mark) => {
    if (board[row][col] === "") {
      board[row][col] = mark;
      return true;
    } else return false;
  };

  const resetBoard = () => {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        board[r][c] = "";
      }
    }
  };

  function checkWinner(row, col) {
    function checkRow(row) {
      return board[row][0] === board[row][1] && board[row][0] === board[row][2];
    }

    function checkCol(col) {
      return board[0][col] === board[1][col] && board[0][col] === board[2][col];
    }

    function checkDiagonal() {
      if (board[1][1] !== "") {
        return (
          (board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
          (board[0][2] === board[1][1] && board[0][2] === board[2][0])
        );
      } else return false;
    }

    return checkRow(row) || checkCol(col) || checkDiagonal();
  }

  function checkTie() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === "") return false;
      }
    }
    return true;
  }

  return { board, getBoard, placeMark, resetBoard, checkWinner, checkTie };
}

// Players objects and game flow object

function createPlayer(name, mark) {
  return { name, mark };
}

function createGameController(playerOneName, playerTwoName) {
  const players = [
    createPlayer(playerOneName, "X"),
    createPlayer(playerTwoName, "O"),
  ];
  const gameBoard = createGameboard();

  let turnIndex = 0;
  let isThereWinner = false;
  let isTie = false;

  function playRound(row, col) {
    const player = players[turnIndex % players.length];

    if (isThereWinner) {
      console.log(`You can't do another move, ${player.name} is the winner`);

      return false;
    }

    if (isTie) {
      console.log("It's a TIE! Let's play again!");
      return false;
    }

    if (gameBoard.placeMark(row, col, player.mark)) {
      if (gameBoard.checkWinner(row, col)) {
        const winnerAlert = document.createTextNode(
          `Congrats, ${player.name} has won!`
        );
        gameAlert.appendChild(winnerAlert);
        isThereWinner = true;
      } else if (gameBoard.checkTie()) {
        const tieAlert = document.createTextNode(
          "It's a TIE! Let's play again!"
        );
        gameAlert.appendChild(tieAlert);

        isTie = true;
      } else {
        turnIndex++;
      }

      return true;
    } else {
      console.log("That cell is not available");
      return false;
    }
  }

  function resetGame() {
    gameBoard.resetBoard(); // resets the board array
    isThereWinner = false;
    isTie = false;
    turnIndex = 0;
    gameAlert.textContent = "";
  }

  return {
    playRound,
    getBoard: gameBoard.getBoard,
    resetGame,
  };
}

//DOM control

function displayController() {
  playerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page reload

    const playerOneName = document.getElementById("player1").value.trim();
    const playerTwoName = document.getElementById("player2").value.trim();

    // Clear previous alerts
    playerAlert.textContent = "";
    gameAlert.textContent = "";

    if (playerOneName.length < 3 || playerTwoName.length < 3) {
      playerAlert.textContent =
        "Please enter at least 3 characters for each player.";
      return;
    }

    game = createGameController(playerOneName, playerTwoName);

    playerAlert.textContent = `Player One: ${playerOneName}, Player Two: ${playerTwoName}`;

    renderBoard(game.getBoard());
  });

  //take the array position and make it the attribute
  cells.forEach((cell, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    cell.setAttribute("data-row", row);
    cell.setAttribute("data-col", col);
  });

  function renderBoard(board) {
    cells.forEach((cell, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      cell.textContent = board[row][col];
    });
  }

  //translate the board to the divs in the web on each click using placemark
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!game) {
        playerAlert.textContent = "Please enter player names to start!";
        return;
      }

      const cellRow = parseInt(cell.getAttribute("data-row"));
      const cellCol = parseInt(cell.getAttribute("data-col"));
      console.log(`row is: ${cellRow}, col is: ${cellCol}`);

      //Game functionality
      if (game.playRound(cellRow, cellCol)) renderBoard(game.getBoard());
    });
  });

  //restart game
  restartBtn.addEventListener("click", () => {
    if (game) {
      game.resetGame();
      renderBoard(game.getBoard());
      gameAlert.textContent = "";
    }
    playerAlert.textContent = "";
  });
}

displayController();
