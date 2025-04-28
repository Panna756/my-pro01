const checkAuthFields = (req, res, next) => {
    const { username, email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }
  
    if ('username' in req.body) { // ถ้า user ส่ง username มา → สมัคร
      if (!username) {
        return res.status(400).json({ error: "Missing username" });
      }
    }
  
    next();
};

module.exports = checkAuthFields;