// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

class Game {
    constructor() {
        this.categories = []
        this.gameTable = document.querySelector("#jeopardy")
        this.restartBtn = document.querySelector("#restart")
    }

    async getCategories() {
        let randOffset = Math.floor(Math.random() * 10000)
        let questions = await axios.get('http://jservice.io/api/categories', {params: {count: 6, offset: randOffset}})
        
        for (let question of questions.data) {
            this.categories.push(await this.getCategoryInfo(question.id))
        }
    }
    
    async getCategoryInfo(catId) {
        const category = await axios.get('http://jservice.io/api/category', {params: {id: catId}})
        const categoryTitle = category.data.title.toUpperCase()
        const categoryClues = await this.getCategoryQuestions(category)
    
        const clueArray = []
    
        categoryClues.forEach(function(clue) {
            clueArray.push({question: clue.question, answer: clue.answer, showing: null})
        })
    
        return {id: catId, title: categoryTitle, clues: clueArray}
    }

    async getCategoryQuestions(category) {
        const questions = new Set()
        const categoryClues = category.data.clues
    
        while (questions.size !== 5) {
            let randomQuestionId = Math.floor(Math.random() * categoryClues.length)
            questions.add(categoryClues[randomQuestionId])
        }
        
        return questions
    }

    async fillTable() {
        let newTr = document.createElement('tr')
            
        for (let i = 0; i < this.categories.length; i++) {
            let newTd = document.createElement('th')
            newTd.append(this.categories[i].title)
            newTr.append(newTd)
        }
    
        const tableHead = this.gameTable.querySelector('thead')
        tableHead.append(newTr)
    
        for (let i = 0; i < 5; i++) {
            let newQuestionTr = document.createElement('tr')
    
            for (let j = 0; j < this.categories.length; j++) { 
    
                let newQuestionTd = document.createElement('td')
                newQuestionTd.append("?")
                newQuestionTd.dataset.x = j
                newQuestionTd.dataset.y = i
                newQuestionTr.append(newQuestionTd)
    
                const tableBody = this.gameTable.querySelector('tbody')
                tableBody.append(newQuestionTr)
            }
        }
    }

    handleClick(event) {
        const target = event.target
        const posX = event.target.dataset.x
        const posY = event.target.dataset.y

        if (this.categories[posX].clues[posY].showing === "answer") {
            return
        } 
    
        if (this.categories[posX].clues[posY].showing === "question") {
            target.innerHTML = this.categories[posX].clues[posY].answer
            this.categories[posX].clues[posY].showing = "answer"
            return
        }
        
        if (target.tagName === "TD") {
            target.innerHTML = this.categories[posX].clues[posY].question
            this.categories[posX].clues[posY].showing = "question"
        }
    }

    resetBoard() {
        this.gameTable.querySelector('thead').innerHTML = ""
        this.gameTable.querySelector('tbody').innerHTML = ""
    }

    async restartGame() {
        this.categories.length = 0
        this.resetBoard()
        this.setupAndStart()
    }

    async setupAndStart() {
        await this.getCategories()
        await this.fillTable()
        this.gameTable.addEventListener('click', this.handleClick.bind(this))
    }
}

const game = new Game()
game.setupAndStart()