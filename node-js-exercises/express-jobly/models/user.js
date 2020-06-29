const db = require("../db")
const expressError = require("../helpers/expressError")
const patch = require("../helpers/partialUpdate")
const bcrypt = require('bcrypt')

const { BCRYPT_WORK_FACTOR } = require('../config')

class User {

    static async create(data) {
        const pwd = bcrypt.hash(data.password, BCRYPT_WORK_FACTOR)
        const { username, first_name, last_name, email, photo_url } = data

        const query = `
            INSERT INTO users (username, password, first_name, last_name, email, photo_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING username, password, first_name, last_name, email, photo_url, is_admin
        `

        const values = [
            username,
            pwd,
            first_name,
            last_name,
            email,
            photo_url
        ]

        const user = await db.query(query, values)

        return user.rows[0]
    }

    static async all() {
        let query = `
            SELECT username, first_name, last_name, email
            FROM users
        `

        const users = await db.query(query)
      
        return users.rows
    }
}