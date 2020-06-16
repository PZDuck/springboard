/** Customer for Lunchly */

const db = require("../db");
const Reservation = require("./reservation");

/** Customer of the restaurant. */

class Customer {
  constructor({ id, firstName, lastName, phone, notes }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.notes = notes;
  }

  /** find all customers. */

  static async all() {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes
       FROM customers
       ORDER BY last_name, first_name`
    );
    return results.rows.map(c => new Customer(c));
  }

  /** get a customer by ID. */

  static async get(id) {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes 
        FROM customers WHERE id = $1`,
      [id]
    );

    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }

  static async search(name) {
    name = name.split(' ')
    let customers

    if (name.length > 1) {
      customers = await db.query(`
        SELECT id, first_name AS "firstName", last_name AS "lastName", CONCAT(first_name, ' ', last_name) AS "fullName", phone, notes
        FROM customers
        WHERE first_name LIKE '%' || $1 || '%' AND last_name LIKE '%' || $2 || '%'`,
        [name[0], name[1]])
    } else {
      customers = await db.query(`
        SELECT id, first_name AS "firstName", last_name AS "lastName", CONCAT(first_name, ' ', last_name) AS "fullName", phone, notes
        FROM customers
        WHERE first_name LIKE '%' || $1 || '%' OR last_name LIKE '%' || $1 || '%'`,
        [name[0]])
    }

    return customers.rows.map(i => { 
      i = new Customer(i)
      i.fullName = i.fullName()
      return i}
      )
  }

  static async listBest() {
    const customers = await db.query(`
      SELECT c.id, c.first_name AS "firstName", c.last_name AS "lastName", COUNT(r.customer_id) AS num_reservations
      FROM customers AS c
      JOIN reservations AS r ON c.id = r.customer_id
      GROUP BY c.id, c.first_name, c.last_name
      ORDER BY num_reservations DESC
      LIMIT 10`)
    console.log(customers.rows)
    return customers.rows.map(i => {
        let reservations = i.num_reservations
        i = new Customer(i)
        i.reservations = reservations
        return i
    })
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  /** get all reservations for this customer. */

  async getReservations() {
    return await Reservation.getReservationsForCustomer(this.id);
  }

  /** save this customer. */

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO customers (first_name, last_name, phone, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
        [this.firstName, this.lastName, this.phone, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE customers SET first_name=$1, last_name=$2, phone=$3, notes=$4
             WHERE id=$5`,
        [this.firstName, this.lastName, this.phone, this.notes, this.id]
      );
    }
  }
}

module.exports = Customer;
