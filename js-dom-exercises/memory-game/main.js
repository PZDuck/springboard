const board = document.querySelector('#playground')
const startButton = document.querySelectorAll(".play")
const cards = board.querySelectorAll("div")
const menu = document.querySelector("#menu")
const modal = document.querySelector('#modal')
let scoreTab = document.querySelector('.current-score')
let matchedPairs = 0
let lockBoard = true
let selectedCards = []
let currentMove = 0
let currentScore = 0
let lastScore = localStorage.getItem('last-score')
let bestScore = localStorage.getItem('best-score')

// Implementing sleep function
const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

// Saving scores to the local storage
if (bestScore) {
	document.querySelector('#best-score').innerText = bestScore
}

if (lastScore) {
	document.querySelector('#last-score').innerText = lastScore
}

// Implementing shuffle function with Fisher-Yates algorithm
function shuffle() {
	for (let i=board.children.length;i>=0;i--) {
		board.appendChild(board.children[Math.random() * i | 0]);
	}
}

// Checking cards for matching values
function isMatch() {
	lockBoard = true;

	if (selectedCards[0].dataset.value === selectedCards[1].dataset.value) {

		matchedPairs++
		if (currentMove===1) {
			currentScore += 300
		}
		else if (currentMove===2) {
			currentScore += 150
		}
		else {
			currentScore += 50
		}

		currentMove = 0
		setTimeout(() => {
			selectedCards.forEach(card => {
				card.parentElement.classList.add('disabled')}
			)
			selectedCards.length = 0
			lockBoard = false;
		}, 1000)

		if (matchedPairs===8) {
			endGame()
		}
	}

	else {
		setTimeout(() => {
			selectedCards.forEach(card => {
				card.parentElement.classList.toggle('flipped')
			})
			selectedCards.length = 0
			lockBoard = false;
	  }, 1000)
	}
}

// Flipping the card
function flip(card) {
	if (lockBoard) return;

	card.parentElement.classList.toggle('flipped')
	selectedCards.push(card)

	if (selectedCards.length === 2) {
		currentMove++
		isMatch()
	}
}

// Starting the game, reseting all the counters, shuffling and unlocking the board
function startGame() {
	currentScore = 0
	currentMove = 0
	matchedPairs = 0
	modal.classList.remove("show")
	setTimeout(() => {
		cards.forEach(card => {
			card.classList.toggle('flipped')
		})
	  }, 10)

	menu.classList.add('startgame')
	sleep(500).then(() => {
		shuffle()
		lockBoard = false
	})
}

// Game over! Saving the score values, flipping all the cards on the board, triggering the overlay
function endGame() {
	lastScore = currentScore
	localStorage.setItem('last-score', lastScore)

	if (currentScore > bestScore) {
		bestScore = currentScore
		localStorage.setItem('best-score', bestScore)
		console.log('CURRENT', currentScore)
		console.log('NEW BEST', bestScore)
	}

	sleep(1000).then(() => {
		document.querySelectorAll('.disabled').forEach(card => {
		card.classList.toggle('disabled')
	})
	scoreTab.innerHTML = `You scored ${currentScore} <br> Your best: ${bestScore}`
	modal.classList.add("show")
	})
}

// Registering the clicks on the card elements
board.addEventListener('click', function(event) {
	if (event.target.className === 'back') {
		flip(event.target)
	}
})
	
// Registering the click on the "Start game" buttons
startButton.forEach((btn) => {
	btn.addEventListener('click', function() {
		startGame()
	})
})


