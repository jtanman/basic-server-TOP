const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function searchUsernames(query) {
  const result = await pool.query(
    "SELECT * FROM usernames WHERE username ILIKE $1",
    [`%${query}%`]
  );
  return result.rows;
}

async function deleteUsernames() {
  await pool.query("DELETE * FROM usernames");
}

async function deleteAllUsernames() {
  await pool.query("DELETE FROM usernames");
}

module.exports = {
  getAllUsernames,
  insertUsername,
  searchUsernames,
  deleteUsernames,
  deleteAllUsernames,
};
