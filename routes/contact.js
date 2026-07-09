const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendContactReply } = require('../services/emailService');

router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    // Send acknowledgement email to user asynchronously
    setTimeout(() => {
      sendContactReply({
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
      }).catch(err => console.error('Failed to send contact reply:', err));
    }, 0);

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully! You will receive a confirmation email shortly.' 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
