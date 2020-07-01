const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../db");
const SECRET_KEY = "test";

const DATA = {};

async function createInitialData() {
  try {
    let tokens = { adminToken: "", userToken: "" };

    const hashedPwd1 = await bcrypt.hash("test", 1);
    const u1 = await db.query(
      `
            INSERT INTO users (username, password, first_name, last_name, email, is_admin)
            VALUES ('test', $1, 'ftest', 'ltest', 'test@mail.com', true)
            RETURNING username, is_admin`,
      [hashedPwd1]
    );

    tokens.adminToken = jwt.sign(
      {
        username: u1.rows[0].username,
        is_admin: u1.rows[0].is_admin,
      },
      SECRET_KEY
    );

    const hashedPwd2 = await bcrypt.hash("test2", 1);
    const u2 = await db.query(
      `
            INSERT INTO users (username, password, first_name, last_name, email, is_admin)
            VALUES ('test2', $1, 'ftest2', 'ltest2', 'test2@mail.com', false)
            RETURNING username, is_admin`,
      [hashedPwd2]
    );

    tokens.userToken = jwt.sign(
      {
        username: u2.rows[0].username,
        is_admin: u2.rows[0].is_admin,
      },
      SECRET_KEY
    );

    const c1 = await db.query(
      `
        INSERT INTO companies (handle, name, num_employees) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
      ["TST", "Test Inc.", 100]
    );

    const c2 = await db.query(
      `
        INSERT INTO companies (handle, name, num_employees) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
      ["STST", "Second Test Inc.", 200]
    );

    companies = [c1.rows[0], c2.rows[0]];

    const j1 = await db.query(`
        INSERT INTO jobs (title, salary, equity, company_handle) 
        VALUES ('test job', 123456, 0.5, 'TST') 
        RETURNING *`);

    const j2 = await db.query(`
        INSERT INTO jobs (title, salary, equity, company_handle) 
        VALUES ('test job 2', 323456, 0.6, 'STST') 
        RETURNING *`);

    jobs = [j1.rows[0], j2.rows[0]];

    DATA.tokens = tokens;
    DATA.companies = companies;
    DATA.jobs = jobs;
  } catch (e) {
    console.error(e);
  }
}

async function clearDb() {
  try {
    await db.query("DELETE FROM jobs");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM companies");
    await db.query("ALTER SEQUENCE jobs_id_seq RESTART WITH 1");
  } catch (e) {
    console.error(e);
  }
}

async function terminate() {
  try {
    await db.end();
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  createInitialData,
  clearDb,
  terminate,
  DATA,
};
