const db = require("../db")
const expressError = require("../helpers/expressError")
const patch = require("../helpers/partialUpdate")


class Company {
    static async getAll(params) {
        let { search='', min_employees=0, max_employees=2147483647 } = params
        
        if (min_employees > max_employees) throw new expressError("Invalid params", 400)

        let query = `
            SELECT handle, name
            FROM companies
            WHERE name ILIKE '%' || $1 || '%' AND
            num_employees BETWEEN $2 AND $3
        `

        const values = [search, min_employees, max_employees]

        const companies = await db.query(query, values)
        
        if (companies.rows.length === 0) {
            throw new expressError("No match", 400)
        }

        return companies.rows
    }

    static async getOne(handle) {
        let query = `
            SELECT c.name, c.num_employees, c.description, c.logo_url,
                   j.title, j.salary, j.equity, j.date_posted
            FROM companies AS c
            INNER JOIN jobs AS j
            ON c.handle = j.company_handle
            WHERE c.handle = $1
        `
        const company = await db.query(query, [handle])
        
        if (company.rows.length === 0) throw new expressError("Not found", 404)

        let jobs = []
        for (let job of company.rows) {
            jobs.push({
                "title": job.title,
                "salary": job.salary,
                "equity": job.equity,
                "date_posted": job.date_posted
            })
        }

        return {
            "handle": company.rows[0].handle,
            "name": company.rows[0].name,
            "num_employees": company.rows[0].num_employees,
            "description": company.rows[0].description,
            "logo_url": company.rows[0].logo_url,
            "jobs": jobs
        }
    }

    static async create(data) {
        let query = `
            INSERT INTO companies (handle, name, num_employees, description, logo_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING handle, name, num_employees, description, logo_url
        `

        const values = [
            data.handle, 
            data.name, 
            data.num_employees, 
            data.description, 
            data.logo_url
        ]

        const result = await db.query(query, values)

        if (result.rows.length === 0) throw new expressError("Could not add", 500)

        return result.rows[0]
    }

    static async edit(handle, data) {
        const { query, values } = patch('companies', data, 'handle', handle)
        const company = await db.query(query, values)

        if (company.rows.length === 0) throw new expressError("No Such Company", 404)

        return company.rows[0]
        
    }

    static async delete(handle) {
        let query = `
            DELETE FROM companies
            WHERE handle = $1
            RETURNING handle
        `

        const company = await db.query(query, [handle])
        
        if (company.rows.length === 0) throw new expressError("Does not exist", 404)

        return { message: `successfully deleted ${handle}` } 
    }
}

module.exports = Company