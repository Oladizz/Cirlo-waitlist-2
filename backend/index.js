require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const SibApiV3Sdk = require('@getbrevo/brevo');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// IMPORTANT: Replace with your actual service account key path or environment variable
// For production, consider using GOOGLE_APPLICATION_CREDENTIALS environment variable
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

// CORS for frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Adjust in production
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Brevo API setup
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let apiKey = apiInstance.apiClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;
console.log('Brevo API Key:', process.env.BREVO_API_KEY);

// Function to get email template from Firestore
const getEmailTemplate = async () => {
    const docRef = db.collection('settings').doc('emailTemplate');
    const docSnap = await docRef.get();
    if (docSnap.exists) {
        return docSnap.data().content;
    } else {
        // Default template if not found in Firestore
        return `
          <p>Hello {{name}},</p>
          <p>Thank you for joining our waitlist! We are very excited to have you.</p>
          <p>We'll notify you as soon as we have more updates or when our service is ready.</p>
          <p>In the meantime, feel free to visit our website:</p>
          <p><a href="https://www.example.com" class="button">Visit Our Website</a></p>
          <p>Best regards,</p>
          <p>The Cirlo Team</p>
        `;
    }
};

app.post('/send-waitlist-email', async (req, res) => {
    const { recipientEmail, name } = req.body;
    console.log('Received request body:', req.body);

    if (!recipientEmail) {
        return res.status(400).json({ message: 'Recipient email is required.' });
    }

    try {
        const emailContent = await getEmailTemplate();
        const personalizedContent = emailContent.replace('{{name}}', name || 'there');

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ email: recipientEmail, name: name }];
        sendSmtpEmail.sender = { email: 'cirlo.xyz@gmail.com', name: 'Cirlo' };
        sendSmtpEmail.subject = 'Welcome to the Waitlist!';
        sendSmtpEmail.htmlContent = personalizedContent;

        await apiInstance.sendTransacEmail(sendSmtpEmail);
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