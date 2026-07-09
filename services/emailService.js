const nodemailer = require('nodemailer');

// Create transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Email templates
const emailTemplates = {
    bookingConfirmation: (data) => {
        const bookingId = Math.random().toString(36).substring(2, 11).toUpperCase();
        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Trebuchet MS', sans-serif; 
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
                padding: 20px;
            }
            .wrapper { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 680px; margin: 0 auto; }
            
            .header-section { 
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%); 
                padding: 60px 30px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            .header-section::before {
                content: '';
                position: absolute;
                top: -50%;
                right: -10%;
                width: 400px;
                height: 400px;
                background: rgba(255,255,255,0.1);
                border-radius: 50%;
            }
            .header-icon { font-size: 60px; margin-bottom: 15px; }
            .header-section h1 { 
                color: white; 
                font-size: 36px; 
                font-weight: 700;
                letter-spacing: -1px;
                margin-bottom: 5px;
            }
            .header-section p { 
                color: rgba(255,255,255,0.9); 
                font-size: 15px;
                font-weight: 300;
            }
            
            .content { padding: 50px 40px; }
            
            .personalized-greeting {
                font-size: 24px;
                color: #1a1a1a;
                font-weight: 600;
                margin-bottom: 5px;
                letter-spacing: -0.5px;
            }
            .greeting-subtitle {
                color: #888;
                font-size: 14px;
                margin-bottom: 30px;
            }
            
            .booking-card {
                background: linear-gradient(135deg, #f5f7fa 0%, #f9f9f9 100%);
                border-left: 5px solid #ff6b6b;
                padding: 30px;
                border-radius: 12px;
                margin: 30px 0;
            }
            
            .card-title {
                color: #ff6b6b;
                font-size: 16px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 20px;
            }
            
            .detail-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 15px;
            }
            
            .detail-item {
                border-bottom: 1px solid rgba(0,0,0,0.05);
                padding-bottom: 15px;
            }
            .detail-item:last-child { border-bottom: none; }
            
            .detail-label {
                color: #999;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
                display: block;
            }
            .detail-value {
                color: #1a1a1a;
                font-size: 18px;
                font-weight: 700;
            }
            
            .booking-id {
                background: white;
                border: 2px dashed #ff6b6b;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                margin: 25px 0;
            }
            .booking-id-label {
                color: #999;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 5px;
            }
            .booking-id-value {
                color: #ff6b6b;
                font-size: 28px;
                font-weight: 700;
                font-family: 'Courier New', monospace;
                letter-spacing: 2px;
            }
            
            .features-section {
                margin: 35px 0;
            }
            .feature {
                display: flex;
                margin-bottom: 18px;
                align-items: flex-start;
            }
            .feature-icon {
                font-size: 24px;
                margin-right: 18px;
                min-width: 32px;
                text-align: center;
            }
            .feature-content h4 {
                color: #1a1a1a;
                font-size: 15px;
                font-weight: 700;
                margin-bottom: 3px;
            }
            .feature-content p {
                color: #777;
                font-size: 13px;
                line-height: 1.6;
            }
            
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
                color: white;
                padding: 18px 45px;
                border-radius: 50px;
                text-decoration: none;
                font-weight: 700;
                font-size: 15px;
                margin: 30px 0;
                box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
            }
            
            .next-steps {
                background: linear-gradient(135deg, #ffeef0 0%, #fff5f7 100%);
                border-radius: 12px;
                padding: 25px;
                margin: 30px 0;
                border-left: 4px solid #ff6b6b;
            }
            .next-steps h3 {
                color: #ff6b6b;
                font-size: 15px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 15px;
            }
            .next-steps ol {
                color: #666;
                font-size: 14px;
                line-height: 1.8;
                padding-left: 20px;
            }
            .next-steps li {
                margin-bottom: 10px;
            }
            
            .footer-section {
                background: #fafafa;
                padding: 40px;
                text-align: center;
                border-top: 1px solid #efefef;
            }
            .footer-section p {
                color: #888;
                font-size: 13px;
                line-height: 1.8;
                margin-bottom: 15px;
            }
            .footer-contact {
                color: #ff6b6b;
                font-weight: 700;
                font-size: 14px;
            }
            .social-links {
                margin: 20px 0;
            }
            .social-links a {
                display: inline-block;
                width: 40px;
                height: 40px;
                background: #ff6b6b;
                color: white;
                border-radius: 50%;
                text-align: center;
                line-height: 40px;
                text-decoration: none;
                margin: 0 5px;
                font-weight: bold;
            }
            .copyright {
                color: #bbb;
                font-size: 12px;
                margin-top: 20px;
            }
            
            .highlight { color: #ff6b6b; font-weight: 700; }
            .divider { height: 2px; background: linear-gradient(90deg, transparent, #ddd, transparent); margin: 25px 0; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="header-section">
                <div class="header-icon">✈️</div>
                <h1>BOOKING CONFIRMED</h1>
                <p>Your Himalayan Adventure Awaits</p>
            </div>
            
            <div class="content">
                <div class="personalized-greeting">Welcome, ${data.name.split(' ')[0]}! 🎉</div>
                <div class="greeting-subtitle">Your booking has been confirmed and we're thrilled to have you on this journey</div>
                
                <div class="booking-card">
                    <div class="card-title">📍 Journey Details</div>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">🏜️ Destination</span>
                            <span class="detail-value">${data.packageName}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">📅 Travel Date</span>
                            <span class="detail-value">${new Date(data.travelDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">👥 Travelers</span>
                            <span class="detail-value">${data.people} ${data.people === 1 ? 'Guest' : 'Guests'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">📞 Contact</span>
                            <span class="detail-value">${data.phone}</span>
                        </div>
                    </div>
                </div>
                
                <div class="booking-id">
                    <div class="booking-id-label">Your Booking Reference</div>
                    <div class="booking-id-value">${bookingId}</div>
                </div>
                
                <center>
                    <a href="https://hptourism.com/tracking" class="cta-button">Track Your Booking</a>
                </center>
                
                <div class="next-steps">
                    <h3>🚀 What Happens Next?</h3>
                    <ol>
                        <li><strong>Within 2 Hours:</strong> Our travel specialist will call to confirm all details</li>
                        <li><strong>Within 24 Hours:</strong> You'll receive a detailed itinerary with all activities</li>
                        <li><strong>7 Days Before:</strong> Pre-trip guide and accommodation confirmations</li>
                        <li><strong>Day of Journey:</strong> Real-time updates and driver contact information</li>
                    </ol>
                </div>
                
                <div class="features-section">
                    <div class="feature">
                        <div class="feature-icon">🏆</div>
                        <div class="feature-content">
                            <h4>Premium Experience Included</h4>
                            <p>Expert guides, 5-star accommodations, and exclusive access to hidden gems</p>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🛡️</div>
                        <div class="feature-content">
                            <h4>Complete Peace of Mind</h4>
                            <p>28-day cancellation guarantee and travel insurance included</p>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">📱</div>
                        <div class="feature-content">
                            <h4>Real-Time Support</h4>
                            <p>24/7 on-ground assistance through our mobile app</p>
                        </div>
                    </div>
                </div>
                
                <div class="divider"></div>
                
                <p style="color: #666; font-size: 14px; line-height: 1.8;">
                    <strong>Special Request Note:</strong> ${data.message || 'No special requests. We will suggest accommodations perfect for your group!'}<br><br>
                    If you need to modify this booking, reach out anytime before your travel date at <span class="highlight">support@hptourism.com</span>
                </p>
            </div>
            
            <div class="footer-section">
                <p style="font-size: 16px; font-weight: 700; color: #1a1a1a;">🏔️ HP TOURISM</p>
                <p>Discover the magic of Himachal Pradesh with our curated experiences</p>
                
                <div class="social-links">
                    <a href="https://instagram.com/hptourism">f</a>
                    <a href="https://instagram.com/hptourism">📷</a>
                    <a href="https://youtube.com/hptourism">▶</a>
                </div>
                
                <p>
                    <strong>📞 Call Us:</strong> <span class="footer-contact">+91-XXXXX-XXXXX</span><br>
                    <strong>📧 Email:</strong> <span class="footer-contact">support@hptourism.com</span>
                </p>
                
                <div class="copyright">
                    © 2026 HP Tourism. All rights reserved. | <a href="#" style="color: #ff6b6b; text-decoration: none;">Privacy Policy</a> | <a href="#" style="color: #ff6b6b; text-decoration: none;">Terms of Service</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    },

    adminNotification: (data) => {
        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Trebuchet MS', Arial, sans-serif; 
                background: linear-gradient(135deg, #000a1a 0%, #1a2f4a 100%); 
                padding: 20px;
            }
            .wrapper { background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 25px 70px rgba(0,0,0,0.4); max-width: 700px; margin: 0 auto; }
            
            .header-section { 
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%); 
                padding: 50px 30px;
                text-align: center;
                border-bottom: 4px solid #c44569;
            }
            .header-icon { font-size: 48px; margin-bottom: 15px; }
            .header-section h1 { 
                color: white; 
                font-size: 32px; 
                font-weight: 900;
                letter-spacing: -0.5px;
            }
            .header-section p { 
                color: rgba(255,255,255,0.95); 
                font-size: 14px;
                font-weight: 600;
                margin-top: 10px;
            }
            
            .content { padding: 40px; }
            
            .alert-badge {
                background: linear-gradient(135deg, #ffeaea 0%, #ffe5e5 100%);
                border: 2px solid #ff6b6b;
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 30px;
                text-align: center;
            }
            .alert-icon { font-size: 36px; margin-bottom: 10px; }
            .alert-text {
                color: #c44569;
                font-weight: 700;
                font-size: 15px;
            }
            
            .booking-card {
                background: linear-gradient(135deg, #f8f9fb 0%, #fcfdfe 100%);
                border: 1px solid #e8ecf1;
                border-radius: 12px;
                padding: 35px;
                margin: 25px 0;
            }
            
            .card-header {
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
                color: white;
                padding: 15px;
                margin: -35px -35px 25px -35px;
                border-radius: 11px 11px 0 0;
                text-align: center;
                font-weight: 700;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .detail-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 25px;
                margin-bottom: 15px;
            }
            .detail-item {
                border-bottom: 1px solid #f0f0f0;
                padding-bottom: 15px;
            }
            .detail-item:last-child { border-bottom: none; }
            
            .detail-label {
                color: #999;
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.7px;
                margin-bottom: 5px;
                display: block;
            }
            .detail-value {
                color: #1a1a1a;
                font-size: 16px;
                font-weight: 700;
            }
            
            .action-required {
                background: linear-gradient(135deg, #fff3cd 0%, #fffaeb 100%);
                border-left: 5px solid #ff9800;
                padding: 20px;
                border-radius: 8px;
                margin: 25px 0;
            }
            .action-title {
                color: #d17c0a;
                font-weight: 700;
                font-size: 14px;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .action-items {
                color: #666;
                font-size: 13px;
                line-height: 1.8;
            }
            .action-items li {
                margin-bottom: 8px;
            }
            
            .quick-contact {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin: 25px 0;
            }
            .contact-box {
                background: #f9f9f9;
                padding: 15px;
                border-radius: 8px;
                border-left: 3px solid #ff6b6b;
                text-align: center;
            }
            .contact-label {
                color: #999;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
            }
            .contact-value {
                color: #ff6b6b;
                font-weight: 700;
                font-size: 14px;
                margin-top: 5px;
            }
            
            .footer-section {
                background: #1a1a1a;
                color: white;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e8e8e8;
            }
            .footer-section p {
                color: #aaa;
                font-size: 12px;
                line-height: 1.8;
                margin-bottom: 10px;
            }
            
            .priority-badge {
                display: inline-block;
                background: #ff6b6b;
                color: white;
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="header-section">
                <div class="header-icon">🔔</div>
                <h1>NEW BOOKING ALERT</h1>
                <p>Admin Notification • Action Required</p>
            </div>
            
            <div class="content">
                <div class="alert-badge">
                    <div class="alert-icon">⚡</div>
                    <div class="alert-text">Priority Booking Received</div>
                </div>
                
                <div class="booking-card">
                    <div class="card-header">📊 GUEST INFORMATION</div>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">👤 Full Name</span>
                            <span class="detail-value">${data.name}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">📧 Email</span>
                            <span class="detail-value">${data.email}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">📱 Phone</span>
                            <span class="detail-value">${data.phone}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">👥 Group Size</span>
                            <span class="detail-value">${data.people} ${data.people === 1 ? 'Guest' : 'Guests'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="booking-card">
                    <div class="card-header">🧳 BOOKING DETAILS</div>
                    <div class="detail-grid">
                        <div class="detail-item" style="grid-column: 1 / -1;">
                            <span class="detail-label">🏜️ Package/Destination</span>
                            <span class="detail-value">${data.packageName}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">📅 Travel Date</span>
                            <span class="detail-value">${new Date(data.travelDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">🕐 Booking Time</span>
                            <span class="detail-value">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                        </div>
                    </div>
                    ${data.message ? `
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
                        <span class="detail-label">💬 Special Requests</span>
                        <div style="color: #333; font-size: 14px; margin-top: 8px; padding: 12px; background: #f5f5f5; border-radius: 6px;">${data.message}</div>
                    </div>
                    ` : ''}
                </div>
                
                <div class="action-required">
                    <div class="action-title">✅ REQUIRED ACTIONS</div>
                    <ul class="action-items">
                        <li><strong>Within 1 Hour:</strong> Call guest to confirm booking and take special requests</li>
                        <li><strong>Within 2 Hours:</strong> Send detailed itinerary and pricing confirmation</li>
                        <li><strong>Within 24 Hours:</strong> Complete booking accommodation arrangements</li>
                        <li><strong>7 Days Before:</strong> Send pre-trip documentation and final confirmations</li>
                    </ul>
                </div>
                
                <div class="quick-contact">
                    <div class="contact-box">
                        <div class="contact-label">📞 Call Guest</div>
                        <div class="contact-value">${data.phone}</div>
                    </div>
                    <div class="contact-box">
                        <div class="contact-label">📧 Email Response</div>
                        <div class="contact-value">${data.email}</div>
                    </div>
                </div>
                
                <center>
                    <span class="priority-badge">🚀 HIGH PRIORITY</span>
                </center>
            </div>
            
            <div class="footer-section">
                <p>HP Tourism Admin Dashboard</p>
                <p>This is an automated notification. Please do not reply to this email.</p>
                <p style="margin-top: 15px; color: #666;">Sent at ${new Date().toLocaleString()}</p>
            </div>
        </div>
    </body>
    </html>
    `;
    },

    contactReply: (data) => {
        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Trebuchet MS', sans-serif; 
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
                padding: 20px;
            }
            .wrapper { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 680px; margin: 0 auto; }
            
            .header-section { 
                background: linear-gradient(135deg, #4CAF50 0%, #45a049 50%, #388e3c 100%); 
                padding: 60px 30px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            .header-section::before {
                content: '';
                position: absolute;
                top: -50%;
                right: -10%;
                width: 400px;
                height: 400px;
                background: rgba(255,255,255,0.1);
                border-radius: 50%;
            }
            .header-icon { font-size: 60px; margin-bottom: 15px; }
            .header-section h1 { 
                color: white; 
                font-size: 36px; 
                font-weight: 700;
                letter-spacing: -1px;
                margin-bottom: 5px;
            }
            .header-section p { 
                color: rgba(255,255,255,0.9); 
                font-size: 15px;
                font-weight: 300;
            }
            
            .content { padding: 50px 40px; }
            
            .personalized-greeting {
                font-size: 24px;
                color: #1a1a1a;
                font-weight: 600;
                margin-bottom: 5px;
                letter-spacing: -0.5px;
            }
            .greeting-subtitle {
                color: #888;
                font-size: 14px;
                margin-bottom: 30px;
            }
            
            .message-summary {
                background: linear-gradient(135deg, #f1f8f5 0%, #f9f9f9 100%);
                border-left: 5px solid #4CAF50;
                padding: 30px;
                border-radius: 12px;
                margin: 30px 0;
            }
            
            .summary-title {
                color: #4CAF50;
                font-size: 16px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 20px;
            }
            
            .summary-item {
                margin-bottom: 15px;
            }
            
            .summary-label {
                color: #999;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
                display: block;
            }
            .summary-value {
                color: #1a1a1a;
                font-size: 15px;
                font-weight: 600;
            }
            
            .info-section {
                margin: 35px 0;
            }
            .feature {
                display: flex;
                margin-bottom: 18px;
                align-items: flex-start;
            }
            .feature-icon {
                font-size: 24px;
                margin-right: 18px;
                min-width: 32px;
                text-align: center;
            }
            .feature-content h4 {
                color: #1a1a1a;
                font-size: 15px;
                font-weight: 700;
                margin-bottom: 3px;
            }
            .feature-content p {
                color: #777;
                font-size: 13px;
                line-height: 1.6;
            }
            
            .response-time {
                background: linear-gradient(135deg, #fff3e0 0%, #fff9f7 100%);
                border-radius: 12px;
                padding: 25px;
                margin: 30px 0;
                border-left: 4px solid #ff9800;
                text-align: center;
            }
            .response-time h3 {
                color: #ff9800;
                font-size: 15px;
                font-weight: 700;
                margin-bottom: 10px;
            }
            .response-time p {
                color: #666;
                font-size: 14px;
                line-height: 1.8;
            }
            
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
                color: white;
                padding: 18px 45px;
                border-radius: 50px;
                text-decoration: none;
                font-weight: 700;
                font-size: 15px;
                margin: 30px 0;
                box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .footer-section {
                background: #fafafa;
                padding: 40px;
                text-align: center;
                border-top: 1px solid #efefef;
            }
            .footer-section p {
                color: #888;
                font-size: 13px;
                line-height: 1.8;
                margin-bottom: 15px;
            }
            .footer-contact {
                color: #4CAF50;
                font-weight: 700;
                font-size: 14px;
            }
            
            .copyright {
                color: #bbb;
                font-size: 12px;
                margin-top: 20px;
            }
            
            .divider { height: 2px; background: linear-gradient(90deg, transparent, #ddd, transparent); margin: 25px 0; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="header-section">
                <div class="header-icon">✉️</div>
                <h1>MESSAGE RECEIVED</h1>
                <p>We're Here to Help Your Journey</p>
            </div>
            
            <div class="content">
                <div class="personalized-greeting">Hey ${data.name.split(' ')[0]}! 👋</div>
                <div class="greeting-subtitle">Thanks for reaching out to us</div>
                
                <div class="message-summary">
                    <div class="summary-title">📨 Your Message</div>
                    <div class="summary-item">
                        <span class="summary-label">Subject</span>
                        <span class="summary-value">${data.subject}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Received At</span>
                        <span class="summary-value">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
                
                <div class="response-time">
                    <h3>⏱️ Expected Response Time</h3>
                    <p>Our team typically responds within <strong>2-4 hours</strong> during business hours (9 AM - 6 PM IST)</p>
                </div>
                
                <div class="info-section">
                    <div class="feature">
                        <div class="feature-icon">🎯</div>
                        <div class="feature-content">
                            <h4>Personalized Assistance</h4>
                            <p>A dedicated travel consultant will reach out to discuss your specific needs and preferences</p>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">💡</div>
                        <div class="feature-content">
                            <h4>Expert Recommendations</h4>
                            <p>Based on your inquiry, we'll provide customized packages and exclusive offers</p>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🌟</div>
                        <div class="feature-content">
                            <h4>24/7 Support</h4>
                            <p>Have more questions? Our support team is ready to assist you anytime</p>
                        </div>
                    </div>
                </div>
                
                <div class="divider"></div>
                
                <center>
                    <a href="https://hptourism.com/packages" class="cta-button">Explore Our Packages</a>
                </center>
                
                <p style="color: #666; font-size: 14px; line-height: 1.8; margin-top: 30px;">
                    In the meantime, browse our website to discover stunning destinations, read travel guides, and check out reviews from our satisfied travelers. We're excited to help you plan the journey of a lifetime!
                </p>
            </div>
            
            <div class="footer-section">
                <p style="font-size: 16px; font-weight: 700; color: #1a1a1a;">🏔️ HP TOURISM</p>
                <p>Your Gateway to Himalayan Adventures</p>
                
                <p style="margin-top: 20px;">
                    <strong>📞 Call Us:</strong> <span class="footer-contact">+91-XXXXX-XXXXX</span><br>
                    <strong>📧 Live Chat:</strong> <span class="footer-contact">support@hptourism.com</span>
                </p>
                
                <div class="copyright">
                    © 2026 HP Tourism. All rights reserved. | <a href="#" style="color: #4CAF50; text-decoration: none;">Privacy Policy</a> | <a href="#" style="color: #4CAF50; text-decoration: none;">Unsubscribe</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    },
};


tripCancelled: (data) => {
    return `
  <html>
    <body style="font-family:Arial;padding:20px">
      <h2 style="color:#e74c3c">❌ Booking Cancelled</h2>

      <p>Hello ${data.name},</p>

      <p>Your booking has been cancelled successfully.</p>

      <hr>

      <p><strong>Package:</strong> ${data.packageName}</p>
      <p><strong>Travel Date:</strong> ${new Date(
        data.travelDate
    ).toLocaleDateString()}</p>

      <hr>

      <p>
        If this cancellation was made by mistake,
        please contact our support team.
      </p>

      <p>
        Thank you for choosing HP Tourism.
      </p>

      <br>

      <p>
        Regards,<br/>
        HP Tourism Team
      </p>
    </body>
  </html>
  `;
};

// Send email function
const sendEmail = async (to, subject, htmlTemplate) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: subject,
            html: htmlTemplate,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.response);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Send booking confirmation to customer
const sendBookingConfirmation = async (applicationData) => {
    const htmlTemplate = emailTemplates.bookingConfirmation(applicationData);
    return sendEmail(
        applicationData.email,
        `🎉 Booking Confirmation - HP Tourism`,
        htmlTemplate
    );
};

// Send admin notification
const sendAdminNotification = async (applicationData, adminEmail) => {
    const htmlTemplate = emailTemplates.adminNotification(applicationData);
    return sendEmail(
        adminEmail,
        `📩 New Booking Received - ${applicationData.name}`,
        htmlTemplate
    );
};

// Send contact form acknowledgement
const sendContactReply = async (contactData) => {
    const htmlTemplate = emailTemplates.contactReply(contactData);
    return sendEmail(
        contactData.email,
        `✅ We Received Your Message - HP Tourism`,
        htmlTemplate
    );
};

const sendTripCancelledEmail = async (bookingData) => {
    const htmlTemplate =
        emailTemplates.tripCancelled(bookingData);

    return sendEmail(
        bookingData.email,
        '❌ Booking Cancelled - HP Tourism',
        htmlTemplate
    );
};

module.exports = {
    sendBookingConfirmation,
    sendAdminNotification,
    sendContactReply,
    sendTripCancelledEmail,
    sendEmail,
};
