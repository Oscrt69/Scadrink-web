const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  shortDesc: { type: String, default: '' },
  imageUrl: { type: String, default: '' }, // URL ke /uploads/..
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
