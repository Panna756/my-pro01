import 'dotenv/config';
import mysql from 'mysql2';
// สร้าง connection
const conn = mysql.createConnection({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

// promise wrapper
const db = conn.promise();

export default db;