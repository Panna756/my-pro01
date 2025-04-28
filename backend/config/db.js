const mysql = require('mysql2');

// สร้าง connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql123",
  database: "myapp",
});

// promise wrapper
const db = conn.promise();

module.exports = db;