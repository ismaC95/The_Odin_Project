function createGameboard() {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => console.log(board);

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

  return { getBoard, placeMark, resetBoard, checkWinner, checkTie };
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
        console.log(`Congrats, ${player.name} has won`);
        isThereWinner = true;
      } else if (gameBoard.checkTie()) {
        console.log("It's a TIE! Let's play again!");
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

  return {
    playRound,
    getBoard: gameBoard.getBoard,
  };
}

const game = createGameController("Ismael", "Tania");

//Missing what happens once a player wins
game.playRound(0, 0);
game.playRound(0, 1);
game.playRound(0, 2);
game.playRound(1, 1);
game.playRound(1, 0);
game.playRound(1, 2);
game.playRound(2, 1);
game.playRound(2, 0);
game.playRound(2, 2);
