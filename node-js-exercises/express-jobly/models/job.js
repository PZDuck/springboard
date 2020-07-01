const db = require("../db");
const expressError = require("../helpers/expressError");
const patch = require("../helpers/partialUpdate");

class Job {
  static async create(data) {
    let query = `
            INSERT INTO jobs (title, salary, equity, company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title, salary, equity, company_handle, date_posted
        `;

    const values = [data.title, data.salary, data.equity, data.company_handle];

    const job = await db.query(query, values);

    if (job.rows.length === 0) throw new expressError("Incorrect values", 400);

    return job.rows[0];
  }

  static async getAll(params) {
    let { search = "", min_salary = 0, min_equity = 0 } = params;

    let query = `
            SELECT id, title, salary, equity, company_handle, date_posted
            FROM jobs
            WHERE title ILIKE '%' || $1 || '%' AND
            salary >= $2 AND
            equity >= $3
            ORDER BY date_posted
        `;

    const values = [search, min_salary, min_equity];

    const jobs = await db.query(query, values);

    if (jobs.rows.length === 0) throw new expressError("Not found", 404);

    return jobs.rows;
  }

  static async getOne(id) {
    let query = `
            SELECT id, title, salary, equity, company_handle, date_posted
            FROM jobs
            WHERE id = $1
        `;

    const job = await db.query(query, [id]);

    if (job.rows.length === 0) throw new expressError("Not Found", 404);

    return job.rows[0];
  }

  static async edit(id, data) {
    const { query, values } = patch("jobs", data, "id", id);
    const job = await db.query(query, values);

    if (job.rows.length === 0) throw new expressError("No Such Job", 404);

    return job.rows[0];
  }

  static async delete(id) {
    const query = `
            DELETE FROM jobs
            WHERE id = $1
            RETURNING id, title
        `;

    const job = await db.query(query, [id]);

    if (job.rows.length === 0) throw new expressError("Does not exist", 404);

    return {
      message: `Successfully deleted ID ${job.rows[0].id} - ${job.rows[0].title}`,
    };
  }
}

module.exports = Job;
