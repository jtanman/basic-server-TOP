const db = require("../db/queries");

async function getUsernames(req, res) {
  const { search } = req.query;
  let usernames;
  if (search) {
    usernames = await db.searchUsernames(search);
  } else {
    usernames = await db.getAllUsernames();
  }
  res.send("Usernames: " + usernames.map(user => user.username).join(", "));
}

async function createUsernameGet(req, res) {
  res.send(`
    <form action="/new" method="POST">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <button type="submit">Add Username</button>
    </form>
  `);
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

async function deleteUsernames(req, res) {
  await db.deleteAllUsernames();
  res.send("All usernames deleted.");
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
  deleteUsernames
};
