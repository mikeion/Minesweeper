let BOARD_SIZE;
let MINE_COUNT;

// Replace the old createBoard function with the new one
function createBoard() {
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      row.push({ mine: false, revealed: false });
    }
    board.push(row);
  }
  return board;
}

function placeMines(board) {
  let minesPlaced = 0;
  while (minesPlaced < MINE_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);

    if (!board[row][col].mine) {
      board[row][col] = { ...board[row][col], mine: true };
      minesPlaced++;
    }
  }
}

function renderBoard(board) {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  for (let row = 0; row < BOARD_SIZE; row++) {
    const tableRow = document.createElement("tr");
    for (let col = 0; col < BOARD_SIZE; col++) {
      const tableCell = document.createElement("td");
      tableCell.addEventListener("click", () => handleClick(row, col, board));
      tableCell.addEventListener("contextmenu", (e) => handleRightClick(e, row, col, board));
      tableRow.appendChild(tableCell);
    }
    gameBoard.appendChild(tableRow);
  }
}

function countAdjacentMines(row, col, board) {
  let count = 0;

  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      const newRow = row + r;
      const newCol = col + c;

      if (
        newRow >= 0 &&
        newRow < BOARD_SIZE &&
        newCol >= 0 &&
        newCol < BOARD_SIZE &&
        board[newRow][newCol].mine
      ) {
        count++;
      }
    }
  }

  return count;
}

function handleClick(row, col, board) {
  const gameBoard = document.getElementById("game-board");
  const boardCell = gameBoard.rows[row].cells[col];
  const cell = board[row][col];

  if (cell.revealed) return;

  board[row][col] = { ...cell, revealed: true };
  boardCell.classList.add("revealed");

  // Reveal all adjacent blank cells and their adjacent cells
  if (!cell.mine) {
    if (countAdjacentMines(row, col, board) === 0) {
      // Reveal all cells around this one
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          const newRow = row + r;
          const newCol = col + c;

          if (
            newRow >= 0 &&
            newRow < BOARD_SIZE &&
            newCol >= 0 &&
            newCol < BOARD_SIZE &&
            !board[newRow][newCol].mine
          ) {
            handleClick(newRow, newCol, board);
          }
        }
      }
    }
    else {
      // Reveal all blank cells around this one
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          const newRow = row + r;
          const newCol = col + c;

          if (
            newRow >= 0 &&
            newRow < BOARD_SIZE &&
            newCol >= 0 &&
            newCol < BOARD_SIZE &&
            !board[newRow][newCol].mine &&
            countAdjacentMines(newRow, newCol, board) === 0
          ) 
          {
            handleClick(newRow, newCol, board);
          }
        }
      }
    }
  }

  if (cell.mine) {
    boardCell.classList.add("mine");
    alert("Game over! You hit a mine.");
    initGame();
  } else {
    const adjacentMines = countAdjacentMines(row, col, board);
    if (adjacentMines > 0) {
      boardCell.textContent = adjacentMines;
    }
  }
}

function handleRightClick(e, row, col, board) {
  e.preventDefault(); // Prevent the browser's default context menu from appearing
  const gameBoard = document.getElementById("game-board");
  const boardCell = gameBoard.rows[row].cells[col];

  if (board[row][col].revealed) return; // Ignore right-clicks on already revealed cells

  if (boardCell.classList.contains("flag")) {
    boardCell.classList.remove("flag");
    boardCell.textContent = "";
  } else {
    boardCell.classList.add("flag");
    boardCell.textContent = "🚩";
  }
}

function initGame() {
  const board = createBoard();
  placeMines(board);
  renderBoard(board);
}

function startGame() {
  const difficulty = document.getElementById("difficulty").value;
  
  switch (difficulty) {
    case "beginner":
      BOARD_SIZE = 9;
      MINE_COUNT = 10;
      break;
    case "intermediate":
      BOARD_SIZE = 16;
      MINE_COUNT = 40;
      break;
    case "advanced":
      BOARD_SIZE = 20;
      MINE_COUNT = 80;
      break;
    default:
      BOARD_SIZE = 9;
      MINE_COUNT = 10;
  }
  
  initGame();
}

document.getElementById("start-game").addEventListener("click", startGame);

document.addEventListener("DOMContentLoaded", initGame);
