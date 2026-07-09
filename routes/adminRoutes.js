const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

router.get('/stats', async (req, res) => {
  try {
    const totalBookings = await Application.countDocuments();

    const confirmedBookings = await Application.countDocuments({
      status: 'confirmed'
    });

    const cancelledBookings = await Application.countDocuments({
      status: 'cancelled'
    });

    res.json({
      totalBookings,
      confirmedBookings,
      cancelledBookings
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Application.find()
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const bookings = await Application.find();

    const totalBookings = bookings.length;

    const confirmedBookings = bookings.filter(
      b => b.status === 'confirmed'
    ).length;

    const cancelledBookings = bookings.filter(
      b => b.status === 'cancelled'
    ).length;

    const revenue = bookings.reduce(
      (sum, booking) =>
        sum + ((booking.people || 1) * 5000),
      0
    );

    res.json({
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      revenue
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.get('/recent', async (req, res) => {
  const bookings = await Application
    .find()
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(bookings);
});

router.delete('/booking/:id', async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);

  res.json({
    success: true
  });
});

router.get('/stats', async (req, res) => {
  const totalBookings =
    await Application.countDocuments();

  const confirmedBookings =
    await Application.countDocuments({
      status: 'confirmed'
    });

  const cancelledBookings =
    await Application.countDocuments({
      status: 'cancelled'
    });

  res.json({
    totalBookings,
    confirmedBookings,
    cancelledBookings
  });
});


router.put('/booking/:id/confirm', async (req, res) => {
  const booking = await Application.findById(
    req.params.id
  );

  booking.status = 'confirmed';

  await booking.save();

  res.json({
    success: true
  });
});

module.exports = router;