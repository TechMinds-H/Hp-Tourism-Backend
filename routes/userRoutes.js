const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Application = require('../models/Application');
const { protect } = require('../models/authMiddleware');

// GET /api/user/profile  — get logged in user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/user/profile  — update profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, city } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, city },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/user/change-password
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET /api/user/bookings  — get user's bookings
router.get('/bookings', protect, async (req, res) => {
  try {
    const bookings = await Application.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT /api/user/bookings/:id/cancel
router.put('/bookings/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Application.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        error: 'Booking not found'
      });
    }

    // Security: only owner can cancel
    // if (booking.email !== req.user.email) {
    //   return res.status(403).json({
    //     error: 'Not authorized to cancel this booking'
    //   });
    // }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Trip cancelled successfully'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});


// POST /api/user/save/:packageId  — save/unsave a package
router.post('/save/:packageId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const packageId = req.params.packageId;

    const isSaved = user.savedPackages.includes(packageId);

    if (isSaved) {
      // Remove from saved
      user.savedPackages = user.savedPackages.filter(
        (id) => id.toString() !== packageId
      );
    } else {
      // Add to saved
      user.savedPackages.push(packageId);
    }

    await user.save();

    res.json({
      success: true,
      saved: !isSaved,
      savedPackages: user.savedPackages,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/user/saved  — get saved packages with details
router.get('/saved', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedPackages');
    res.json(user.savedPackages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
