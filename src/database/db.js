const mysql = require("mysql2/promise");

require("dotenv").config();

const { HOST, USER, PASSWORD, DATABASE } = process.env;

let pool;

async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
    });
  }
  return await pool.getConnection();
}

module.exports = getDB;
