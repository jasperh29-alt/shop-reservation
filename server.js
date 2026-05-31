const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// API endpoint to send reservation email
app.post('/api/send-reservation-email', async (req, res) => {
    try {
        const { name, email, item, pickupDate, notes } = req.body;

        // Email to shop owner
        const shopEmailContent = `
            <h2>New Reservation Request</h2>
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Customer Email:</strong> ${email}</p>
            <p><strong>Item Reserved:</strong> ${item}</p>
            <p><strong>Pickup Date:</strong> ${pickupDate}</p>
            <p><strong>Additional Notes:</strong> ${notes || 'None'}</p>
            <hr>
            <p>Please confirm this reservation with the customer.</p>
        `;

        // Email to customer
        const customerEmailContent = `
            <h2>Reservation Confirmed!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for reserving an item from our Sweet Shop!</p>
            <p><strong>Your Reservation Details:</strong></p>
            <ul>
                <li>Item: ${item}</li>
                <li>Pickup Date: ${pickupDate}</li>
                <li>Notes: ${notes || 'None'}</li>
            </ul>
            <p>We will prepare your item for pickup. Please arrive on or after the specified date.</p>
            <p>If you have any questions, feel free to contact us!</p>
            <p>Best regards,<br>Sweet Shop Team</p>
        `;

        // Send email to shop owner
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.SHOP_EMAIL || process.env.EMAIL_USER,
            subject: `New Reservation: ${item}`,
            html: shopEmailContent
        });

        // Send confirmation email to customer
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reservation Confirmation - Sweet Shop',
            html: customerEmailContent
        });

        res.json({ success: true, message: 'Reservation email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
