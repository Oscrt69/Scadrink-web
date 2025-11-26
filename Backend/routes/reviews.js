const express = require("express");
const multer = require("multer");
const Review = require("../models/Review");

const router = express.Router();

// Setup Multer Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Ambil semua review
router.get("/", async (req, res) => {
  const data = await Review.find().sort({ createdAt: -1 });
  res.json(data);
});

// Buat review baru
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { username, comment, rating } = req.body;

    const newReview = await Review.create({
      username,
      comment,
      rating,
      imageUrl: req.file ? "/uploads/" + req.file.filename : null
    });

    res.json({ status: "ok", data: newReview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
