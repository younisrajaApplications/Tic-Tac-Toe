function getTiles() {
    return document.getElementsByClassName('tile');
  }
  const tiles = getTiles();
  
  function getPlayers() {
    return document.getElementsByClassName('player');
  }
  const players = getPlayers();
  
  const status = document.getElementById('status');
  const restartBtn = document.getElementById('restart-btn');
  
  let currentPlayer = 'X'; // Initial player
  let gameActive = true; // Tracks game state
  let board = Array(4).fill(null).map(() => Array(4).fill(null)); // 4x4 board
  
  // Initializes the game
  function initializeGame() {
    status.textContent = 'Game in progress...';
    restartBtn.style.display = 'none'; // Hide restart button initially
  
    players[0].classList.add('active'); // Set Player 1 as active
    players[1].classList.remove('active');
  
    // Set up tiles with click listeners
    Array.from(tiles).forEach((tile, index) => {
      tile.textContent = ''; // Clear tile content
      tile.addEventListener('click', () => handleTileClick(tile, index));
    });
  
    restartBtn.addEventListener('click', restartGame); // Set up restart button listener
  }
  
  // Handles tile clicks during the game
  function handleTileClick(tile, index) {
    if (!gameActive || tile.textContent !== '') return; // Ignore if game is over or tile is already filled
  
    const row = Math.floor(index / 4);
    const col = index % 4;
  
    tile.textContent = currentPlayer; // Mark the tile
    board[row][col] = currentPlayer; // Update board state
  
    if (checkWin(row, col, currentPlayer)) {
      status.textContent = currentPlayer === 'X' ? 'Player 1 won!' : 'Player 2 won!';
      gameActive = false;
      restartBtn.style.display = 'block'; // Show restart button
    } else if (checkDraw()) {
      status.textContent = 'Draw!';
      gameActive = false;
      restartBtn.style.display = 'block'; // Show restart button
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
      updateActivePlayer();
    }
  }
  
  // Checks for winning condition (horizontal, vertical, diagonal, 2x2 square)
  function checkWin(row, col, player) {
    if (
      board[row].every(cell => cell === player) || // Horizontal check
      board.every(row => row[col] === player) // Vertical check
    ) {
      return true;
    }
  
    // Check for diagonal wins
    if (checkDiagonalWin(player)) {
      return true;
    }
  
    // Check 2x2 square
    return checkSquareWin(row, col, player);
  }
  
  // Checks for diagonal win condition
  function checkDiagonalWin(player) {
    // Check main diagonal (Top-Left to Bottom-Right)
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player && board[3][3] === player) {
      return true;
    }
  
    // Check anti-diagonal (Top-Right to Bottom-Left)
    if (board[0][3] === player && board[1][2] === player && board[2][1] === player && board[3][0] === player) {
      return true;
    }
  
    return false;
  }
  
  // Checks for 2x2 square win condition
  function checkSquareWin(row, col, player) {
    const squares = [
      [[0, 0], [0, 1], [1, 0], [1, 1]],
      [[0, 1], [0, 2], [1, 1], [1, 2]],
      [[0, 2], [0, 3], [1, 2], [1, 3]],
      [[1, 0], [1, 1], [2, 0], [2, 1]],
      [[1, 1], [1, 2], [2, 1], [2, 2]],
      [[1, 2], [1, 3], [2, 2], [2, 3]],
      [[2, 0], [2, 1], [3, 0], [3, 1]],
      [[2, 1], [2, 2], [3, 1], [3, 2]],
      [[2, 2], [2, 3], [3, 2], [3, 3]],
    ];
  
    return squares.some(square =>
      square.every(([r, c]) => {
        const adjustedRow = r + row - (row % 2);
        const adjustedCol = c + col - (col % 2);
        return board[adjustedRow] && board[adjustedRow][adjustedCol] === player;
      })
    );
  }
  
  // Checks if the game is a draw (no empty cells)
  function checkDraw() {
    return board.flat().every(cell => cell !== null);
  }
  
  // Updates active player indicator
  function updateActivePlayer() {
    if (currentPlayer === 'X') {
      players[0].classList.add('active');
      players[1].classList.remove('active');
    } else {
      players[1].classList.add('active');
      players[0].classList.remove('active');
    }
  }
  
  // Resets the game to its initial state
  function restartGame() {
    gameActive = true;
    currentPlayer = 'X'; // Reset to Player 1
    board = Array(4).fill(null).map(() => Array(4).fill(null)); // Reset board state
    status.textContent = 'Game in progress...';
    restartBtn.style.display = 'none'; // Hide restart button
  
    Array.from(tiles).forEach(tile => {
      tile.textContent = ''; // Clear tile content
    });
  
    initializeGame(); // Reinitialize game
  }
  
  // Starts the game when the page loads
  initializeGame();
  