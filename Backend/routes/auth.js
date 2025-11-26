const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "secret123"; // ganti kalau mau

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const isExist = await User.findOne({ email });
    if (isExist) return res.status(400).json({ message: "Email sudah digunakan" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashed });

    res.json({ message: "Register berhasil" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email salah" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ 
        token,
        username: user.username
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DEV LOGIN
router.post("/devlogin", (req, res) => {
  const { username, password } = req.body;

  const devUser = "Oscar";
  const devPass = "ywegebrcy97w8yvtrgwbe8u9nchyf22byrc23974t63vv8b7r29c3y8e012yt4729yeoicnecduh49";

  if (username !== devUser || password !== devPass) {
    return res.status(401).json({ message: "Akun developer salah" });
  }

  const token = jwt.sign({ role: "developer" }, JWT_SECRET, { expiresIn: "7d" });

  res.json({ token, username: devUser });

});

module.exports = router;
