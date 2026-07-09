const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
