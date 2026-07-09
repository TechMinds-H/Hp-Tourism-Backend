const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String, required: true },
  altitude: String,
  rating: String,
  description: { type: String, required: true },
  image: { type: String, required: true },
  isPopular: { type: Boolean, default: false },
});

module.exports = mongoose.model('Destination', destinationSchema);
