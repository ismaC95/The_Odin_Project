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

  return { getBoard, placeMark, resetBoard, checkWinner };
}

// Players objects and game flow object

function createPlayer(name, mark) {
  return { name, mark };
}

function createGameController(playerOneName, playerTwoName) {
  // const playerOne = createPlayer(playerOneName, "X");
  // const playerTwo = createPlayer(playerTwoName, "O");

  const players = [
    createPlayer(playerOneName, "X"),
    createPlayer(playerTwoName, "O"),
  ];
  const gameBoard = createGameboard();

  let turnIndex = 0;

  function playRound(row, col) {
    const player = players[turnIndex % players.length];

    if (gameBoard.placeMark(row, col, player.mark)) {
      if (gameBoard.checkWinner(row, col))
        console.log(`Congrats, ${player.name} has won`);
      turnIndex++;

      return true;
    } else {
      console.log("That cell is not available");
      return false;
    }
  }
  // function playRound(row, col) {
  //   mark = currentPlayer.mark;
  //   if (currentPlayer === playerOne) {
  //     if (gameBoard.placeMark(row, col, mark)) {
  //       if (gameBoard.checkWinner(row, col))
  //         console.log(`Congrats, ${currentPlayer.name} has won`);

  //       currentPlayer = playerTwo;
  //       return true;
  //     } else {
  //       console.log("That cell is not available");
  //       return false;
  //     }
  //   } else {
  //     //segundo if es mejorable
  //     if (gameBoard.placeMark(row, col, mark)) {
  //       if (gameBoard.checkWinner(row, col))
  //         console.log(`Congrats, ${currentPlayer.name} has won`);
  //       currentPlayer = playerOne;
  //       return true;
  //     } else {
  //       console.log("That cell is not available");
  //       return false;
  //     }
  //   }
  // }

  return {
    playRound,
    getBoard: gameBoard.getBoard,
  };
}

const game = createGameController("Ismael", "Tania", "Javi");

game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(1, 1);
game.playRound(1, 2);
game.playRound(2, 2);

// console.log(game.getBoard());

// NOT WORKING
// if (countX === 3) console.log(`${playerOne.name} is the winner`);
//         else if (countO === 3) console.log(`${playerTwo.name} is the winner`);
//         else {
//           if (currentBoard[i][j].mark === "X"){
//             do{
//               i++
//               countX++
//             }while(currentBoard[i][j].mark === "X" || countX === 3 || i === 3);
//             //same for j++ to check column and i++ and j++ to check diagonal
//             //return false when we don't have any winning criteria
//             // do same with O
//             // for sure that can be refactored to improve the code
//           }
//           else if (currentBoard[i][j].mark === "O") countO++;
//         }

// if (currentBoard[i][j] === "X") countX++;
//       else if (currentBoard[i][j] === "O") countO++;
//     if (countX === 3) console.log(`${playerOne.name} is the winner`);
//     if (countO === 3) console.log(`${playerTwo.name} is the winner`);
