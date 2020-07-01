const db = require("../db");
const expressError = require("../helpers/expressError");
const patch = require("../helpers/partialUpdate");
const bcrypt = require("bcrypt");

const { BCRYPT_WORK_FACTOR } = require("../config");

/** User model */

class User {
  static async auth(data) {
    const query = `
            SELECT username, password, first_name, last_name, email, photo_url, is_admin
            FROM users
            WHERE username = $1
        `;

    const user = await db.query(query, [data.username]);
    let valid;

    if (user.rows[0]) {
      valid = await bcrypt.compare(data.password, user.rows[0].password);
    }

    if (valid) {
      return user.rows[0];
    } else {
      throw new expressError("Invalid credentials", 401);
    }
  }

  static async register(data) {
    const pwd = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    const { username, first_name, last_name, email, photo_url } = data;

    const query = `
            INSERT INTO users (username, password, first_name, last_name, email, photo_url)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING username, password, first_name, last_name, email, photo_url, is_admin
        `;

    const values = [username, pwd, first_name, last_name, email, photo_url];

    let user;

    try {
      user = await db.query(query, values);
    } catch (e) {
      throw e;
    }

    return user.rows[0];
  }

  static async all() {
    const query = `
            SELECT username, first_name, last_name, email
            FROM users
        `;

    const users = await db.query(query);

    return users.rows;
  }

  static async getOne(username) {
    const query = `
            SELECT username, first_name, last_name, email
            FROM users
            WHERE username = $1
        `;

    const user = await db.query(query, [username]);

    if (user.rows.length === 0) throw new expressError("No such user", 404);

    return user.rows[0];
  }

  static async edit(username, data) {
    const { query, values } = patch("users", data, "username", username);
    const user = await db.query(query, values);

    if (user.rows.length === 0) throw new expressError("No Such User", 404);

    return user.rows[0];
  }

  static async delete(username) {
    const query = `
            DELETE FROM users
            WHERE username = $1
            RETURNING username
        `;

    const user = await db.query(query, [username]);

    if (user.rows.length === 0) throw new expressError("No Such User", 404);

    return { message: `Successfully deleted user ${user.rows[0].username}` };
  }
}

module.exports = User;
