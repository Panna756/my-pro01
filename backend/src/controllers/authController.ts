import { Request, Response } from 'express';
import db from '../config/db';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

    if ((users as any[]).length > 0) {
      res.status(400).json({ error: "Username already taken" });
      return
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const [result]: any = await db.query(sql, [username, email, passwordHash]);

    res.status(201).json({ message: "Signup successful", userId: result.insertId });
  } catch (err) {
    res.status(404).json({ DB_error: "Database error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { email, password } = req.body;
    const [userInfo]: any[] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = userInfo[0];

    if (!user){
      res.status(400).send({ message: "Invalid email or password" });
      return
    } 

    const match = await bcrypt.compare(password, user.password);
    if (!match){
      res.status(400).send({ message: "Invalid email or password" });
      return
    } 

    res.status(201).json({ message: "login successful", username: user.username });
  } catch (err) {
    res.status(404).json({ DB_error: "Database error" });
  }
};
