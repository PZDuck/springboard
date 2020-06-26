const db = require("../db")
const expressError = require("../helpers/expressError")
const patch = require("../helpers/partialUpdate")
const sqlForPartialUpdate = require("../helpers/partialUpdate")

class Company {
    static async getAll(params) {
        let { search='', min_employees=0, max_employees=2147483647 } = params
        
        if (min_employees > max_employees) throw new expressError("Invalid params", 400)

        const companies = await db.query(`
            SELECT handle, name
            FROM companies
            WHERE name ILIKE '%' || $1 || '%' AND
            num_employees BETWEEN $2 AND $3
            `, [search, min_employees, max_employees])
        
        if (companies.rows.length === 0) {
            throw new expressError("No match", 400)
        }

        return companies.rows
    }

    static async getOne(handle) {
        const company = await db.query(`
            SELECT handle, name, num_employees, description, logo_url
            FROM companies
            WHERE handle = $1
            `, [handle])
        
        if (company.rows.length === 0) throw new expressError("Not found", 404)

        return company.rows[0]
    }

    static async create(data) {
        const result = await db.query(`
            INSERT INTO companies (handle, name, num_employees, description, logo_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING handle, name, num_employees, description, logo_url
            `, [data.handle, data.name, data.num_employees, data.description, data.logo_url])

        if (result.rows.length === 0) throw new expressError("Could not add", 500)

        return result.rows[0]
    }

    static async edit(handle, data) {
        const { query, values } = patch('companies', data, 'handle', handle)
        const company = await db.query(query, values)

        if (company.rows.length === 0) throw new expressError("Not found", 404)

        return company.rows[0]
        
    }

    static async delete(handle) {
        const company = await db.query(
            `
            DELETE FROM companies
            WHERE handle = $1
            RETURNING handle
            `, [handle])
        
        if (company.rows.length === 0) throw new expressError("Does not exist", 404)

        return { message: `successfully deleted ${handle}` } 
    }
}

module.exports = Company