const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Rathna@1964",
    database: "NotesPasswords"
});

module.exports = pool;