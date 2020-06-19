const db = require('../db.js')
const bcrypt = require('bcrypt')
const expressError = require('../expressError')

const { BCRYPT_WORK_FACTOR } = require('../config')


/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) {
    const pwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

    const user = await db.query(`
      INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
      VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
      RETURNING username, password, first_name, last_name, phone, join_at, last_login_at`,
      [username, pwd, first_name, last_name, phone])
    
    return user.rows[0]
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const user = await db.query(`
      SELECT username, password
      FROM users
      WHERE username = $1`,
      [username])

    if (!user.rows[0]) return false

    return bcrypt.compare(password, user.rows[0].password) 
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const user = await db.query(`
      UPDATE users
      SET last_login_at = current_timestamp
      WHERE username = $1
      RETURNING username, last_login_at`,
      [username])
    
    if (!user.rows[0]) throw new expressError("No such user", 400)

    return user.rows[0]
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const users = await db.query(`
      SELECT username, first_name, last_name, phone
      FROM users`)
    
    return users.rows
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const user = await db.query(`
      SELECT username, first_name, last_name, phone, join_at, last_login_at
      FROM users
      WHERE username = $1`,
      [username])
    
    if (!user.rows) throw new expressError("No user found", 400)

    return user.rows[0]
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    let messages = await db.query(`
      SELECT m.id, m.body, m.sent_at, m.read_at, m.to_username, t.first_name, t.last_name, t.phone
      FROM messages AS m
      JOIN users AS t
      ON m.to_username = t.username
      WHERE m.from_username = $1`,
      [username])
    
    if (!messages.rows[0]) throw new expressError("No such username", 400)

    messages = messages.rows
    let res = []
    
    for (let message of messages) {
      res.push({
        "id": message.id,
        "to_user": {
          "username": message.to_username,
          "first_name": message.first_name,
          "last_name": message.last_name,
          "phone": message.phone
        },
        "body": message.body,
        "sent_at": message.sent_at,
        "read_at": message.read_at
      })
    }

    return res
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    let messages = await db.query(`
      SELECT m.id, m.body, m.sent_at, m.read_at, m.from_username, f.first_name, f.last_name, f.phone
      FROM messages AS m
      JOIN users AS f
      ON m.from_username = f.username
      WHERE m.to_username = $1`,
      [username])
    
    if (!messages.rows[0]) return new expressError("No such username", 400)

    messages = messages.rows
    let res = []
    
    for (let message of messages) {
      res.push({
        "id": message.id,
        "from_user": {
          "username": message.from_username,
          "first_name": message.first_name,
          "last_name": message.last_name,
          "phone": message.phone
        },
        "body": message.body,
        "sent_at": message.sent_at,
        "read_at": message.read_at
      })
    }

    return res
  }
}


module.exports = User;