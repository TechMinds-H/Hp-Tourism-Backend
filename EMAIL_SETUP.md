# Email Service Setup Guide

## Overview
This document guides you through setting up the Google Mail email service for HP Tourism bookings and contact forms.

## Prerequisites
- Node.js installed
- Gmail account with 2-Factor Authentication enabled
- Google App Password generated

## Step 1: Generate Google App Password

1. Go to [Google Account Security Settings](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication if not already done
3. Search for "App passwords" in the security settings
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password
6. Copy this password (it contains spaces, keep them as is)

## Step 2: Update Environment Variables

In the `server/.env` file, add or update these variables:

```
MONGODB_URI=mongodb://localhost:27017/
PORT=5000
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your app password here
EMAIL_FROM=HP Tourism <noreply@hptourism.com>
ADMIN_EMAIL=your-admin-email@gmail.com
```

## Step 3: Install Dependencies

Run the following command in the server directory:

```bash
npm install
```

This will install `nodemailer` which is required for sending emails.

## Step 4: Configure Admin Email (Optional)

To receive admin notifications when users book, uncomment the admin notification code in [routes/applications.js](routes/applications.js):

```javascript
// Send admin notification
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@hptourism.com';
await sendAdminNotification({
  name: application.name,
  email: application.email,
  phone: application.phone,
  travelDate: application.travelDate,
  people: application.people,
  packageName: application.packageName,
  message: application.message,
}, ADMIN_EMAIL);
```

## Step 5: Start the Server

```bash
npm run dev
```

## Email Templates

The system automatically sends two types of emails:

### 1. Booking Confirmation Email
- **When:** User submits a booking (package/destination)
- **To:** Customer's email
- **Content:** Booking details, travel date, number of travelers, and next steps
- **Template:** Beautiful gradient header with confirmation badge

### 2. Contact Form Acknowledgement
- **When:** User submits a contact form
- **To:** Customer's email
- **Content:** Acknowledgement of message receipt and expected response time
- **Template:** Clean design with contact summary

### 3. Admin Notification (Optional)
- **When:** User submits a booking
- **To:** Admin email
- **Content:** All booking details for staff review
- **Template:** High contrast for easy reading

## Testing

To test the email service:

1. Use a tool like [Postman](https://www.postman.com/) or `curl`
2. Send a POST request to `http://hp-tourism-backend.vercel.app/api/applications`

**Sample Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "travelDate": "2024-06-15",
  "people": 4,
  "packageName": "Shimla Adventure Package",
  "message": "Looking forward to this trip!"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully! Confirmation email has been sent."
}
```

## Troubleshooting

### Email Not Sending
1. **Check credentials:** Verify EMAIL_USER and EMAIL_PASS in .env
2. **Check App Password:** Ensure you used the 16-character app password, not your regular Gmail password
3. **Check logs:** Look for error messages in terminal output starting with "❌ Error sending email"
4. **Enable Less Secure Apps:** If 2FA is not enabled, enable "Less secure apps" (not recommended)

### Gmail Blocking Attempts
- Gmail may temporarily block sending if it detects unusual activity
- Wait 30 minutes and try again
- Or generate a new App Password

### Email Formatting Issues
- All templates use inline CSS for maximum compatibility
- Tested on major email clients (Gmail, Outlook, Apple Mail)
- If images don't load, check that the server can access external resources

## Customization

### Edit Email Templates
Edit [services/emailService.js](services/emailService.js) to customize:
- Colors and gradient backgrounds
- Logo/branding information
- Company contact details
- Support phone numbers

### Add New Email Types
1. Add new template function to `emailTemplates` object
2. Create a new send function (e.g., `sendInvoiceEmail`)
3. Export the function in `module.exports`
4. Use it in your routes

## Security Notes

⚠️ **Important:**
- Never commit .env file to version control
- The email password is sensitive - keep it secure
- Use environment variables in production
- Consider rate limiting email sends to prevent spam

## Gmail SMTP Settings

- **Host:** smtp.gmail.com
- **Port:** 587 (TLS - used by nodemailer)
- **Security:** TLS/STARTTLS
- **Requires:** App Password (not regular Gmail password)

## Production Deployment

For production:

1. Use a service like SendGrid, AWS SES, or Mailgun for better reliability
2. Implement email queue/scheduling
3. Add email templates to a separate templating service
4. Monitor email delivery rates
5. Set up bounce/complaint handling

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review error logs in terminal output
3. Visit [Nodemailer Documentation](https://nodemailer.com/)
4. Check [Gmail Support](https://support.google.com/mail)

---

**Last Updated:** March 2026  
**Email Service:** Nodemailer v6.9.7  
**Gmail SMTP:** Compatible with all versions
