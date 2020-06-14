/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let game


class Game {
  constructor(width, height) {
    this.WIDTH = width
    this.HEIGHT = height
    this.currentPlayer = 1
    this.anotherPlayer = 2
    this.board
    this.filled
    this.colors = ['red', 'blue']
    this.lockBoard = false
    this.initializeBoard()
    this.drawBoard()
  }

  initializeBoard() {
    this.board = Array(HEIGHT).fill().map(()=>Array(WIDTH).fill(0));
    this.filled = 0
  }

  resetBoard() {
    this.board.length = 0
    this.filled = 0
    this.initializeBoard()
    document.querySelector('#top').innerHTML = ""
    document.querySelector('#board').innerHTML = ""
    this.drawBoard()
    this.lockBoard = false
  }

  drawBoard() {
    const htmlBoard = document.querySelector('#board')
    const boardTop = document.querySelector('#top')

    // Filling the top row
    for (let x = 0; x < WIDTH; x++) {
      const headCell = document.createElement("div")
      headCell.addEventListener("click", this.handleClick.bind(this))
      headCell.setAttribute("id", x)
      headCell.classList.add('head-cell')
      headCell.innerText = ''


      const innerHeadCell = document.createElement("div")
      innerHeadCell.setAttribute("id", x)
      innerHeadCell.classList.add('head-inner-cell')
      headCell.append(innerHeadCell)

      boardTop.append(headCell)
    }

    // Filling the rest of the board
    for (let x = 0; x < HEIGHT; x++) {
      for (let y = 0; y < WIDTH; y++) {
        const cell = document.createElement("div");
        cell.setAttribute("id", `${y}-${x}`);
        cell.innerText = ''
        htmlBoard.append(cell);
      }
    }
  }

  findSpotForCol(x) {
    const column = document.querySelectorAll(`div[id*="${x}-"]`)
    console.log(column)

    for (let i=HEIGHT-1; i>=0; i--) {
      if (column[i].children.length === 0) {
        const chip = document.createElement("div")
        chip.classList.add(`chip-${this.currentPlayer}`)
        document.documentElement.style.setProperty('--currRow', i)
        column[i].append(chip)
        return i
      }
    }
    return null
  }

  placeInTable(y, x) {
    this.board[y][x] = this.currentPlayer
  }

  handleClick(evt) {
    
    if (this.lockBoard) {
      return
    }

    const x = +evt.target.id;
    const y = this.findSpotForCol(x)

    if (y === null) {
      return;
    }

    this.placeInTable(y, x)

    if (this.checkForWin([y, x])) {
      return this.endGame(`Player ${this.currentPlayer} won!`);
    }
  
    this.filled++
    if (this.filled === (WIDTH * HEIGHT)) {
      return this.endGame("Tie")
    } 
  }

  checkForWin([y, x]) {
    const win = (cells) => {
      return cells.every(
        ([y, x]) => 
          y >= 0 && y < HEIGHT &&
          x >= 0 &&
          x < WIDTH &&
          this.board[y][x] === this.currentPlayer
          )
      }

    // All possible winning combinations
    const horizThreeRight = [[y, x + 1], [y, x + 2], [y, x + 3]];
    const horizThreeLeft = [[y, x - 1], [y, x - 2], [y, x - 3]];
    const horizTwoRightOneLeft = [[y, x - 1],[y, x + 1], [y, x + 2]];
    const horizOneRightTwoLeft = [[y, x - 2], [y, x - 1], [y, x + 1]];
    const vert = [[y + 1, x], [y + 2, x], [y + 3, x]];
    const diagThreeTopRight = [[y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
    const diagThreeTopLeft = [[y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
    const diagThreeBotRight = [[y - 1, x + 1], [y - 2, x + 2], [y - 3, x + 3]];
    const diagThreeBotLeft = [[y - 1, x - 1], [y - 2, x - 2], [y - 3, x - 3]];
    const diagTwoTopRightOneBotLeft = [[y - 1, x - 1], [y + 1, x + 1], [y + 2, x + 2]]
    const diagOneTopRightTwoBotLeft = [[y - 2, x - 2],[y - 1, x - 1], [y + 1, x + 1]]
    const diagTwoTopLeftOneBotRight = [[y + 1, x - 1], [y + 2, x - 2], [y - 1, x + 1]]
    const diagOneTopLeftTwoBotRight = [[y + 1, x - 1], [y - 1, x + 1], [y - 2, x + 2]]


    const directions = [horizThreeRight, horizThreeLeft, vert, diagThreeTopRight, diagThreeTopLeft, 
    diagThreeBotRight, diagThreeBotLeft, horizTwoRightOneLeft, horizOneRightTwoLeft, diagTwoTopRightOneBotLeft,
    diagOneTopRightTwoBotLeft, diagTwoTopLeftOneBotRight, diagOneTopLeftTwoBotRight]

    for (let dir of directions) {
      if (win(dir)) {
        return true;
      }
    }

    [this.currentPlayer, this.anotherPlayer] = [this.anotherPlayer, this.currentPlayer];

    [this.colors[0], this.colors[1]] = [this.colors[1], this.colors[0]];

    document.documentElement.style.setProperty("--currPlayerColor", this.colors[0])
  }

  endGame(msg) {
    this.lockBoard = true
    document.querySelector("#play-body").innerText = "Choose desired board size. (Max 10)"
    document.querySelector('.play-again-modal-body').innerHTML = msg
    document.querySelector('#playAgainBtn').click()
  }
}


document.querySelector("#play").addEventListener('click', () => {
  event.preventDefault()

  const width = document.querySelector('#width').value
  const height = document.querySelector('#height').value

  if (parseInt(width) > 10 || 
      parseInt(height) > 10 || 
      parseInt(width) < 4 || 
      parseInt(height) < 4) {
        document.querySelector("#play-body").innerText = "Are you serious?"
        return
  } else if (!parseInt(width) || !parseInt(height)) {
      document.querySelector("#play-body").innerText = "Cannot be empty. Please choose the size of the board (Max 10)"
      return
  }

  WIDTH = parseInt(document.querySelector('#width').value)
  document.documentElement.style.setProperty("--colNum", WIDTH)
  
  HEIGHT = parseInt(document.querySelector('#height').value)
  document.documentElement.style.setProperty("--rowNum", HEIGHT)
  
  document.querySelector(".jumbotron").classList.add('hide')
  document.querySelector("#game").classList.remove('hide')

  if (game) {
    game.resetBoard()
  } else {
    game = new Game(WIDTH, HEIGHT)
  }

  document.querySelector('#modalClose').click()
})


document.querySelector("#modalEnd").addEventListener('click', () => {
  document.querySelector(".jumbotron").classList.remove('hide')
  document.querySelector("#game").classList.add('hide')
})