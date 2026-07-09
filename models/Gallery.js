const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, enum: ['nature', 'culture', 'adventure', 'temples', 'snow'], required: true },
});

module.exports = mongoose.model('Gallery', gallerySchema);
