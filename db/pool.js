const { Pool } = require("pg");

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "jamestan",
  database: "top_users",
  password: "",
  port: 5432 // The default port
});
