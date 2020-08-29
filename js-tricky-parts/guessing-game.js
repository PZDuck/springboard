function guessingGame() {
  const ANSWER = Math.floor(Math.random() * 100);
  let guessed = false;
  let guesses = 0;

  return function guess(num) {
    if (guessed) return "The game is over, you already won!";
    guesses++;

    if (num < ANSWER) return `${num} is too low!`;
    if (num > ANSWER) return `${num} is too high!`;

    if (num === ANSWER) {
      guessed = true;
      return `You win! You found ${num} in ${guesses} guesses.`;
    }
  };
}

module.exports = { guessingGame };
