const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 5500;

// Zorg dat express statische bestanden kan serveren vanuit de "public" map
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route om de e-mail te verzenden
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: 'appah.ko@gmail.com', 
        subject: subject,
        text: `Naam: ${name}\nEmail: ${email}\n\nBericht:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Er ging iets mis bij het verzenden van de e-mail.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('E-mail succesvol verzonden!');
        }
    });
});

// Start de server
app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
