const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  travelDate: {
    type: Date,
    required: true
  },

  people: {
    type: Number,
    required: true
  },

  packageName: {
    type: String
  },

  message: {
    type: String
  },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model(
  'Application',
  applicationSchema
);