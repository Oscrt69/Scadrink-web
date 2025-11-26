const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// setup multer storage ke folder uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE product (multipart: image)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, shortDesc } = req.body;
    let imageUrl = '';
    if (req.file) imageUrl = `/uploads/${req.file.filename}`;
    const p = new Product({ name, price: Number(price), shortDesc, imageUrl });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE (with optional new image)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    const { name, price, shortDesc } = req.body;
    if (name) p.name = name;
    if (price) p.price = Number(price);
    if (shortDesc) p.shortDesc = shortDesc;
    if (req.file) {
      // hapus file lama jika ada
      if (p.imageUrl) {
        const old = path.join(__dirname, '..', p.imageUrl);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      p.imageUrl = `/uploads/${req.file.filename}`;
    }
    await p.save();
    res.json(p);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    // hapus file
    if (p.imageUrl) {
      const old = path.join(__dirname, '..', p.imageUrl);
      if (fs.existsSync(old)) fs.unlinkSync(old);
    }
    await p.deleteOne();
    res.json({ message: 'deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
