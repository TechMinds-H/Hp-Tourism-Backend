const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  highlights: [{ type: String }],
  image: { type: String, required: true },
  type: { type: String, enum: ['adventure', 'cultural', 'scenic', 'spiritual'], default: 'scenic' },
});

module.exports = mongoose.model('Package', packageSchema);
