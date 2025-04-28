const db = require('../config/db');      // ← ดึง database connection มาใช้
const bcrypt = require('bcrypt');         // ← ดึง bcrypt มาใช้
const saltRounds = 10;

exports.signin = async (req , res) =>{
    try{
        const {username , email, password} = req.body;
        
        const [users] = await db.query("SELECT * FROM users WHERE username =?",[username]);
        if(users.length > 0){
            return res.status(400).json({error:"Username already taken"});
        }

        const passwordHash = await bcrypt.hash(password, saltRounds)
        const sql = "INSERT INTO users (username ,email ,password) VALUES (?,?,?) ";
        const [result] = await db.query(sql, [username, email, passwordHash])
        
        res.status(201).json({ message: "Signup successful", userId: result.insertId });


    }catch(err){
        return res.status(404).json({ DB_error: "Database error" })
    }

}


exports.login = async (req , res) =>{
    try{
        const {email, password} = req.body;
        const [userInfo] = await db.query("SELECT * FROM users WHERE email =?",[email]);
        const user = userInfo[0];
        //check email
        if (!user) return res.status(400).send({ message: "Invalid email or password" });
        //check password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send({ message: "Invalid email or password" });
      
        
        res.status(201).json({ message: "login successful", username: user.username  });

    }catch(err){
        return res.status(404).json({ DB_error: "Database error" })
    }

}