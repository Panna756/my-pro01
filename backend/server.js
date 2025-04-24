// backend/server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");


const app = express();
app.use(cors());
app.use(express.json());

// เชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql123",        // ใส่ password ที่คุณตั้งไว้ (ถ้ามี)
  database: "myapp",   // ชื่อ database ที่คุณสร้างไว้
});
const saltRounds = 10;


db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// ตัวอย่าง API: แสดงผู้ใช้ทั้งหมด
app.get("/users",  async (req, res) => {
  try {
    // 1. ดึงผู้ใช้ทั้งหมด
    db.query("SELECT * FROM users", async (err, result) => {
      if (err) return res.status(500).send(err);

      // 2. แสดงผู้ใช้ (ไม่รวม password)
      const info = result.map(({ password, ...rest }) => rest);
      res.json(info);

      // 3. ทำ password hash ให้เฉพาะ id 1-4
      for (let x = 1; x <= 5; x++) {
        db.query("SELECT password FROM users WHERE id = ?", [x], async (err, rows) => {
          if (err || rows.length === 0) return;

          const originalPassword = rows[0].password;

          const hashed = await bcrypt.hash(originalPassword, saltRounds);

          db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, x], (err) => {
            if (err) console.error(`Update error for id=${x}:`, err);
          });
        });
      }
    });
  } catch (err) {
    res.status(500).send("Server error");
  }


});

const checkSigninreq = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing field" });
  }
  else {
    next()
  }
}

const checkLoginreq = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing field" });
  }
  else {
    next()
  }
}
// signin
app.post("/api/signin", checkSigninreq, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const sql = "INSERT INTO users (username ,email ,password) VALUES (?,?,?) ";
    db.query(sql, [username, email, passwordHash], (err, result) => {
      if (err) {
        console.error("DB Error", err);
        return res.status(500).json({ DB_error: "Database error" })
      }

      res.status(201).json({ message: "User registered successfully", userId: result.insertId })
    })
  }catch(error){
    return res.status(404).json({ DB_error: "Database error" })
  }
  
})

app.post("/api/login", checkLoginreq, (req, res) => {
  const { email, password } = req.body;
  const sql = ""
})

// เริ่ม server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});