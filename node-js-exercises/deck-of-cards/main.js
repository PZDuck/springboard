class Deck {
    constructor() {
        this.baseURL = `https://deckofcardsapi.com/api/deck`
        this.deck
    }

    async createDeck() {
        let res = await axios.get(`${this.baseURL}/new/`)
        this.deck = res.data
    }

    async drawCard() {
        let res = await axios.get(`${this.baseURL}/${this.deck.deck_id}/draw/?count=1`)
        this.deck.remaining = res.data.remaining
        return res.data
    }

    async shuffle() {
        let res = await axios.get(`${this.baseURL}/${this.deck.deck_id}/shuffle/`)
        this.deck = res.data
    }
}

let deck = new Deck()
deck.createDeck()

document.getElementById('draw').addEventListener('click', async function() {
    if (deck.deck.remaining === 1) {
        document.getElementById('draw').remove()
    }

    let res = await deck.drawCard()
    let card = res.cards[0]

    let img = document.createElement('img')
    img.setAttribute('src', card.image)
    img.classList.add('card')
    
    let angle = Math.floor(Math.random() * 180)
    let shift = Math.floor(Math.random() * 20)
    img.style = `transform: rotate(${angle}deg) translate(${shift}px);`

    document.getElementById('stack').appendChild(img)
})

document.getElementById('shuffle').addEventListener('click', () => {
    deck.shuffle()
    document.getElementById('stack').innerHTML = ""
})