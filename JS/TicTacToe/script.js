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

  return { getBoard, placeMark, resetBoard };
}

// Players objects and game flow object

function createPlayer(name, mark) {
  return { name, mark };
}

function createGameController(playerOneName, playerTwoName) {
  const playerOne = createPlayer(playerOneName, "X");
  const playerTwo = createPlayer(playerTwoName, "O");

  const gameBoard = createGameboard();

  let currentPlayer = playerOne;

  function playRound(row, column) {
    mark = currentPlayer.mark;
    if (currentPlayer === playerOne) {
      if (gameBoard.placeMark(row, column, mark) === true) {
        currentPlayer = playerTwo;
        return true;
      } else {
        console.log("That cell is not available");
        return false;
      }
    } else {
      if (gameBoard.placeMark(row, column, mark) === true) {
        currentPlayer = playerOne;
        return true;
      } else {
        console.log("That cell is not available");
        return false;
      }
    }
  }

  function checkWinner() {
    let currentBoard = game.getBoard();
    let countX = 0;
    let countO = 0;

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (countX === 3) console.log(`${playerOne.name} is the winner`);
        else if (countO === 3) console.log(`${playerTwo.name} is the winner`);
        else {
          if (currentBoard[i][j].mark === "X") countX++;
          else if (currentBoard[i][j].mark === "O") countO++;
        }
      }
    }
  }

  return {
    playRound,
    getBoard: gameBoard.getBoard,
  };
}

const game = createGameController("Ismael", "Tania");

game.playRound(0, 0);
game.playRound(0, 0);
game.playRound(1, 1);
game.playRound(2, 1);
console.log(game.getBoard());
