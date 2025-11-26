require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/reviews", require("./routes/reviews"));

// serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// connect mongodb
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/scadrink';
mongoose.connect(MONGO_URI)
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connect error', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);
