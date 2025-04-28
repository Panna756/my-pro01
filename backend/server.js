// backend/server.js
const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/auth');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

// เริ่ม server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});