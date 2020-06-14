/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {}
    for (let i = 0; i < this.words.length; i++) {
      let currentWord = this.words[i]
      let nextWord = this.words[i + 1]
      
      if (chains[currentWord]) {
        chains[currentWord].push(nextWord || null)
      } else {
        chains[currentWord] = [nextWord]
      }
    }
    return chains
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let key = this.getKey()
    let output = key
    for (let i = 0; i < numWords; i++) {
      let currentWord = this.getWord(key)
      if (currentWord) {
        output += ` ${currentWord}`
        key = currentWord
      } else break
    }
    return output
  }

  /** helper functions */
  getKey() {
    return this.words[Math.floor(Math.random() * this.words.length)]
  }

  getWord(key) {
    return this.chains[key][Math.floor(Math.random() * (this.chains[key].length))]
  }

}


module.exports = { MarkovMachine }