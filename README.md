## Minesweeper Game
This project is a simple implementation of the classic Minesweeper game using HTML, CSS, and JavaScript.

Play the game here at [https://minesweeper.michaelion.repl.co/](https://minesweeper.michaelion.repl.co/)

### Overview
The game board is a square of cells. The game starts with a grid that is covered and has mines placed in random locations. The goal is to reveal all the cells in the grid that do not contain a mine.

### Gameplay
- Select the game difficulty: Beginner (9x9, 10 mines), Intermediate (16x16, 40 mines), or Advanced (20x20, 80 mines).
- Click on a cell to reveal it. If the revealed cell contains a mine, the game is over.
- If a revealed cell does not contain a mine, it will display a number indicating the total count of mines in the eight neighboring cells.
- If there are no mines in the neighboring cells, the cell will display nothing, and the game will automatically open the neighboring cells.
- Right-click on a cell to mark it with a flag if you think it contains a mine.
- The game is won when all cells that do not contain mines are revealed.

### Setup
No setup is required to play the game. Simply open the index.html file in your web browser.

### Code Structure
- index.html: The main HTML file that includes the game board and controls.
- style.css: Contains all the styles used in the game.
- script.js: The JavaScript file where the game logic is implemented. This includes functions for creating the game board, placing mines, handling user interactions, and checking the game status.

### Future Enhancements
Add a timer to track how long it takes to win the game.
Add a counter to display the number of mines left.
Implement a feature to save and load games.
