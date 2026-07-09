const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { sendBookingConfirmation, sendAdminNotification } = require('../services/emailService');

router.post('/', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();

    // Send emails asynchronously without blocking the response
    setTimeout(() => {   console.log(application);

      sendBookingConfirmation({ 
        name: application.name,
        email: application.email,
        phone: application.phone,
        travelDate: application.travelDate,
        people: application.people,
        packageName: application.packageName,
        message: application.message,
      }).catch(err => console.error('Failed to send booking confirmation:', err));
    }, 0);

    // Send admin notification (optional - uncomment and set your admin email)
    // const ADMIN_EMAIL = 'admin@hptourism.com';
    // setTimeout(() => {
    //   sendAdminNotification({
    //     name: application.name,
    //     email: application.email,
    //     phone: application.phone,
    //     travelDate: application.travelDate,
    //     people: application.people,
    //     packageName: application.packageName,
    //     message: application.message,
    //   }, ADMIN_EMAIL).catch(err => console.error('Failed to send admin notification:', err));
    // }, 0);

    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully! You will receive a confirmation email shortly.' 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
