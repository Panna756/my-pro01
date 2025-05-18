import { Request, Response, NextFunction } from 'express';

const checkAuthFields = (req: Request, res: Response, next: NextFunction):void => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Missing email or password" });
    return 
  }

  if ('username' in req.body && !username) {
    res.status(400).json({ error: "Missing username" });
    return
  }

  next();
};

export default checkAuthFields;