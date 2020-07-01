/** Shared config for application; can be req'd many places. */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "test";

const PORT = +process.env.PORT || 3000;

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'jobly-test'
// - else: 'jobly'

let DB_URI = `postgresql://postgres:password@localhost`;
const BCRYPT_WORK_FACTOR = 12;

if (process.env.NODE_ENV === "test") {
  DB_URI += "/jobly_test";
} else {
  process.env.DATABASE_URL
    ? (DB_URI = process.env.DATABASE_URL)
    : (DB_URI += "/jobly");
}

console.log(DB_URI);

module.exports = {
  SECRET_KEY,
  PORT,
  DB_URI,
  BCRYPT_WORK_FACTOR,
};
