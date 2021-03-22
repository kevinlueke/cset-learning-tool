const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASS,
})

module.exports = {
  async query(text, params) {
    const res = await pool.query(text, params)
    return res
  }
}
