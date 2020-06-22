const db = require("../db")
const Book = require("../models/book")

process.env.NODE_ENV = "test"

describe("Test Book class", function() {
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
    })

    test("Get a book by isbn", async function() {
        let book = await Book.findOne("0691161518")

        expect(book.author).toBe("Matthew Lane")
        expect(book.language).toBe("english")
        expect(book.pages).toBe(264)
        expect(book.publisher).toBe("Princeton University Press")
        expect(book.title).toBe("Power-Up: Unlocking the Hidden Mathematics in Video Games")
        expect(book.year).toBe(2017)
    })

    test("Get a non-existent book", async function() {
        expect(await Book.findOne("1")).toThrow()
    })

    test("Get all books", async function() {
        let books = await Book.findAll()

        expect(books.length).toBe(2)
    })

    test("Create a book", async function() {
        let book = await Book.create({
            "isbn": "0332453631",
            "amazon_url": "http://a.co/A2ddfV5",
            "author": "Huyouthor",
            "language": "hebrew",
            "pages": 1488,
            "publisher": "Boobks",
            "title": "Mein Kraftf",
            "year": 1945
        })

        expect(book.isbn).toBe("0332453631")
    })

    test("Create a book with missing data", async function() {
        expect(await Book.create({
                "isbn": "0332453631",
                "amazon_url": "http://a.co/A2ddfV5",
                "author": "Huyouthor",
            })
        ).toThrow()
    })

    test("Create a book with incorrect data type", async function() {
        expect(await Book.create({
                "isbn": 0,
                "amazon_url": "http://a.co/A2ddfV5",
                "author": "Huyouthor",
                "language": "hebrew",
                "pages": true,
                "publisher": "Boobks",
                "title": "Mein Kraftf",
                "year": 1945
            })
        ).toThrow()
    })

    test("Update a book", async function() {
        let book = await Book.findOne("1134457635")

        expect(book.isbn).toBe("1134457635")
        expect(book.author).toBe("Zubenko Mikhail Petrovich")
        expect(book.language).toBe("russian")
        expect(book.pages).toBe(228)
        expect(book.publisher).toBe("Vor v zakone")
        expect(book.title).toBe("Mafiozi")
        expect(book.year).toBe(2018)

        book = await Book.update({
            "isbn": "1134457635",
            "amazon_url": "http://a.co/f3Tre35",
            "author": "New Author",
            "language": "russian",
            "pages": 300,
            "publisher": "Vor v zakone",
            "title": "Mafiozi",
            "year": 2018
        })

        expect(book.isbn).toBe("1134457635")
        expect(book.author).toBe("New Author")
        expect(book.language).toBe("russian")
        expect(book.pages).toBe(300)
        expect(book.publisher).toBe("Vor v zakone")
        expect(book.title).toBe("Mafiozi")
        expect(book.year).toBe(2018)
    })
})


afterAll(async function() {
    await db.end();
})