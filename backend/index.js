require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

// CORS for frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Adjust in production
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail app password
    }
});

// Function to read email template
const getEmailTemplate = (templateName) => {
    const templatePath = path.join(__dirname, 'email_templates', `${templateName}.html`);
    return fs.readFileSync(templatePath, 'utf8');
};

app.post('/send-waitlist-email', async (req, res) => {
    const { recipientEmail, name } = req.body;
    console.log('Received request body:', req.body);

    if (!recipientEmail) {
        return res.status(400).json({ message: 'Recipient email is required.' });
    }

    try {
        const emailContent = getEmailTemplate('waitlist_welcome'); // Use a default template
        const personalizedContent = emailContent.replace('{{name}}', name || 'there');

        const mailOptions = {
            from: 'Cirlo <' + process.env.EMAIL_USER + '>',
            to: recipientEmail,
            subject: 'Welcome to the Waitlist!',
            html: personalizedContent
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email.', error: error.message });
    }
});

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '..', 'dist')));

// All other GET requests not handled by the API should return the frontend's index.html
app.get(/^\/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
