const db = require("../db")
const Book = require("../models/book")
const request = require("supertest")

const app = require("../app")

process.env.NODE_ENV = "test"
let isbn

beforeEach(async function() {
    await db.query("DELETE FROM books")

    await Book.create({
        "isbn": "0691161518",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthew Lane",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017
    })
    await Book.create({
        "isbn": "1134457635",
        "amazon_url": "http://a.co/f3Tre35",
        "author": "Zubenko Mikhail Petrovich",
        "language": "russian",
        "pages": 228,
        "publisher": "Vor v zakone",
        "title": "Mafiozi",
        "year": 2018
    })

    isbn = "1134457635"
})

describe("POST /books", async function () {
    test("Create a book", async function () {
        const resp = await request(app).post('/books').send({
            "isbn": "0332453631",
            "amazon_url": "http://a.co/A2ddfV5",
            "author": "Huyouthor",
            "language": "hebrew",
            "pages": 1488,
            "publisher": "Boobks",
            "title": "Mein Kraftf",
            "year": 1945 
        })

        expect(resp.statusCode).toBe(201)
        expect(resp.body.book).toEqual({
            "isbn": "0332453631",
            "amazon_url": "http://a.co/A2ddfV5",
            "author": "Huyouthor",
            "language": "hebrew",
            "pages": 1488,
            "publisher": "Boobks",
            "title": "Mein Kraftf",
            "year": 1945 
        })
    })

    test("Create a book with incorrect data", async function() {
        const resp = await request(app).post('/books').send({
            "isbn": true,
            "amazon_url": 224,
            "author": "Incorrect",
            "language": false,
            "pages": "223",
            "publisher": "Boobks",
            "title": "Mein Kraftf",
            "year": "666" 
        })

        expect(resp.statusCode).toBe(400)
    })
})

describe("GET /books", async function() {
    test("Get a list of books", async function() {
        const resp = await request(app).get('/books')
        const books = resp.body.books

        expect(books).toHaveLength(2)
    })
})

describe("GET /books/:isbn", async function() {
    test("Get one book", async function() {
        const response = await request(app).get(`/books/${isbn}`)
        
        expect(response.body.book).toHaveProperty("isbn")
        expect(response.body.book.isbn).toEqual(isbn)
    })

    test("Get a non-existent book", async function() {
        const response = await request(app).get(`/books/1212515`)
        
        expect(response.statusCode).toBe(404)
    })
})

describe("PUT /books/:id", async function() {
    test("Update a book", async function() {
        const response = await request(app).put(`/books/${isbn}`).send({
            "amazon_url": "http://a.co/f664gfw5",
            "author": "Patched Author",
            "language": "english",
            "pages": 123,
            "publisher": "Test",
            "title": "Test",
            "year": 2018  
        })
        
        expect(response.body.book.title).toEqual("Test")
        expect(response.body.book.author).toEqual("Patched Author")
        expect(response.body.book.pages).toEqual(123)
        expect(response.body.book.title).toEqual("Test")
    })

    test("Incorrect update", async function() {
        const response = await request(app).put(`/books/${isbn}`).send({
            "amazon_url": "http://a.co/f664gfw5",
            "author": true,
            "language": "english",
            "pages": "123",
            "publisher": "Test",
            "title": 123,
            "year": 2018  

        })

        expect(response.statusCode).toBe(400)
    })
})

describe("DELETE /books/:id", async function() {
    test("Delete a book", async function() {
        const response = await request(app).delete(`/books/${isbn}`)

        expect(response.body).toEqual({message: "deleted"})
    })
})

afterEach(async function() {
    await db.query("DELETE FROM books")
})

afterAll(async function() {
    await db.end();
})