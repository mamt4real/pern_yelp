const Pool = require('pg').Pool

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } = process.env
const pool = new Pool({
  user: PGUSER,
  port: PGPORT,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
})
/**
 * Query Function
 * @param {String} text SQL query
 * @param {[Object]} params
 * @returns
 */
const query = (text, params) => pool.query(text, params)
module.exports = {
  query,
}
